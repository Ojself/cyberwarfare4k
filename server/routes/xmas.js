const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { saveAndUpdateUser } = require('./helper');

const emojis = [
  '🎄',
  '❄️',
  '🎁',
  '🎅',
  '🌟',
  '🍪',
];

const stashes = [
  'Proxmark3 Kit',
  'Keylogger',
  'WiFi Pineapple',
  'EyeSpy Digital Spy Recorder',
  'Rubber Ducky',
  'Computer',
  'Ubertooth One',
  'Magspoof',
  'Raspberry Pi',
  'HackRf One',
  'Mini Hidden Camera',
];

const currencies = [
  'Litecoin',
  'Ethereum',
  'Ripple',
  'Monero',
  'Zcash',
  'Dash',
];
const getRandomThing = (thing) => thing[Math.floor(Math.random() * thing.length)];

const gifts = [
  'statPoint',
  'currency',
  'stash',
  'bitCoins',
  'battery',
  'stashMega',

];

// @Post
// PRIVATE
// User found a gift

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { id } = req.body;
  if (!id || !user) {
    return res.status(403).json({ success: false });
  }

  /* if number is higher than 24. do something */
  console.info(`${id} was found by ${user.name}`);
  const currentGiftCount = Object.values(user.xmas).filter(Boolean).length;
  console.info(`${user.name} found ${currentGiftCount} in total`);
  const gift = gifts[(currentGiftCount - 1) % gifts.length];
  let message;
  if (user.xmas[id]) {
    return res.status(403).json({ success: false, message: `${id} is already found` });
  }
  user.xmas[id] = true;

  if (gift === 'statPoint') {
    user.playerStats.statPoints += 1;
    message = 'You found 1 statpoint!';
  } else if (gift === 'currency') {
    const randomCurrency = getRandomThing(currencies);
    const amount = Math.ceil(Math.random() * 100) * 10;
    user.currencies[randomCurrency] += amount;
    message = `You found ${amount} ${randomCurrency}s`;
  } else if (gift === 'stash') {
    const randomStash = getRandomThing(stashes);
    const amount = Math.ceil(Math.random() * 100) * 10;
    user.stash[randomStash] += amount;
    message = `You found ${amount} ${randomStash}s`;
  } else if (gift === 'bitCoins') {
    const amount = Math.ceil(Math.random() * 100) * 1000;
    user.bitCoinGain(amount);
    message = `You found ${amount} bitcoins!`;
  } else if (gift === 'battery') {
    const amount = Math.ceil(Math.random() * 5) + 3;
    user.batteryGain(amount);
    message = `You found ${amount} battery`;
  } else if (gift === 'stashMega') {
    const randomStash = getRandomThing(stashes);
    const amount = Math.ceil(Math.random() * 100) * 50;
    user.stash[randomStash] += amount;
    message = `You found ${amount} ${randomStash}s`;
  } else {
    message = 'Something went wrong, contact the admin!';
  }
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message,
    user: updatedUser,
  });
});

// @Put
// PRIVATE
// User found all gifts

router.put('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const currentGiftCount = Object.values(user.xmas).filter(Boolean).length;

  if (user.xmaxDone || currentGiftCount > 25) {
    return res.status(403).json({ success: false });
  }
  user.name = `${user.name} ${emojis[Math.floor(Math.random() * emojis.length)]}`;
  user.xmaxDone = true;
  const updatedUser = await saveAndUpdateUser(user);
  return res.status(200).json({
    success: true,
    message: `Merry christmas ${updatedUser.name}`,
    user: updatedUser,
  });
});

module.exports = router;
