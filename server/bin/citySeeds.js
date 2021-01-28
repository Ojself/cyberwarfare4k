const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const City = require('../models/City');
require('../configs/database');

const cities = [
  {
    name: 'Shanghai',
    _id: '5fae62409cbf7d270f23470b',
    stashPriceMultiplier: 1.09,
    residents: ['5fca3b4a86e77b5c8e58b66a', '5fca3b4a86e77b5c8e58b67e'],
    allianceOwner: '5fae6d7ee60018434108369c',
    allianceFee: 0.05,
  },
  {
    name: 'Hanoi',
    _id: '5fae62409cbf7d270f23470c',
    stashPriceMultiplier: 1.02,
    residents: ['5fca3b4a86e77b5c8e58b67a', '5fca3b4a86e77b5c8e58b680'],
  },
  {
    name: 'Stavanger',
    _id: '5fae62409cbf7d270f23470d',
    stashPriceMultiplier: 1.04,
    residents: ['5fca3b4a86e77b5c8e58b67b', '5fca3b4a86e77b5c8e58b67f'],
  },
  {
    name: 'Phoenix',
    _id: '5fae62409cbf7d270f23470e',
    stashPriceMultiplier: 1.12,
    residents: ['5fca3b4a86e77b5c8e58b67c', '5fca3b4a86e77b5c8e58b681'],
  },
  {
    name: 'Novosibirsk',
    _id: '5fae62409cbf7d270f23470f',
    stashPriceMultiplier: 1.19,
    residents: ['5fca3b4a86e77b5c8e58b67d', '5fca3b4a86e77b5c8e58b682', '5fca3b4a86e77b5c8e58b683'],
  },
];
const citySeeds = async () => {
  await City.deleteMany();
  let citiesCreated;
  try {
    citiesCreated = await City.create(cities);
  } catch (err) {
    console.error('City seeds error: ', err);
    throw err;
  }
  console.info(citiesCreated.length, ' cities created');
};

// citySeeds();
module.exports = { citySeeds };
