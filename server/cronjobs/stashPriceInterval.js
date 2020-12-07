const Stash = require('../models/Stash');

// Sets a new price of the stash every hour based upon the lower price
// Will never go over 2 times the price

const stashPriceInterval = async () => {
  const stash = await Stash.find({});
  stash.forEach((s) => {
    s.setNewRandomPrice();
  });
  await Promise.all(stash.map((s) => s.save()));
};

module.exports = stashPriceInterval;
