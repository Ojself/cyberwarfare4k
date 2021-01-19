const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Message = require('../models/Message');
const Notification = require('../models/Notification');

const { getNotifications, getInbox, generateMessage } = require('../logic/_helpers');

const readAllNotifications = async (userId) => {
  const notifications = await Notification.find({ to: userId, read: false });
  notifications.forEach((n) => n.readMe());
  await Promise.all(notifications.map((n) => n.save()));
};

const readAllMessages = async (userId) => {
  const messages = await Message.find({ to: userId, read: false });
  messages.forEach((n) => n.readMe());
  await Promise.all(messages.map((m) => m.save()));
};

// @GET
// PRIVATE
// get all messages for user

router.get('/messages', async (req, res) => {
  const userId = req.user._id;
  const messages = await getInbox(userId);
  const jsonMessage = `${messages && messages.length ? messages.length : 0} messages loaded...`;
  res.status(200).json({
    success: true,
    message: jsonMessage,
    messages,
  });

  readAllMessages(userId);
});

// @GET
// PRIVATE
// get all notifications for user
router.get('/notifications', async (req, res) => {
  const userId = req.user._id;
  const notifications = await getNotifications(userId);
  const jsonMessage = `${notifications && notifications.length ? notifications.length : 0} notifications loaded...`;
  res.status(200).json({
    success: true,
    message: jsonMessage,
    notifications,
  });

  readAllNotifications(userId);
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
    message: 'message sent ...',
  });
});

module.exports = router;
