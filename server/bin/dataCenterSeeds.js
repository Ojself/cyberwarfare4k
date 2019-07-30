const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const DataCenter = require('../models/DataCenter');

require('../configs/database');

/* CHANGE CHANGE CHANGE */
let dataCenters = [
  /* Novice */
  {
    name: 'Internet Troll',
    difficulty: 1,
    encryption: 10,
    currentFirewall: 140,
    maxFirewall: 140
  }
];

DataCenter.deleteMany()
  .then(() => {
    return DataCenter.create(dataCenters);
  })
  .then(dataCentersCreated => {
    console.log(
      `${dataCentersCreated.length} datacenters created with the following id:`
    );
    console.log(dataCentersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
