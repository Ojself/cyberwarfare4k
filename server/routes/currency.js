const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const {
  buyRouteCriterias,
  soldRouteCriterias,
  sellCurrency,
  purchaseCurrency
} = require('../middlewares/middleCurrency');
const router = express.Router();
const User = require('../models/User');
const Currency = require('../models/Currency');

// @GET
// PRIVATE
// Retrives all currencies

router.get('/', isLoggedIn, async (req, res, next) => {
  let currency = await Currency.find().populate('lastPurchasedBy', 'name');

  return res.status(200).json({
    success: true,
    message: 'currency loaded',
    currency
  });
});

// @POST
// PRIVATE
// Purchases a currency

// todo, let user purchase more than one currency at the time.

router.post('/buy', isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const batteryCost = 5;
  const { name, amount } = req.body;

  const currency = await Currency.findOne({ name });
  let totalPrice;

  let message = buyRouteCriterias(user, batteryCost, currency, amount);
  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  totalPrice = currency.price * amount;

  purchaseCurrency(user, currency, amount, batteryCost, totalPrice);

  res.status(200).json({
    success: true,
    message: `${amount} ${currency.name} purchased`
  });
});

// @POST
// PRIVATE
// Sell a currency

// todo, let user sell more than one currency at the time.

router.post('/sell', isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const batteryCost = 5;

  const { name, amount } = req.body;
  const currency = await Currency.findOne({ name });
  let totalPrice;

  let message = soldRouteCriterias(user, batteryCost, currency, amount);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  totalPrice = currency.price * amount;

  sellCurrency(user, currency, amount, batteryCost, totalPrice);

  res.status(200).json({
    success: true,
    message: `${amount} ${currency.name} sold for ${totalPrice}`
  });
});

module.exports = router;
