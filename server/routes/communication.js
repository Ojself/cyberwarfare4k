const express = require('express');

const router = express.Router();
const User = require('../models/User');

// @POST
// PRIVATE
// reads all messages

router.post('/readAll', async (req, res) => {
  const { communication } = req.body;
  const userId = req.user._id;
  let user;
  try {
    user = await User.findById(userId);
    await user.readAllmessages(communication);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'messages read',
  });
});

// @POST
// PRIVATE
// reads all messages

// TODO short down message date
router.post('/message/', async (req, res) => {
  const { receiverId, text } = req.body;
  const userId = req.user._id;
  let user;
  let receiver;
  try {
    user = await User.findById(userId);
    receiver = await User.findById(receiverId);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`
    });
  }

  if (JSON.stringify(userId) === JSON.stringify(receiverId)) { // sending messages to himself
    user.sendMessage(text, receiver.name, true);
  } else {
    user.sendMessage(text, receiver.name);
    receiver.receiveMessage(text, user.name);
  }


  return res.status(200).json({
    success: true,
    message: 'message sent!',
  });
});

module.exports = router;
