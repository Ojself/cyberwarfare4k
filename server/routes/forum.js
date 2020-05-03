const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/User');
const Forum = require('../models/Forum');
const ForumThread = require('../models/ForumThread');
const ForumComment = require('../models/ForumComment');

/* not pretty, refactor this */
function checkCommentPostCriteria(comment) {
  if (comment.length > 250) {
    return 'Your post is too long..';
  }

  if (comment.length < 3) {
    return 'Your post is too short..';
  }

  if (comment.toLowerCase().includes('script>')) {
    return 'no need for your script tags here..';
  }
  return null;
}

// gets forums and thread count
router.get('/', async (req, res) => {
  let forums;
  let threads;


  try {
    forums = await Forum.find({ allianceForum: false }).lean();
    threads = await ForumThread.find({ allianceThread: false }).lean();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }


  return res.status(200).json({
    success: true,
    forums,
    threads,
  });
});

// gets comments of certain thread
router.get('/:thread', async (req, res) => {
  const forums = await Forum.find().populate('userId', 'name');
  return res.status(200).json({
    success: true,
    message: 'Forums loaded....',
    forums,
  });
});

// create thread
router.post('/', async (req, res) => {
  const userId = req.user._id;
  return res.status(200).json({
    success: true,
    message: 'Your thread has been posted',
  });
});

// deletes thread
router.delete('/', async (req, res) => {
  const userId = req.user._id;

  return res.status(200).json({
    success: true,
    message: 'thread deleted',
  });
});

// gets comments
router.get('/:thread', async (req, res) => {
  const forums = await Forum.find().populate('userId', 'name');
  return res.status(200).json({
    success: true,
    message: 'Forum loaded....',
    forums,
  });
});

// create comment
router.post('/:thread', async (req, res) => {
  const userId = req.user._id;
  const user = User.findById(userId);
  const { comment } = req.body;
  const now = new Date();

  const message = checkCommentPostCriteria(comment);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const forumPost = new Forum({
    userId,
    comment,
    date: now,
  });

  forumPost.save();

  return res.status(200).json({
    success: true,
    message: 'Your message has been posted',
  });
});

router.delete('/:thread', async (req, res) => {
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
    message: 'Message deleted',
  });
});

router.patch('/:thread', async (req, res) => {
  // const userId = req.user._id;
  const userId = '5d6591fa87b7cfdc1b2c39a0';
  const { commentId, comment } = req.body;
  const forumPost = await Forum.findById(commentId);
  const now = Date.now();

  const message = checkForumCriteria(comment, userId, forumPost.userId, true);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  forumPost.editPost(comment, now);

  return res.status(200).json({
    success: true,
    message: 'Message successfuly edited',
  });
});


module.exports = router;
