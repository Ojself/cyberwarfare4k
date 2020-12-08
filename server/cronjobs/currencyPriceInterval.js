const Currency = require('../models/Currency');

const calculatePrice = (min, max) => {
  const randomNumber = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(randomNumber);
};

const currencyPriceInterval = async () => {
  const currentHour = new Date().getHours();
  const currencies = await Currency.find({});
  currencies.forEach((c) => {
    c.price = calculatePrice(c.lowerPrice, c.higherPrice);
    c.historyPrice.push(c.price);
    c.historyTime.push(currentHour);
    if (c.historyPrice.length > 12) {
      c.historyPrice.shift();
    }
    if (c.historyTime.length > 12) {
      c.historyTime.shift();
    }
  });
  await Promise.all(currencies.map((currency) => currency.save()));
};

module.exports = currencyPriceInterval;
