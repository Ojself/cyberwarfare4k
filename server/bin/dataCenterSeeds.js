const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const DataCenter = require('../models/DataCenter');

require('../configs/database');

const stashes = ['5fb81a17d17bad951c59541f',
  '5fb81a17d17bad951c595420',
  '5fb81a17d17bad951c595422',
  '5fb81a17d17bad951c595421',
  '5fb81a17d17bad951c595423',
  '5fb81a17d17bad951c595428',
  '5fb81a17d17bad951c595425',
  '5fb81a17d17bad951c595424',
  '5fb81a17d17bad951c595426',
  '5fb81a17d17bad951c595427',
  '5fb81a17d17bad951c59542a',
  '5fb81a17d17bad951c595429',
  '5fb81a17d17bad951c59542c',
  '5fb81a17d17bad951c59542b'];

const getThreeRandomStash = () => {
  const randomStash = [];
  for (let i = 0; i < 3; i += 1) {
    randomStash.push(stashes[Math.floor(Math.random() * stashes.length)]);
  }
  return randomStash;
};

const config = {
  easy: {
    price: 1000000,
    firewall: 90,
    difficulty: 20,
    minutlyrevenue: 360,
  },
  medium: {
    price: 1500000,
    firewall: 150,
    difficulty: 25,
    minutlyrevenue: 400,
  },
  hard: {
    price: 2000000,
    firewall: 210,
    difficulty: 30,
    minutlyrevenue: 490,
  },
  challenging: {
    price: 3000000,
    firewall: 270,
    difficulty: 40,
    minutlyrevenue: 670,
  },
  impossible: {
    price: 5000000,
    firewall: 450,
    difficulty: 50,
    minutlyrevenue: 1100,
  },
};

