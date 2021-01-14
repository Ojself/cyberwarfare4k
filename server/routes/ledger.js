const express = require('express');

const router = express.Router();
const User = require('../models/User');

const { tranfserCriteria } = require('../logic/ledger.js');
const { saveAndUpdateUser } = require('./helper'); // move to middleware?

const depositCriteria = (user, amount) => {
  if (!user) {
    return 'No user found';
  }
  if (!amount) {
    return 'Missing input';
  }
  if (amount > user.playerStats.bitCoins) {
    return 'You can\'t deposit money you don\'t have..';
  }
  return null;
};

const withdrawCriteria = (user, amount) => {
  if (!user) {
    return 'No user found';
  }
  if (!amount) {
    return 'Missing input';
  }
  if (amount > user.playerStats.ledger) {
    return 'You can\'t withdraw money you don\'t have..';
  }
  return null;
};

// @GET
// PRIVATE
// Retrives all users

router.get('/', async (req, res) => {
  const users = await User.find({ 'account.isSetup': true }).select({ name: '1' });
  if (!users) {
    return res.status(400).json({
      success: false,
      message: 'no hackers found, try again later..',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'hackers loaded..',
    users,
  });
});

// @POST
// PRIVATE
// Deposit money from ledger to hand

router.post('/deposit', async (req, res) => {
  // const fee = 1.05;
  const { depositAmount } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  const disallowed = depositCriteria(user, depositAmount);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  user.depositLedger(depositAmount);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${depositAmount} was deposited to your ledger`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Withdraws money from ledger to hand

router.post('/withdraw', async (req, res) => {
  // const fee = 1.05;
  const { withdrawAmount } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  const disallowed = withdrawCriteria(user, withdrawAmount);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.withdrawLedger(withdrawAmount);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${withdrawAmount} was withdrawed from your ledger`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Transfer money from hacker x to hacker y

router.post('/transfer/:id', async (req, res) => {
  const { receiverId, transferAmount } = req.body;
  const fee = 1.05;

  const amount = transferAmount * fee;

  const userId = req.user._id;
  const user = await User.findById(userId);
  const receiver = await User.findById(receiverId);

  const message = tranfserCriteria(user, receiver, amount);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  const notificationMessage = `You received ${transferAmount} from ${user.name}`;
  receiver.sendNotification(notificationMessage, Date.now());
  user.ledgerDrain(amount);
  receiver.ledgerGain(transferAmount);
  await receiver.save();
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${transferAmount} was sent to ${receiver.name}`,
    user: updatedUser,
  });
});

module.exports = router;
