const express = require('express');

const router = express.Router();
const User = require('../models/User');

// @POST
// PRIVATE
// reads all messages

router.post('/readAll', async (req, res) => {
  const { communication } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  await user.readAllmessages(communication);
  const readCommuncation = user.account[communication];

  return res.status(200).json({
    success: true,
    message: 'messages read',
    readCommuncation,
  });
});

// @POST
// PRIVATE
// reads all messages

// TODO short down message date
router.post('/message/', async (req, res) => {
  const { receiverId, text } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const receiver = await User.findById(receiverId);

  user.sendMessage(text, receiver.name);
  receiver.receiveMessage(text, user.name);

  return res.status(200).json({
    success: true,
    message: 'message sent!',
  });
});

module.exports = router;
