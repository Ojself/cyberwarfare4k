const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// $ node bin/stashSeeds.js

const mongoose = require('mongoose');
const Stash = require('../models/Stash');

require('../configs/database');
// https://game-icons.net/1x1/delapouite/jack-plug.html
const stash = [
  {
    name: 'Cables',
    lowerPrice: 3,
    price: 3,
    img: '',
  },
  // https://game-icons.net/1x1/lorc/book-cover.html
  {
    name: 'Linux for dummies',
    lowerPrice: 10,
    price: 10,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/lockpicks.html
  {
    name: 'Lock pick set',
    lowerPrice: 15,
    price: 15,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/door-handle.html
  {
    name: 'Proxmark3 Kit',
    lowerPrice: 300,
    price: 300,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/plastic-duck.html
  {
    name: 'Rubber Ducky',
    lowerPrice: 100,
    price: 100,
    img: '',
  },
  // https://game-icons.net/1x1/lorc/skeleton-key.html
  {
    name: 'Keylogger',
    lowerPrice: 50,
    price: 50,
    img: '',
  },
  // https://game-icons.net/1x1/lorc/spyglass.html
  {
    name: 'EyeSpy Digital Spy Recorder',
    lowerPrice: 80,
    price: 80,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/pineapple.html
  {
    name: 'WiFi Pineapple',
    lowerPrice: 400,
    price: 400,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/radio-tower.html
  {
    name: 'HackRf One',
    lowerPrice: 600,
    price: 600,
    img: '',
  },
  // https://game-icons.net/1x1/skoll/pc.html
  {
    name: 'Computer',
    lowerPrice: 1000,
    price: 1000,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/usb-key.html
  {
    name: 'Ubertooth One',
    lowerPrice: 25,
    price: 25,
    img: '',
  },
  // https://game-icons.net/1x1/lorc/magnet.html
  {
    name: 'Magspoof',
    lowerPrice: 60,
    price: 60,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/raspberry.html
  {
    name: 'Raspberry Pi',
    lowerPrice: 35,
    price: 35,
    img: '',
  },
  // https://game-icons.net/1x1/delapouite/video-camera.html
  {
    name: 'Mini Hidden Camera',
    lowerPrice: 90,
    price: 90,
    img: '',
  },
];

Stash.deleteMany()
  .then(() => Stash.create(stash))
  .then((stashCreated) => {
    console.log(`${stashCreated.length} stash created with the following id:`);
    console.log(stashCreated.map((u) => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
