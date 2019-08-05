const mongoose = require('mongoose');
const Currency = require('../models/User');

// todo make sure date hets pushed

function currencyPriceInterval() {
  Currency.find({}).then(currencies => {
    currencies.map(currency => {
      currency.historyPrice.push(currency.price)
      //currency.historyTime.push(Date.now())
      currency.price = calculatePrice(
        currency.lowerPrice
        currency.higherPrice,
      );
      currency.save();
    });
  });
}


// return a number between min and max
function calculatePrice(min, max) {
  let randomNumber = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(randomNumber)
}

module.exports = currencyPriceInterval;
