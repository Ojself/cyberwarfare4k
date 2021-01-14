const express = require('express');

const router = express.Router();
const User = require('../models/User');

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

// @GET
// PRIVATE
// Get active spies

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
// Deposit money from hand to vault

router.post('/', async (req, res) => {
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

router.post('/attack', async (req, res) => {
  const { opponentId } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  return res.status(200).json({
    success: true,
    message: 'You attacked',
  });
});

module.exports = router;
