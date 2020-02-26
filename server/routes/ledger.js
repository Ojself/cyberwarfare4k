const express = require('express');

const router = express.Router();
const User = require('../models/User');

const { tranfserCriteria } = require('../middlewares/middleLedger.js');
const { getAllUsers } = require('./helper'); // move to middleware?

// @GET
// PRIVATE
// Retrives all users

router.get('/', async (req, res) => {
  const users = await getAllUsers(null, { select: '1' });
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
// Withdraws money from ledger to hand

router.post('/deposit', async (req, res) => {
  // const fee = 1.05;
  const { amount } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  let message;

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  user.depositLedger(amount);

  return res.status(200).json({
    success: true,
    message: `${amount} was withdrawed from your ledger`,
  });
});

// @POST
// PRIVATE
// Withdraws money from ledger to hand

router.post('/withdraw', async (req, res) => {
  const fee = 1.05;
  const { amount } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  let message;

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  user.withdrawLedger(amount, fee);

  return res.status(200).json({
    success: true,
    message: `${amount} was withdrawed from your ledger`,
  });
});

// @POST
// PRIVATE
// Transfer money from hacker x to hacker y

router.post('/transfer/:id', async (req, res) => {
  const { receiverId, transferAmount } = req.body;
  const fee = 1.05;

  const userId = req.user._id;
  const user = await User.findById(userId);
  const receiver = await User.findById(receiverId);

  const message = tranfserCriteria(user, receiver, transferAmount * fee);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  user.ledgerDrainFromTransfer(transferAmount * fee);
  receiver.ledgerGainFromTransfer(transferAmount, user.name);

  return res.status(200).json({
    success: true,
    message: `${transferAmount} was sent to ${receiver.name}`,
  });
});

module.exports = router;
