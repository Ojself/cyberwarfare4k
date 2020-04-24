const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');


// @GET
// PRIVATE
// get all messages for user

router.get('/', async (req, res) => {
  const userId = req.user._id;
  let inbox;
  let sent;

  try {
    inbox = await Message.find({ to: userId }).populate('from', 'name').sort({ createdAt: -1 });
    sent = await Message.find({ from: userId }).populate('to', 'name').sort({ createdAt: -1 });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }
  const jsonMessage = `${sent.length ? sent.length : 0} messages loaded..`;
  return res.status(200).json({
    success: true,
    message: jsonMessage,
    messages: {
      inbox,
      sent,
    },
  });
});

// @PATCH
// PRIVATE
// reads all messages

router.patch('/', async (req, res) => {
  const userId = req.user._id;
  let messages;

  try {
    messages = await Message.find({ to: userId, read: false });
    await messages.forEach(async (m) => {
      m.readMe();
    });
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
// sends message from one user to another and archives the sent message

router.post('/', async (req, res) => {
  const { receiverId, text } = req.body;
  const userId = req.user._id;

  let recieverExist;
  try {
    recieverExist = await User.exists({ _id: receiverId });
    if (recieverExist) {
      await generateMessage(userId, receiverId, text);
    }
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }
  return res.status(200).json({
    success: true,
    message: 'message sent ..',
  });
});

const generateMessage = (userId, receiverId, text) => {
  const now = new Date(Date.now()).toString().slice(0, 21);

  const newMessage = new Message({
    from: userId,
    to: receiverId,
    dateSent: now,
    read: false,
    text,
  });
  return newMessage.save();
};

module.exports = router;
