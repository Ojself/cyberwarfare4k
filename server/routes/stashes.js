const express = require('express');

const router = express.Router();

const Stash = require('../models/Stash');
const User = require('../models/User');
const { saveAndUpdateUser } = require('./helper');
const {
  checkBuyStashCriteria, checkSellStashCriteria, cleanObj, summarizeStash,
} = require('../logic/stash');

// @GET
// PRIVATE
// Retrives stashes

router.get('/', async (req, res) => {
  const stashes = await Stash.find().sort({ price: 1 });

  res.status(200).json({
    success: true,
    message: 'stash loaded..',
    stashes,
  });
});

// @POST
// PRIVATE
// Buy stash

router.post('/buy', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate('playerStats.city', 'stashPriceMultiplier');
  const dbStashes = await Stash.find().lean();

  const stashToBuy = cleanObj(req.body);
  const totalSum = summarizeStash(user, dbStashes, stashToBuy);

  const disallowed = checkBuyStashCriteria(stashToBuy, user, totalSum);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.handleBuyStash(stashToBuy, totalSum);
  const updatedUser = await saveAndUpdateUser(user);

  res.status(200).json({
    success: true,
    message: `You spent ${Math.round(totalSum)} on stash..`,
    user: updatedUser,

  });
});

// @POST
// PRIVATE
// Sell stash

router.post('/sell', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).populate('playerStats.city', 'stashPriceMultiplier');
  const dbStashes = await Stash.find().lean();

  const stashToSell = cleanObj(req.body);
  const totalSum = summarizeStash(user, dbStashes, stashToSell);

  const disallowed = checkSellStashCriteria(stashToSell, user);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.handleSellStash(stashToSell, totalSum);
  const updatedUser = await saveAndUpdateUser(user);

  res.status(200).json({
    success: true,
    message: `You sold stash for ${Math.round(totalSum)}..`,
    user: updatedUser,

  });
});

module.exports = router;
