const express = require('express');

const router = express.Router();

const User = require('../models/User');

const { saveAndUpdateUser } = require('../logic/_helpers');

// @post
// PRIVATE
// Redeem item

router.post('/redeem', async (req, res) => {
  console.log(req.body);
  const { amount } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (user.account.tokens < parseInt(amount, 10)) {
    return res.status(400).json({
      success: false,
      message: 'Insufficent tokens.',
    });
  }
  const batteryOverview = {
    144: 500,
    55: 250,
    10: 50,
  };
  const tokensUsed = batteryOverview[amount];
  user.redeemTokens(amount, batteryOverview[amount]);
  const updatedUser = await saveAndUpdateUser(user);
  return res.status(200).json({
    success: true,
    message: `You redeemed ${tokensUsed} and got ${amount} battery`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Buys tokens

router.post('/buy', async (req, res) => {
  const { amount, handler } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  user.gainTokens(amount);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `You bought ${amount} tokens with ${handler}`,
    user: updatedUser,
  });
});

module.exports = router;
