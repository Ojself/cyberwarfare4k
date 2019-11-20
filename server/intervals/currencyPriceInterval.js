const Currency = require("../models/Currency");

// todo make sure date hets pushed@
// change model to fit react chart?

function currencyPriceInterval() {
  const currentHour = new Date().getMinutes();
  Currency.find({}).then(currencies => {
    currencies.map(c => {
      c.price = calculatePrice(c.lowerPrice, c.higherPrice);
      c.historyPrice.push(c.price);
      c.historyTime.push(currentHour);
      /* this to make sure that we don't have to handle too big arrays when converting to visual presentation  */
      if (c.historyPrice.length > 12) {
        c.historyPrice.shift();
      }
      if (c.historyTime.length > 12) {
        c.historyTime.shift();
      }

      c.save();
    });
  });
}

// return a number between min and max
function calculatePrice(min, max) {
  const randomNumber = (Math.random() * (max - min) + min).toFixed(2);
  return parseFloat(randomNumber);
}

module.exports = currencyPriceInterval;
