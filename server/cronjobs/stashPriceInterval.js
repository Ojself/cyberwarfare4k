const Stash = require('../models/Stash');

// Sets a new price of the stash every hour based upon the lower price
// Will never go over 2 times the price

const stashPriceInterval = async () => {
  const stash = await Stash.find({});
  await Promise.all(stash.map((s) => s.setNewRandomPrice()));
};

module.exports = stashPriceInterval;
