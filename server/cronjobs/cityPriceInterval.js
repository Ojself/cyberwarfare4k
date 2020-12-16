const City = require('../models/City');

// Sets a new price of the stash every hour based upon the lower price
// Will never go over 2 times the price

const cityPriceInterval = async () => {
  const cities = await City.find({});
  cities.forEach((city) => {
    city.stashPriceMultiplier = (Math.random() / 4 + 1);
    city.price = Math.ceil(Math.random() * 5) * 1000;
  });
  await Promise.all(cities.map((city) => city.save()));
};

module.exports = cityPriceInterval;
