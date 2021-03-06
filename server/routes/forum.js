const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Forum = require('../models/Forum');
const ForumThread = require('../models/ForumThread');
const ForumComment = require('../models/ForumComment');

const { removeBlankValuesFromObject } = require('../logic/_helpers');
const {
  putOriginalCommentFirst, checkCommentPostCriteria, checkCommentDeleteCriteria, checkCommentEditCriteria,
} = require('../logic/forum');

/* TODO:
fix routes, no need for params in .patch,post,delete
level requirement for creating threads?
admin roles for creating forum
finish routes for creating,editing and deleting forums and threads
*/

// gets forums and thread count
router.get('/', async (req, res) => {
  let forums;
  let threads;
  const threadCount = {};

  try {
    forums = await Forum.find({ allianceForum: false }).lean().populate('creator', 'name');
    threads = await ForumThread.find({ allianceThread: false }).lean();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  // counts up the threads for each forum. .countDocuments() ??
  forums.forEach((f) => {
    threadCount[f._id] = 0;
  });
  threads.forEach((t) => {
    threadCount[t.forum] += 1;
  });

  return res.status(200).json({
    success: true,
    message: 'Forum loaded...',
    forums,
    threadCount,
  });
});

router.get('/:forumId', async (req, res) => {
  const { forumId } = req.params;

  let threads;
  let comments;
  const commentCount = {};

  try {
    threads = await ForumThread
      .find({ forum: forumId, allianceThread: false })
      .lean()
      .populate('creator', 'name')
      .populate('forum', 'title');
    comments = await ForumComment.find({ deleted: false }).lean();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  threads.forEach((t) => {
    commentCount[t._id] = 0;
  });
  comments.forEach((c) => {
    commentCount[c.forumThread] += 1;
  });

  removeBlankValuesFromObject(commentCount);

  return res.status(200).json({
    success: true,
    message: 'Forumthreads loaded...',
    threads,
    commentCount,
  });
});

// Gets comments
// security issue. will be available for everyone if someone knows the objectId of thread
router.get('/thread/:threadId', async (req, res) => {
  const { threadId } = req.params;

  let comments;
  try {
    comments = await ForumComment
      .find({ forumThread: threadId, deleted: false })
      .lean()
      .sort({ createdAt: -1 })
      .populate('creator', ['name', 'account.avatar'])
      .populate('forumThread', 'title')
      .populate('likes', 'name');
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  putOriginalCommentFirst(comments);

  return res.status(200).json({
    success: true,
    message: 'Forumcomments loaded...',
    comments,
  });
});

/*
// create forum
router.post('/', async (req, res) => {
  const userId = req.user._id;
  return res.status(200).json({
    success: true,
    message: 'Your forum has been created...',
  });
});
 */

/* // create thread
router.post('/:forumId', async (req, res) => {
  const userId = req.user._id;
  return res.status(200).json({
    success: true,
    message: 'Your thread has been created...',
  });
});
 */

// create comment
router.post('/thread/comment', async (req, res) => {
  const userId = req.user._id;
  const { comment, threadId } = req.body;

  let user;
  let thread;

  try {
    user = await User.findById(userId);
    thread = await ForumThread.findById(threadId);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  const message = checkCommentPostCriteria(comment, thread, user);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // createdAt might differ from server time
  const forumComment = new ForumComment({
    creator: user._id,
    comment,
    forumThread: threadId,
  });

  forumComment.save().then((commentSaveResult) => {
    commentSaveResult.populate('creator', ['name', 'account.avatar']).execPopulate()
      .then((result) => res.status(200).json({
        success: true,
        message: 'Your comment has been posted',
        comment: result,
      }));
  });
});

router.post('/thread/comment/like', async (req, res) => {
  const userId = req.user._id;
  const { commentId } = req.body;

  let comment;
  let userExists;

  try {
    comment = await ForumComment.findById(commentId);
    userExists = await User.exists({ _id: userId });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  if (!userExists) {
    res.status(403).json({
      success: false,
      message: 'error: User doesn\'t exist',
    });
  }

  comment.addRemoveLike(userId);

  return res.status(200).json({
    success: true,
    message: 'Toggle like!',
  });
});

/* // deletes forum
router.delete('/', async (req, res) => {
  const userId = req.user._id;

  return res.status(200).json({
    success: true,
    message: 'forum deleted',
  });
});
 */

/* router.delete('/:forumId', async (req, res) => {
  const userId = req.user._id;
  const { commentId } = req.body;
  const forumPost = await Forum.findById(commentId);

  const message = checkForumCriteria(null, userId, forumPost.userId, true);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  forumPost.deleteOne(commentId);

  return res.status(200).json({
    success: true,
    message: 'thread deleted',
  });
}); */

// deletes comment
router.delete('/thread/comment', async (req, res) => {
  const { commentId } = req.body;
  // const { threadId,forumId } = req.body
  const userId = req.user._id;
  let comment;

  try {
    comment = await ForumComment.findById(commentId);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  const message = checkCommentDeleteCriteria(comment, userId);
  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  comment.deleteComment();

  return res.status(200).json({
    success: true,
    message: 'comment deleted',
  });
});

/* router.patch('/', async (req, res) => {
  const userId = req.user._id;

  return res.status(200).json({
    success: true,
    message: 'Thread successfuly edited',
  });
});

router.patch('/:forumId/', async (req, res) => {
  const userId = req.user._id;

  return res.status(200).json({
    success: true,
    message: 'Thread successfuly edited',
  });
}); */

router.patch('/thread/comment', async (req, res) => {
  const userId = req.user._id;
  const { commentId, newComment } = req.body;
  let comment;

  try {
    comment = await ForumComment.findById(commentId);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  const message = checkCommentEditCriteria(newComment, comment, userId);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  comment.editComment(newComment);

  return res.status(200).json({
    success: true,
    message: 'Message successfuly edited',
  });
});

module.exports = router;
