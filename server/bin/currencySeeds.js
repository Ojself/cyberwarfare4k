const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// $ node bin/currencySeeds.js

const mongoose = require('mongoose');
const Currency = require('../models/Currency');

require('../configs/database');
// crush currency for every transaction

let currency = [
  {
    name: 'Litecoin',
    color: 'hsl(255, 70%, 75%)',
    initials: 'LTC',
    lowerPrice: 35,
    higherPrice: 55,
    price: 35,
    levelReq: 4,
    available: 50000,
    marketCap: 50000
  },
  {
    name: 'Ethereum',
    color: 'hsl(197, 75%, 69%)',
    initials: 'ETH',
    lowerPrice: 120,
    higherPrice: 150,
    price: 120,
    levelReq: 3,
    available: 200000,
    marketCap: 200000
  },
  {
    name: 'Ripple',
    color: 'hsl(350, 100%, 77%)',
    initials: 'XRP',
    lowerPrice: 0.3,
    higherPrice: 0.7,
    price: 0.3,
    levelReq: 5,
    available: 10000000,
    marketCap: 10000000
  },
  {
    name: 'Monero',
    color: 'hsl(214, 98%, 75%)',
    initials: 'XMR',
    lowerPrice: 50,
    higherPrice: 70,
    price: 50,
    levelReq: 2,
    available: 100000,
    marketCap: 100000
  },
  {
    name: 'Zcash',
    color: 'hsl(25, 94%, 72%)',
    initials: 'ZEC',
    lowerPrice: 10,
    higherPrice: 15,
    price: 10,
    levelReq: 1,
    available: 10000,
    marketCap: 10000
  }
  /* {
    name: 'Dash',
    color: '',
    initials: 'DASH'
    lowerPrice: 3,
    higherPrice: 0,
    price: 3,
    available: 0,
    marketCap: 0
  },
  {
    name: 'Bitcoin Cash',
    color: '',
    initials: 'BCH',
    lowerPrice: 3,
    higherPrice: 0,
    price: 3,
    available: 0,
    marketCap: 0
  },
  {
    name: 'NEO',
    color: '',
    initials: 'NEO',
    lowerPrice: 3,
    higherPrice: 0,
    price: 3,
    available: 0,
    marketCap: 0
  },
  {
    name: 'Cardano',
    color: '',
    initials: 'ADA',
    lowerPrice: 3,
    higherPrice: 0,
    price: 3,
    available: 0,
    marketCap: 0
  },
  {
    name: 'EOS',
    color: '',
    initials: 'EOS',
    lowerPrice: 3,
    higherPrice: 0,
    price: 3,
    available: 0,
    marketCap: 0
  } */
];

Currency.deleteMany()
  .then(() => {
    return Currency.create(currency);
  })
  .then(currencyCreated => {
    console.log(
      `${currencyCreated.length} currency created with the following id:`
    );
    console.log(currencyCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

// generates a random number between two integers
