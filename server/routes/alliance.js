const express = require('express');
const { isLoggedIn } = require('../middlewaresAuthAuth');
const router = express.Router();
const User = require('../models/User');
const Forum = require('../models/forum');

router.get('/forum', async (req, res, next) => {
  const forums = await Forum.find();
  return res.status(200).json({
    success: true,
    message: 'Forum loaded..',
    forums
  });
});

router.post('/forum', async (req, res, next) => {
  const userId = req.user._id;
  const { comment } = req.body;
  const date = new Date();

  // TODO make sure the string is not including <script>, mroe than 250 char,

  const newMessage = Forum({
    user: userId,
    comment,
    date
  });
  newMessage.save();

  return res.status(200).json({
    success: true,
    message: `Message posted`
  });
});

router.delete('/forum', async (req, res, next) => {
  const userId = req.user._id;
  const { commentId } = req.body;
  const forumPost = await Forum.findById({ commentId });

  //ensure the user is trying to delete his own post
  if (forumPost.user !== userId) {
    return res.status(400).json({
      success: false,
      message: `You can't edit other peoples post..`
    });
  }

  Forum.deleteOne({ commentId });

  return res.status(200).json({
    success: true,
    message: `Message deleted`
  });
});

router.patch('/forum', async (req, res, next) => {
  const userId = req.user._id;
  const { commentId } = req.body;
  const forumPost = await Forum.findById({ commentId });

  //Ensure that the user is not trying to edit someone elses post
  if (forumPost.user !== userId) {
    return res.status(400).json({
      success: false,
      message: `You can't edit other peoples post..`
    });
  }
  // edit post
  forumPost.editPost(comment, date);

  return res.status(200).json({
    success: true,
    message: `Message successfuly edited`
  });
});
