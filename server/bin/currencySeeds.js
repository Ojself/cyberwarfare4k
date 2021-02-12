const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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
    lowerPrice: 37,
    higherPrice: 64,
    price: 35,
    levelReq: 5,
    historyPrice: getHistoryPrice(35, 66),
    historyTime: getHistoryTime(),
    available: 50000,
    marketCap: 50000,
  },
  {
    name: 'Ethereum',
    color: 'hsl(197, 75%, 69%)',
    initials: 'ETH',
    lowerPrice: 122,
    higherPrice: 148,
    price: 120,
    levelReq: 4,
    historyPrice: getHistoryPrice(120, 150),
    historyTime: getHistoryTime(),
    available: 200000,
    marketCap: 200000,
  },
  {
    name: 'Doge',
    color: 'hsl(350, 100%, 77%)',
    initials: 'DOGE',
    lowerPrice: 0.3,
    higherPrice: 0.8,
    price: 0.3,
    levelReq: 6,
    historyPrice: getHistoryPrice(0.3, 0.8),
    historyTime: getHistoryTime(),
    available: 10000000,
    marketCap: 10000000,
  },
  {
    name: 'Monero',
    color: 'hsl(214, 98%, 75%)',
    initials: 'XMR',
    lowerPrice: 49,
    higherPrice: 69,
    price: 50,
    levelReq: 3,
    historyPrice: getHistoryPrice(50, 70),
    historyTime: getHistoryTime(),
    available: 100000,
    marketCap: 100000,
  },
  {
    name: 'Zcash',
    color: 'hsl(25, 94%, 72%)',
    initials: 'ZEC',
    lowerPrice: 11,
    higherPrice: 16,
    price: 10,
    levelReq: 2,
    historyPrice: getHistoryPrice(10, 15),
    historyTime: getHistoryTime(),
    available: 350000,
    marketCap: 350000,
  },
  {
    name: 'Dash',
    color: 'hsl(283, 99%, 96%)',
    initials: 'DASH',
    lowerPrice: 81,
    higherPrice: 93,
    levelReq: 1,
    historyPrice: getHistoryPrice(80, 95),
    historyTime: getHistoryTime(),
    price: 80,
    available: 400000,
    marketCap: 400000,
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
const currencySeeds = async () => {
  await Currency.deleteMany();
  let currencyCreated;
  try {
    currencyCreated = await Currency.create(currency);
  } catch (err) {
    console.error('Currency seeds error: ', err);
    throw err;
  }
  console.info(currencyCreated.length, 'currency created');
};
// currencySeeds(true);
module.exports = { currencySeeds };
