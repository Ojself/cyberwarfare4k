const express = require('express');
const { isLoggedIn } = require('../logic/auth');
const {
  buyRouteCriterias,
  soldRouteCriterias,
} = require('../logic/currency');
const { saveAndUpdateUser } = require('../logic/_helpers');

const router = express.Router();
const User = require('../models/User');
const Currency = require('../models/Currency');

// @GET
// PRIVATE
// Retrives all currencies

router.get('/', isLoggedIn, async (req, res) => {
  const currency = await Currency.find().populate('lastPurchasedBy', 'name');

  return res.status(200).json({
    success: true,
    message: 'currency loaded...',
    currency,
  });
});

// @POST
// PRIVATE
// Purchases a currency

// todo, let user purchase more than one currency at the time.

router.post('/buy', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const currentHour = new Date().getHours()
  /* User pays 2 battery to be able to do purchases the current hour */
  const batteryCost = currentHour === user.playerStats.currencyLastPurchaseHour ? 0 : 2
  const { name, amount } = req.body;

  const currency = await Currency.findOne({ name });
  const totalPrice = currency.price * amount;

  const message = buyRouteCriterias(user, currency, amount,batteryCost);
  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  user.purchaseCurrency(currency, amount, totalPrice, currentHour);
  currency.purchaseHandle(amount, user._id);
  await currency.save();

  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${amount} ${currency.name} purchased`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Sell a currency

// todo, let user sell more than one currency at the time.

router.post('/sell', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { name, amount } = req.body;
  const currency = await Currency.findOne({ name });
  const totalPrice = currency.price * amount;

  const message = soldRouteCriterias(user, currency, amount);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  user.sellCurrency(currency, amount, totalPrice);
  currency.sellHandle(amount);
  await currency.save();
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${amount} ${currency.name} sold for ${Math.round(totalPrice)}...`,
    user: updatedUser,
  });
});

module.exports = router;
