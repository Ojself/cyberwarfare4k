const { existingValue } = require('./middleHelpers');

// Sees if everything is in order to sell currency
const soldRouteCriterias = (user, currency, amount) => {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(currency)) {
    return "Currency doesn't exist";
  }
  if (!checkUserStock(user, currency, amount)) {
    return "You don't have that much to sell";
  }
  return null;
};

// Sees if everything is in order to buy currency
const buyRouteCriterias = (user, currency, amount) => {
  if (!existingValue(currency)) {
    return "Currency doesn't exist";
  }
  if (!checkCurrencyRequiredLevel(user, currency)) {
    return 'You need to be a higher level to buy this currency';
  }
  if (!checkCurrencyfund(user, currency, amount)) {
    return 'Insufficent funds';
  }
  if (checkCurrencyMarketCap(user, currency, amount)) {
    return `You can't buy OR hold more than 25% of the marketshare of ${currency.name}`;
  }
  if (!checkCurrencyAvailablitiy(currency, amount)) {
    return "You're can't buy more than what is available in the market";
  }
  return null;
};

// checks if level requirement for purchasing is met
const checkCurrencyRequiredLevel = (user, currency) => user.playerStats.rank >= currency.levelReq;

// checks if user has enough money
const checkCurrencyfund = (user, currency, amount) => user.playerStats.bitCoins >= currency.price * amount;

// checks if there's enough available currency to purchase
const checkCurrencyAvailablitiy = (currency, amount) => currency.available >= amount;

// user is not allowed to hold more than 10% of the global marketshare of one currency
const checkCurrencyMarketCap = (user, currency, amount) => {
  // what the user already has in his wallet
  const userCoins = user.currencies[currency.name];
  console.log(userCoins, 'userCoins');
  console.log(0.25 * currency.marketCap, '0.25 * currency.marketCap');
  console.log(amount, 'amount');
  console.log(parseInt(amount + userCoins, 10), 'parseInt(amount + userCoins, 10)');
  console.log(0.25 * currency.marketCap < parseInt(amount + userCoins, 10), '0.25 * currency.marketCap < parseInt(amount + userCoins, 10)');
  return 0.25 * currency.marketCap < parseInt(amount + userCoins, 10);
};

// checks if user has the amount of currencies he's trying to sell
const checkUserStock = (user, currency, amount) => user.currencies[currency.name] >= amount;

module.exports = {
  soldRouteCriterias,
  buyRouteCriterias,
};
