const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// $ node bin/stashSeeds.js

const mongoose = require('mongoose');
const Stash = require('../models/Stash');

require('../configs/database');

let stash = [
  {
    name: 'Cables',
    lowerPrice: 3,
    price: 3
  },
  {
    name: 'Linux for dummies',
    lowerPrice: 10,
    price: 10
  },
  {
    name: 'Lock pick set',
    lowerPrice: 15,
    price: 15
  },
  {
    name: 'Proxmark3 Kit',
    lowerPrice: 300,
    price: 300
  },
  {
    name: 'Rubber Ducky',
    lowerPrice: 100,
    price: 100
  },
  {
    name: 'Keylogger',
    lowerPrice: 50,
    price: 50
  },
  {
    name: 'EyeSpy Digital Spy Recorder',
    lowerPrice: 80,
    price: 80
  },
  {
    name: 'WiFi Pineapple',
    lowerPrice: 400,
    price: 400
  },
  {
    name: 'HackRf One',
    lowerPrice: 600,
    price: 600
  },
  {
    name: 'Computer',
    lowerPrice: 1000,
    price: 1000
  },
  {
    name: 'Ubertooth One',
    lowerPrice: 25,
    price: 25
  },
  {
    name: 'Magspoof',
    lowerPrice: 60,
    price: 60
  },
  {
    name: 'Raspberry Pi',
    lowerPrice: 35,
    price: 35
  },
  {
    name: 'Mini Hidden Camera',
    lowerPrice: 90,
    price: 90
  }
];

Stash.deleteMany()
  .then(() => {
    return Stash.create(stash);
  })
  .then(stashCreated => {
    console.log(`${stashCreated.length} stash created with the following id:`);
    console.log(stashCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
