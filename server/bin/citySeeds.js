const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/citySeeds.js

const mongoose = require('mongoose');
const City = require('../models/City');

require('../configs/database');

const cities = [
  { name: 'Shanghai' },
  { name: 'Hanoi' },
  { name: 'Stavanger' },
  { name: 'Phoenix' },
  { name: 'Novosibirsk' },
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
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
