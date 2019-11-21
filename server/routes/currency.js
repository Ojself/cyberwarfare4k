const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const {
  buyRouteCriterias,
  soldRouteCriterias,
  sellCurrency,
  purchaseCurrency,
} = require('../middlewares/middleCurrency');

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
    message: 'currency loaded..',
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

  const batteryCost = 5;
  const { name, amount } = req.body;

  const currency = await Currency.findOne({ name });
  const totalPrice = currency.price * amount;

  const message = buyRouteCriterias(user, batteryCost, currency, amount);
  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }


  purchaseCurrency(user, currency, amount, batteryCost, totalPrice);

  return res.status(200).json({
    success: true,
    message: `${amount} ${currency.name} purchased`,
  });
});

// @POST
// PRIVATE
// Sell a currency

// todo, let user sell more than one currency at the time.

router.post('/sell', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const batteryCost = 5;

  const { name, amount } = req.body;
  const currency = await Currency.findOne({ name });
  const totalPrice = currency.price * amount;

  const message = soldRouteCriterias(user, batteryCost, currency, amount);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  sellCurrency(user, currency, amount, batteryCost, totalPrice);

  return res.status(200).json({
    success: true,
    message: `${amount} ${currency.name} sold for ${totalPrice}..`,
  });
});

module.exports = router;
