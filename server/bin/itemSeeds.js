const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all items and create all items for marketplace

const Item = require('../models/Item');

require('../configs/database');

const config = {
  price: {
    lowest: 15000,
    low: 50000,
    medium: 120000,
    high: 500000,
    highest: 1000000,
  },
  bonus: {
    lowest: 3,
    low: 10,
    medium: 20,
    high: 50,
    highest: 100,
  },
};

const items = [
  /* CPU */
  {
    _id: '5fc13fcf7e196b5b2c875e48',
    name: 'Intel celeron G3930',
    type: 'CPU',
    price: config.price.lowest,
    bonus: config.bonus.lowest,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e49',
    name: 'Intel i3-8350K',
    type: 'CPU',
    price: config.price.low,
    bonus: config.bonus.low,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4a',
    name: 'AMD Ryzen Threaddripper 1950X',
    type: 'CPU',
    price: config.price.medium,
    bonus: config.bonus.medium,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4b',
    name: 'Intel i9-7980 xe',
    type: 'CPU',
    price: config.bonus.high,
    bonus: config.price.high,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4c',
    name: 'HP 4X Opteron QC DL785',
    type: 'CPU',
    price: config.price.highest,
    bonus: config.bonus.highest,
  },
  /* FIREWALL */
  {
    _id: '5fc13fcf7e196b5b2c875e4d',
    name: 'A lighter and a can of fuel',
    type: 'Firewall',
    price: config.price.lowest,
    bonus: config.bonus.lowest,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4e',
    name: 'Linksys VPN router',
    type: 'Firewall',
    price: config.price.low,
    bonus: config.bonus.low,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4f',
    name: 'Zyxel ZYWALL110',
    type: 'Firewall',
    price: config.price.medium,
    bonus: config.bonus.medium,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e50',
    name: 'Zyxel USG1100 UTM BDL',
    type: 'Firewall',
    price: config.bonus.high,
    bonus: config.price.high,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e51',
    name: 'Fortinet Firewall Solution',
    type: 'Firewall',
    price: config.price.highest,
    bonus: config.bonus.highest,
  },

  /* ANTIVIRUS (AVS) */

  {
    _id: '5fc13fcf7e196b5b2c875e52',
    name: 'Windows defender',
    type: 'AntiVirus',
    price: config.price.lowest,
    bonus: config.bonus.lowest,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e53',
    name: 'McAfee',
    type: 'AntiVirus',
    price: config.price.low,
    bonus: config.bonus.low,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e54',
    name: 'Norton Antivirus',
    type: 'AntiVirus',
    price: config.price.medium,
    bonus: config.bonus.medium,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e55',
    name: 'AVG',
    type: 'AntiVirus',
    price: config.bonus.high,
    bonus: config.price.high,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e56',
    name: 'Avast Business Pro',
    type: 'AntiVirus',
    price: config.price.highest,
    bonus: config.bonus.highest,
  },

  /* ENCRYPTION */
  {
    _id: '5fc13fcf7e196b5b2c875e57',
    name: 'Enigma machine',
    type: 'Encryption',
    price: config.price.lowest,
    bonus: config.bonus.lowest,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e58',
    name: 'Bcrypt npm node',
    type: 'Encryption',
    price: config.price.low,
    bonus: config.bonus.low,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e59',
    name: 'IVeraCrypt',
    type: 'Encryption',
    price: config.price.medium,
    bonus: config.bonus.medium,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e5a',
    name: 'CertainSafe',
    type: 'Encryption',
    price: config.bonus.high,
    bonus: config.price.high,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e5b',
    name: 'Vernam Cipher',
    type: 'Encryption',
    price: config.price.highest,
    bonus: config.bonus.highest,
  },
];
const itemSeeds = async () => {
  await Item.deleteMany();
  let itemsCreated;
  try {
    itemsCreated = await Item.create(items);
  } catch (err) {
    console.error('Item seeds error: ', err);
    throw err;
  }
  console.info(itemsCreated.length, 'items created');
};
// itemSeeds(true);
module.exports = { itemSeeds };
