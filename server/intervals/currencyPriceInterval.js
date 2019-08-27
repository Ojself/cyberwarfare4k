const mongoose = require('mongoose');
const Currency = require('../models/Currency');

// todo make sure date hets pushed@
// change model to fit react chart?

function currencyPriceInterval() {
  const currentHour = new Date().getMinutes();
  Currency.find({}).then(currencies => {
    currencies.map(currency => {
      currency.price = calculatePrice(
        currency.lowerPrice,
        currency.higherPrice
      );
      currency.historyPrice.push(currency.price);
      currency.historyTime.push(currentHour);
      /* this to make sure that we don't have to handle too big arrays when converting to visual presentation  */
      if (currency.historyPrice.length > 12) {
        currency.historyPrice.shift();
      }
      if (currency.historyTime.length > 12) {
        currency.historyTime.shift();
      }

      currency.save();
    });
  });
}

// return a number between min and max
function calculatePrice(min, max) {
  let randomNumber = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(randomNumber);
}

module.exports = currencyPriceInterval;
