const express = require('express');
const { isLoggedIn } = require('../middlewaresAuthAuth');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const Alliance = require('../models/Item');
const Forum = require('../models/forum');

router.get('/forum', async (req, res, next) => {
  const forums = await Forum.find();
  res.status(200).json({
    success: true,
    message: 'Forum loaded..',
    forums
  });
});

router.post('/forum', async (req, res, next) => {
  let post = req.body.comment;
  let userId = req.user._id;
  let user = await User.findById(userId);
  let date = new Date();
  const newMessage = Forum({
    user: user.name,
    post,
    date
  });
  newMessage.save();
});
