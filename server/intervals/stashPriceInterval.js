const mongoose = require('mongoose');
const Stash = require('../models/Stash');

// Sets a new price of the stash every hour based upon the lower price
// Will never go over 2 times the price

//todo, rewrite to async await
function stashPriceInterval() {
  Stash.find({}).then(stash => {
    stash.map(stash => {
      let multiplier = stash.lowerPrice * (Math.random() + 1);
      stash.price = Math.floor(multiplier);
      stash.save();
    });
  });
}

module.exports = stashPriceInterval;
