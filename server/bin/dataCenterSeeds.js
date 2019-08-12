const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const DataCenter = require('../models/DataCenter');
const City = require('../models/City');

require('../configs/database');

const cityIds = [];

async function getCities() {
  let cities = await City.find();
  cities.forEach(element => {
    cityIds.push(element._id);
  });
}

/* CHANGE CHANGE CHANGE */

DataCenter.deleteMany()
  .then(() => {
    return getCities();
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
        city: cityIds[0]
      },
      {
        name: 'China Unicom',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[0]
      },
      {
        name: 'China Mobile Hohot',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[0]
      },
      {
        name: 'Harbin Data Centre',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[0]
      },
      {
        name: 'Range International Data Centre',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[0]
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
        city: cityIds[1]
      },
      {
        name: 'NTT Communications',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[1]
      },
      {
        name: 'GDS Hanoi Thanglong',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[1]
      },
      {
        name: 'Tulip Data Centre ',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[1]
      },
      {
        name: 'TELEHOUSE Hanoi',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[1]
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
        city: cityIds[2]
      },
      {
        name: 'Next Generation Data',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[2]
      },
      {
        name: 'Global Switch',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[2]
      },
      {
        name: 'Kao Data Campus',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[2]
      },
      {
        name: 'Kolos Data Centre',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[2]
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
        city: cityIds[3]
      },
      {
        name: 'DuPont Fabros Technology',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[3]
      },
      {
        name: 'Lakeside Technology Centre',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[3]
      },
      {
        name: 'Switch SUPERNAP',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[3]
      },
      {
        name: 'The Citadel',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[3]
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
        city: cityIds[4]
      },
      {
        name: 'Rostelecom',
        difficulty: 50,
        currentFirewall: 150,
        maxFirewall: 150,
        price: 1500000,
        minutlyrevenue: 200,
        city: cityIds[4]
      },
      {
        name: 'Datahouse',
        difficulty: 70,
        currentFirewall: 210,
        maxFirewall: 210,
        price: 2000000,
        minutlyrevenue: 220,
        city: cityIds[4]
      },
      {
        name: 'Data Harbour',
        difficulty: 90,
        currentFirewall: 270,
        maxFirewall: 270,
        price: 3000000,
        minutlyrevenue: 260,
        city: cityIds[4]
      },
      {
        name: 'RTCOMM',
        difficulty: 150,
        currentFirewall: 450,
        maxFirewall: 450,
        price: 5000000,
        minutlyrevenue: 500,
        city: cityIds[4]
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
