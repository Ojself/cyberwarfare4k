const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Forum = require('../models/Forum');

/* not pretty, refactor this */
function checkForumCriteria(
  comment = 'abc',
  userId,
  commentId,
  idChecker = false,
) {
  console.log('checkForumCriteria', ...arguments);
  if (comment.length > 250) {
    return 'Your post is too long..';
  }

  if (comment.length < 3) {
    return 'Your post is too short..';
  }

  if (comment.toLowerCase().includes('script>')) {
    return 'no need for your script tags here..';
  }

  if (idChecker) {
    if (!userId.toString() === commentId.toString()) {
      return 'You can\'t do changes to other posts but your own.';
    }
  }
  return null;
}

router.get('/', async (req, res) => {
  const forums = await Forum.find().populate('userId', 'name');
  return res.status(200).json({
    success: true,
    message: 'Forum loaded....',
    forums,
  });
});

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const user = User.findById(userId);
  const { comment } = req.body;
  const now = new Date();

  const message = checkForumCriteria(comment, user);

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

router.delete('/', async (req, res) => {
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

router.patch('/', async (req, res) => {
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
