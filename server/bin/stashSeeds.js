const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// pics
// https://game-icons.net/1x1/delapouite/jack-plug.html
// https://game-icons.net/1x1/lorc/book-cover.html
// https://game-icons.net/1x1/delapouite/lockpicks.html
// https://game-icons.net/1x1/delapouite/door-handle.html
// https://game-icons.net/1x1/delapouite/plastic-duck.html
// https://game-icons.net/1x1/lorc/skeleton-key.html
// https://game-icons.net/1x1/lorc/spyglass.html
// https://game-icons.net/1x1/delapouite/pineapple.html
// https://game-icons.net/1x1/delapouite/radio-tower.html
// https://game-icons.net/1x1/skoll/pc.html
// https://game-icons.net/1x1/delapouite/usb-key.html
// https://game-icons.net/1x1/lorc/magnet.html
// https://game-icons.net/1x1/delapouite/raspberry.html
// https://game-icons.net/1x1/delapouite/video-camera.html

const Stash = require('../models/Stash');

require('../configs/database');

const stash = [
  {
    _id: '5fd7c635382e6600042582f1',
    name: 'Cables',
    lowerPrice: 3,
    price: 3.45,
  },
  {
    _id: '5fd7c635382e6600042582f2',
    name: 'Linux for dummies',
    lowerPrice: 10,
    price: 10.5,
  },
  {
    _id: '5fd7c635382e6600042582f3',
    name: 'Lock pick set',
    lowerPrice: 15,
    price: 15.82,
  },

  {
    _id: '5fd7c635382e6600042582fb',
    name: 'Ubertooth One',
    lowerPrice: 25,
    price: 31.75,
  },
  {
    _id: '5fd7c635382e6600042582fd',
    name: 'Raspberry Pi',
    lowerPrice: 35,
    price: 35.19,
  },
  {
    _id: '5fd7c635382e6600042582f6',
    name: 'Keylogger',
    lowerPrice: 50,
    price: 75.39,
  },
  {
    _id: '5fd7c635382e6600042582fe',
    name: 'Mini Hidden Camera',
    lowerPrice: 90,
    price: 82.61,
  },

  {
    _id: '5fd7c635382e6600042582f7',
    name: 'EyeSpy Digital Spy Recorder',
    lowerPrice: 80,
    price: 113.41,
  },

  {
    _id: '5fd7c635382e6600042582fc',
    name: 'Magspoof',
    lowerPrice: 60,
    price: 170.44,
  },
  {
    _id: '5fd7c635382e6600042582f5',
    name: 'Rubber Ducky',
    lowerPrice: 100,
    price: 209.55,
  },
  {
    _id: '5fd7c635382e6600042582f4',
    name: 'Proxmark3 Kit',
    lowerPrice: 300,
    price: 453.01,
  },
  {
    _id: '5fd7c635382e6600042582f8',
    name: 'WiFi Pineapple',
    lowerPrice: 400,
    price: 523.17,
  },
  {
    _id: '5fd7c635382e6600042582f9',
    name: 'HackRf One',
    lowerPrice: 600,
    price: 685.8,
  },
  {
    _id: '5fd7c635382e6600042582fa',
    name: 'Computer',
    lowerPrice: 1000,
    price: 1007.51,
  },
];
const stashSeeds = async () => {
  await Stash.deleteMany();
  let stashCreated;
  try {
    stashCreated = await Stash.create(stash);
  } catch (err) {
    console.error('Stash seeds error: ', err);
    throw err;
  }
  console.info(stashCreated.length, ' stash created');
};

module.exports = { stashSeeds };
