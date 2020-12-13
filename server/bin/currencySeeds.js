const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const Currency = require('../models/Currency');

require('../configs/database');

// returns an array of fake history prices
const getHistoryPrice = (min, max) => Array.from({ length: 12 }, (_) => (Math.random() * (max - min) + min).toFixed(2));

// returns an array of the last 12 hours
const getHistoryTime = () => Array.from({ length: 12 }, ((_, i) => {
  const time = Date.now() - (1000 * 60 * 60 * (12 - i));
  return new Date(time).getHours();
}));

const currency = [
  {
    name: 'Litecoin',
    color: 'hsl(255, 70%, 75%)',
    initials: 'LTC',
    lowerPrice: 35,
    higherPrice: 55,
    price: 35,
    levelReq: 4,
    historyPrice: getHistoryPrice(35, 55),
    historyTime: getHistoryTime(),
    available: 50000,
    marketCap: 50000,
  },
  {
    name: 'Ethereum',
    color: 'hsl(197, 75%, 69%)',
    initials: 'ETH',
    lowerPrice: 120,
    higherPrice: 150,
    price: 120,
    levelReq: 3,
    historyPrice: getHistoryPrice(120, 150),
    historyTime: getHistoryTime(),
    available: 200000,
    marketCap: 200000,
  },
  {
    name: 'Ripple',
    color: 'hsl(350, 100%, 77%)',
    initials: 'XRP',
    lowerPrice: 0.3,
    higherPrice: 0.8,
    price: 0.3,
    levelReq: 5,
    historyPrice: getHistoryPrice(0.3, 0.8),
    historyTime: getHistoryTime(),
    available: 10000000,
    marketCap: 10000000,
  },
  {
    name: 'Monero',
    color: 'hsl(214, 98%, 75%)',
    initials: 'XMR',
    lowerPrice: 48,
    higherPrice: 71,
    price: 50,
    levelReq: 2,
    historyPrice: getHistoryPrice(50, 70),
    historyTime: getHistoryTime(),
    available: 100000,
    marketCap: 100000,
  },
  {
    name: 'Zcash',
    color: 'hsl(25, 94%, 72%)',
    initials: 'ZEC',
    lowerPrice: 9,
    higherPrice: 16,
    price: 10,
    levelReq: 1,
    historyPrice: getHistoryPrice(10, 15),
    historyTime: getHistoryTime(),
    available: 15000,
    marketCap: 15000,
  },
  {
    name: 'Dash',
    color: 'hsl(283, 99%, 96%)',
    initials: 'DASH',
    lowerPrice: 79,
    higherPrice: 95,
    levelReq: 1,
    historyPrice: getHistoryPrice(80, 95),
    historyTime: getHistoryTime(),
    price: 80,
    available: 200000,
    marketCap: 200000,
  },
  /*
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
  .then(() => Currency.create(currency))
  .then((currencyCreated) => {
    console.log(
      `${currencyCreated.length} currency created with the following id:`,
    );
    console.log(currencyCreated.map((u) => u._id));
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