DataCenter.deleteMany()
  .then(() => {
    const dataCenters = [
      {
        _id: '5fd7c67df260ed00042f3b42',
        status: 'Available',
        price: config.easy.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.easy.firewall,
        maxFirewall: config.easy.firewall,
        gracePeriod: Date.now(),
        name: 'China Telecom',
        difficulty: config.easy.difficulty,
        minutlyrevenue: config.easy.minutlyrevenue,
        city: '5fae62409cbf7d270f23470b',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b43',
        status: 'Available',
        price: config.medium.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.medium.firewall,
        maxFirewall: config.medium.firewall,
        gracePeriod: Date.now(),
        name: 'China Unicom',
        difficulty: config.medium.difficulty,
        minutlyrevenue: config.medium.minutlyrevenue,
        owner: '5fca3b4a86e77b5c8e58b681', // npc_trudy
        city: '5fae62409cbf7d270f23470b',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b44',
        status: 'Available',
        price: config.hard.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.hard.firewall,
        maxFirewall: config.hard.firewall,
        gracePeriod: Date.now(),
        name: 'China Mobile Hohot',
        difficulty: config.hard.difficulty,
        minutlyrevenue: config.hard.minutlyrevenue,
        owner: '5fca3b4a86e77b5c8e58b682', // npc_grace
        city: '5fae62409cbf7d270f23470b',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b45',
        status: 'Available',
        price: config.challenging.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.challenging.firewall,
        maxFirewall: config.challenging.firewall,
        gracePeriod: Date.now(),
        name: 'Harbin Data Centre',
        difficulty: config.challenging.difficulty,
        minutlyrevenue: config.challenging.minutlyrevenue,
        city: '5fae62409cbf7d270f23470b',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b46',
        status: 'Available',
        price: config.impossible.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.impossible.firewall,
        maxFirewall: config.impossible.firewall,
        gracePeriod: Date.now(),
        name: 'Range International Data Centre',
        difficulty: config.impossible.difficulty,
        minutlyrevenue: config.impossible.minutlyrevenue,
        owner: '5fca3b4a86e77b5c8e58b67f', // npc_sybil
        city: '5fae62409cbf7d270f23470b',
        __v: 0,
      },

      {
        _id: '5fd7c67df260ed00042f3b47',
        status: 'Available',
        price: config.easy.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.easy.firewall,
        maxFirewall: config.easy.firewall,
        gracePeriod: Date.now(),
        name: 'Telehouse (KDDI)',
        difficulty: config.easy.difficulty,
        minutlyrevenue: config.easy.minutlyrevenue,
        city: '5fae62409cbf7d270f23470e',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b49',
        status: 'Available',
        price: config.hard.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.hard.firewall,
        maxFirewall: config.hard.firewall,
        gracePeriod: Date.now(),
        name: 'GDS Hanoi Thanglong',
        difficulty: config.hard.difficulty,
        minutlyrevenue: config.hard.minutlyrevenue,
        city: '5fae62409cbf7d270f23470e',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b48',
        status: 'Available',
        price: config.medium.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.medium.firewall,
        maxFirewall: config.medium.firewall,
        gracePeriod: Date.now(),
        name: 'NTT Communications',
        difficulty: config.medium.difficulty,
        minutlyrevenue: config.medium.minutlyrevenue,
        city: '5fae62409cbf7d270f23470e',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b4a',
        status: 'Available',
        price: config.challenging.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.challenging.firewall,
        maxFirewall: config.challenging.firewall,
        gracePeriod: Date.now(),
        name: 'Tulip Data Centre ',
        difficulty: config.challenging.difficulty,
        minutlyrevenue: config.challenging.minutlyrevenue,
        city: '5fae62409cbf7d270f23470e',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b4b',
        status: 'Available',
        price: config.impossible.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.impossible.firewall,
        maxFirewall: config.impossible.firewall,
        gracePeriod: Date.now(),
        name: 'TELEHOUSE Hanoi',
        difficulty: config.impossible.difficulty,
        minutlyrevenue: config.impossible.minutlyrevenue,
        city: '5fae62409cbf7d270f23470e',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b4e',
        status: 'Available',
        price: config.hard.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.hard.firewall,
        maxFirewall: config.hard.firewall,
        gracePeriod: Date.now(),
        name: 'Global Switch',
        difficulty: config.hard.difficulty,
        minutlyrevenue: config.hard.minutlyrevenue,
        city: '5fae62409cbf7d270f23470c',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b4d',
        status: 'Available',
        price: config.medium.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.medium.firewall,
        maxFirewall: config.medium.firewall,
        gracePeriod: Date.now(),
        name: 'Next Generation Data',
        difficulty: config.medium.difficulty,
        minutlyrevenue: config.medium.minutlyrevenue,
        city: '5fae62409cbf7d270f23470c',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b4c',
        status: 'Available',
        price: config.easy.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.easy.firewall,
        maxFirewall: config.easy.firewall,
        gracePeriod: Date.now(),
        name: 'Equinix',
        difficulty: config.easy.difficulty,
        minutlyrevenue: config.easy.minutlyrevenue,
        city: '5fae62409cbf7d270f23470c',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b53',
        status: 'Available',
        price: config.hard.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.hard.firewall,
        maxFirewall: config.hard.firewall,
        gracePeriod: Date.now(),
        name: 'Lakeside Technology Centre',
        difficulty: config.hard.difficulty,
        minutlyrevenue: config.hard.minutlyrevenue,
        city: '5fae62409cbf7d270f23470d',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b4f',
        status: 'Available',
        price: config.challenging.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.challenging.firewall,
        maxFirewall: config.challenging.firewall,
        gracePeriod: Date.now(),
        name: 'Kao Data Campus',
        difficulty: config.challenging.difficulty,
        minutlyrevenue: config.challenging.minutlyrevenue,
        city: '5fae62409cbf7d270f23470c',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b50',
        status: 'Available',
        price: config.impossible.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.impossible.firewall,
        maxFirewall: config.impossible.firewall,
        gracePeriod: Date.now(),
        name: 'Kolos Data Centre',
        difficulty: config.impossible.difficulty,
        minutlyrevenue: config.impossible.minutlyrevenue,
        city: '5fae62409cbf7d270f23470c',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b51',
        status: 'Available',
        price: config.easy.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.easy.firewall,
        maxFirewall: config.easy.firewall,
        gracePeriod: Date.now(),
        name: 'Digital Realty Trust',
        difficulty: config.easy.difficulty,
        minutlyrevenue: config.easy.minutlyrevenue,
        city: '5fae62409cbf7d270f23470d',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b54',
        status: 'Available',
        price: config.challenging.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.challenging.firewall,
        maxFirewall: config.challenging.firewall,
        gracePeriod: Date.now(),
        name: 'Switch SUPERNAP',
        difficulty: config.challenging.difficulty,
        minutlyrevenue: config.challenging.minutlyrevenue,
        city: '5fae62409cbf7d270f23470d',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b55',
        status: 'Available',
        price: config.impossible.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.impossible.firewall,
        maxFirewall: config.impossible.firewall,
        gracePeriod: Date.now(),
        name: 'The Citadel',
        difficulty: config.impossible.difficulty,
        minutlyrevenue: config.impossible.minutlyrevenue,
        city: '5fae62409cbf7d270f23470d',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b58',
        status: 'Available',
        price: config.hard.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.hard.firewall,
        maxFirewall: config.hard.firewall,
        gracePeriod: Date.now(),
        name: 'Datahouse',
        difficulty: config.hard.difficulty,
        minutlyrevenue: config.hard.minutlyrevenue,
        city: '5fae62409cbf7d270f23470f',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b52',
        status: 'Available',
        price: config.medium.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.medium.firewall,
        maxFirewall: config.medium.firewall,
        gracePeriod: Date.now(),
        name: 'DuPont Fabros Technology',
        difficulty: config.medium.difficulty,
        minutlyrevenue: config.medium.minutlyrevenue,
        city: '5fae62409cbf7d270f23470d',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b5a',
        status: 'Available',
        price: config.impossible.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.impossible.firewall,
        maxFirewall: config.impossible.firewall,
        gracePeriod: Date.now(),
        name: 'RTCOMM',
        difficulty: config.impossible.difficulty,
        minutlyrevenue: config.impossible.minutlyrevenue,
        city: '5fae62409cbf7d270f23470f',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b56',
        status: 'Available',
        price: config.easy.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.easy.firewall,
        maxFirewall: config.easy.firewall,
        gracePeriod: Date.now(),
        name: 'Selectel',
        difficulty: config.easy.difficulty,
        minutlyrevenue: config.easy.minutlyrevenue,
        city: '5fae62409cbf7d270f23470f',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b59',
        status: 'Available',
        price: config.challenging.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.challenging.firewall,
        maxFirewall: config.challenging.firewall,
        gracePeriod: Date.now(),
        name: 'Data Harbour',
        difficulty: config.challenging.difficulty,
        minutlyrevenue: config.challenging.minutlyrevenue,
        city: '5fae62409cbf7d270f23470f',
        __v: 0,
      },
      {
        _id: '5fd7c67df260ed00042f3b57',
        status: 'Available',
        price: config.medium.price,
        requiredStash: getThreeRandomStash(),
        currentFirewall: config.medium.firewall,
        maxFirewall: config.medium.firewall,
        gracePeriod: Date.now(),
        name: 'Rostelecom',
        difficulty: config.medium.difficulty,
        minutlyrevenue: config.medium.minutlyrevenue,
        city: '5fae62409cbf7d270f23470f',
        __v: 0,
      },

    ];
    return DataCenter.create(dataCenters);
  })
  .then((dataCentersCreated) => console.info(`${dataCentersCreated.length} datacenters created`))
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
