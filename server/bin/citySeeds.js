const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const City = require('../models/City');
require('../configs/database');

const cities = [
  {
    name: 'Shanghai',
    _id: '5fae62409cbf7d270f23470b',
    stashPriceMultiplier: 1.09,
    residents: ['5fae6d7ee60018434108369c', '5fca3b4a86e77b5c8e58b67e'],

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

City.deleteMany()
  .then(() => City.create(cities))
  .then((citiesCreated) => {
    console.log(
      `${citiesCreated.length} cities created`,
    );
  })
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
