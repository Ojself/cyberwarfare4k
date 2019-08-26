const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/seeds.js
// todo, fix the requriedstash function so it's not as repetative

const mongoose = require('mongoose');
const DataCenter = require('../models/DataCenter');
const City = require('../models/City');
const Stash = require('../models/Stash');

require('../configs/database');

const cityIds = [];
const stashesIds = [];

async function getCities() {
  const cities = await City.find();
  cities.forEach(element => {
    cityIds.push(element._id);
  });
}

async function getStashes() {
  const stashes = await Stash.find();
  stashes.forEach(element => {
    stashesIds.push(element._id);
  });
}

function randomArrayNumber(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

DataCenter.deleteMany()
  .then(() => {
    return getCities();
  })
  .then(() => {
    return getStashes();
  })
  .then(() => {
    let dataCenters = [
      //SHANGHAI
      //SHANGHAI

      {
        name: 'China Telecom',
        difficulty: 30,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 180,
        city: cityIds[0],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)] /* wet code  */,
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'China Unicom',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[0],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'China Mobile Hohot',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[0],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Harbin Data Centre',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[0],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Range International Data Centre',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[0],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      // HANOI
      // HANOI

      {
        name: 'Telehouse (KDDI)',
        difficulty: 30,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 180,
        city: cityIds[1],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'NTT Communications',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[1],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'GDS Hanoi Thanglong',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[1],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Tulip Data Centre ',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[1],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'TELEHOUSE Hanoi',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[1],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },

      // STAVANGER
      // STAVANGER
      {
        name: 'Equinix',
        difficulty: 30,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 180,
        city: cityIds[2],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Next Generation Data',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[2],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Global Switch',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[2],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Kao Data Campus',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[2],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Kolos Data Centre',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[2],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },

      // PHOENIX
      // PHOENIX

      {
        name: 'Digital Realty Trust',
        difficulty: 30,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 180,
        city: cityIds[3],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'DuPont Fabros Technology',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[3],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Lakeside Technology Centre',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[3],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Switch SUPERNAP',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[3],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'The Citadel',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[3],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },

      // NOVOSIBIRSK
      // NOVOSIBIRSK

      {
        name: 'Selectel',
        difficulty: 30,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 180,
        city: cityIds[4],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Rostelecom',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[4],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Datahouse',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[4],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'Data Harbour',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[4],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      },
      {
        name: 'RTCOMM',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[4],
        requiredStash: [
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)],
          stashesIds[randomArrayNumber(stashesIds.length)]
        ]
      }
    ];
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
