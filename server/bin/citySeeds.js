const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/citySeeds.js

const mongoose = require('mongoose');
const City = require('../models/City');

require('../configs/database');

const cities = [
  {
    name: 'Shanghai',
    _id: '5fae62409cbf7d270f23470b',

  },
  {
    name: 'Hanoi',
    _id: '5fae62409cbf7d270f23470c',

  },
  {
    name: 'Stavanger',
    _id: '5fae62409cbf7d270f23470d',

  },
  {
    name: 'Phoenix',
    _id: '5fae62409cbf7d270f23470e',

  },
  {
    name: 'Novosibirsk',
    _id: '5fae62409cbf7d270f23470f',

  },
];

City.deleteMany()
  .then(() => City.create(cities))
  .then((citiesCreated) => {
    console.log(
      `${citiesCreated.length} cities created with the following id:`,
    );
    console.log(citiesCreated.map((u) => u._id));
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
