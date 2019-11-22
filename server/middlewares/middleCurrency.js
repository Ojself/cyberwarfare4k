const { batteryCheck, existingValue } = require('../middlewares/middleHelpers');

// Sees if everything is in order to sell currency
function soldRouteCriterias(user, batteryCost, currency, amount) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!existingValue(currency)) {
    return "Currency doesn't exist";
  }
  if (!checkUserStock(user, currency, amount)) {
    return "You don't have that much to sell";
  }
  return null;
}

// Sees if everything is in order to buy currency
function buyRouteCriterias(user, batteryCost, currency, amount) {
  if (!existingValue(currency)) {
    return "Currency doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!checkCurrencyRequiredLevel(user, currency)) {
    return 'You need to be a higher level to buy this currency';
  }
  if (!checkCurrencyfund(user, currency, amount)) {
    return 'Insufficent funds';
  }
  if (!checkCurrencyMarketCap(user, currency, amount)) {
    return;
    ("You can't hold more than 10% of the marketshare of this currency");
  }
  if (!checkCurrencyAvailablitiy(currency, amount)) {
    return "You're can't buy more than what is available in the market";
  }
  return null;
}

// checks if level requirement for purchasing is met
function checkCurrencyRequiredLevel(user, currency) {
  return user.playerStats.rank >= currency.levelReq;
}

// checks if user has enough money
function checkCurrencyfund(user, currency, amount) {
  console.log('checkCurrencyfund check');
  return user.playerStats.bitCoins >= currency.price * amount;
}

// checks if there's enough available currency to purchase
function checkCurrencyAvailablitiy(currency, amount) {
  console.log('checkCurrencyAvailablitiy check');
  return currency.available >= amount;
}

// user is not allowed to hold more than 10% of the global marketshare of one currency
function checkCurrencyMarketCap(user, currency, amount) {
  console.log('checkCurrencyMarketCap check');
  // what the user already has in his wallet
  const userCoins = user.currencies[currency.name];
  return (
    (currency.maxAmountHold / 100) * currency.marketCap + userCoins >= amount
  );
}

// makes the actual purchase in User and Currency model
function purchaseCurrency(user, currency, amount, batteryCost, totalPrice) {
  console.log('purchase Currency');
  user.purchaseCurrency(currency, amount, batteryCost, totalPrice);
  currency.purchaseHandle(amount, user._id);
}

// makes the actual sale in User and Currency model
function sellCurrency(user, currency, amount, batteryCost, totalPrice) {
  console.log('sell Currency');
  user.sellCurrency(currency, amount, batteryCost, totalPrice);
  currency.sellHandle(amount);
}

// checks if user has the amount of currencies he's trying to sell
function checkUserStock(user, currency, amount) {
  console.log('checkUserStock');
  return user.currencies[currency.name] >= amount;
}

module.exports = {
  soldRouteCriterias,
  buyRouteCriterias,
  sellCurrency,
  purchaseCurrency,
};
