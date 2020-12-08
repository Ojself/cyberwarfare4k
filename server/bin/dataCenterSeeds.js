const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const DataCenter = require('../models/DataCenter');
const City = require('../models/City');
const Stash = require('../models/Stash');

require('../configs/database');

const cityIds = [];
const stashesIds = [];

const getCities = async () => {
  const cities = await City.find();
  cities.forEach((element) => {
    cityIds.push(element._id);
  });
};

const getStashes = async () => {
  const stashes = await Stash.find();
  stashes.forEach((element) => {
    stashesIds.push(element._id);
  });
};

const randomArrayNumber = (arrayLength) => Math.floor(Math.random() * arrayLength);

const getThreeRequiredStash = () => [
  stashesIds[randomArrayNumber(stashesIds.length)],
  stashesIds[randomArrayNumber(stashesIds.length)],
  stashesIds[randomArrayNumber(stashesIds.length)],
];

DataCenter.deleteMany()
  .then(() => getCities())
  .then(() => getStashes())
  .then(() => {
    const dataCenters = [
      // SHANGHAI
      // SHANGHAI

      {
        name: 'China Telecom',
        difficulty: 20,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 280,
        city: cityIds[0],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'China Unicom',
        difficulty: 25,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 390,
        city: cityIds[0],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'China Mobile Hohot',
        difficulty: 30,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 465,
        city: cityIds[0],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Harbin Data Centre',
        difficulty: 40,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 560,
        city: cityIds[0],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Range International Data Centre',
        difficulty: 50,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 700,
        city: cityIds[0],
        requiredStash: getThreeRequiredStash(),
      },
      // HANOI
      // HANOI

      {
        name: 'Telehouse (KDDI)',
        difficulty: 20,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 280,
        city: cityIds[1],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'NTT Communications',
        difficulty: 25,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 390,
        city: cityIds[1],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'GDS Hanoi Thanglong',
        difficulty: 30,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 465,
        city: cityIds[1],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Tulip Data Centre ',
        difficulty: 40,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 560,
        city: cityIds[1],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'TELEHOUSE Hanoi',
        difficulty: 50,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 700,
        city: cityIds[1],
        requiredStash: getThreeRequiredStash(),
      },

      // STAVANGER
      // STAVANGER
      {
        name: 'Equinix',
        difficulty: 20,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 280,
        city: cityIds[2],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Next Generation Data',
        difficulty: 25,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 390,
        city: cityIds[2],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Global Switch',
        difficulty: 30,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 465,
        city: cityIds[2],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Kao Data Campus',
        difficulty: 40,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 560,
        city: cityIds[2],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Kolos Data Centre',
        difficulty: 50,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 700,
        city: cityIds[2],
        requiredStash: getThreeRequiredStash(),
      },

      // PHOENIX
      // PHOENIX

      {
        name: 'Digital Realty Trust',
        difficulty: 20,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 280,
        city: cityIds[3],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'DuPont Fabros Technology',
        difficulty: 25,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 390,
        city: cityIds[3],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Lakeside Technology Centre',
        difficulty: 30,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 465,
        city: cityIds[3],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Switch SUPERNAP',
        difficulty: 40,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 560,
        city: cityIds[3],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'The Citadel',
        difficulty: 50,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 700,
        city: cityIds[3],
        requiredStash: getThreeRequiredStash(),
      },

      // NOVOSIBIRSK
      // NOVOSIBIRSK

      {
        name: 'Selectel',
        difficulty: 20,
        currentFirewall: 90,
        maxFirewall: 90,
        price: 1000000,
        minutlyrevenue: 280,
        city: cityIds[4],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Rostelecom',
        difficulty: 25,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 390,
        city: cityIds[4],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Datahouse',
        difficulty: 30,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 465,
        city: cityIds[4],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'Data Harbour',
        difficulty: 40,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 560,
        city: cityIds[4],
        requiredStash: getThreeRequiredStash(),
      },
      {
        name: 'RTCOMM',
        difficulty: 50,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 700,
        city: cityIds[4],
        requiredStash: getThreeRequiredStash(),
      },
    ];
    return DataCenter.create(dataCenters);
  })
  .then((dataCentersCreated) => {
    console.log(
      `${dataCentersCreated.length} datacenters created with the following id:`,
    );
    console.log(dataCentersCreated.map((u) => u._id));
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
