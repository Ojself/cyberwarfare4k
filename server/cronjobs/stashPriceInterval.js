const Stash = require('../models/Stash');

// Sets a new price of the stash every hour based upon the lower price
// Will never go over 2 times the price

const stashPriceInterval = async () => {
  const stash = await Stash.find({});
  stash.forEach((s) => {
    const multiplier = s.lowerPrice * (Math.random() + 1);
    console.log(multiplier, "multiplier");
    s.price = Math.floor(multiplier);
    console.log(s.price, "s.price");
  });
  await Promise.all(stash.map((s) => s.save()));
};

module.exports = stashPriceInterval;
