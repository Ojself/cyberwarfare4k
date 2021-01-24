const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all items and create all items for marketplace

// To execute this seed, run from the root of the project
// $ node bin/itemSeeds.js

const mongoose = require('mongoose');
const Item = require('../models/Item');

require('../configs/database');

const items = [
  /* CPU */
  {
    _id: '5fc13fcf7e196b5b2c875e48',
    name: 'Intel celeron G3930',
    type: 'CPU',
    price: 15000,
    bonus: 3,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e49',
    name: 'Intel i3-8350K',
    type: 'CPU',
    price: 50000,
    bonus: 10,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4a',
    name: 'AMD Ryzen Threaddripper 1950X',
    type: 'CPU',
    price: 120000,
    bonus: 20,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4b',
    name: 'Intel i9-7980 xe',
    type: 'CPU',
    price: 500000,
    bonus: 50,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4c',
    name: 'HP 4X Opteron QC DL785',
    type: 'CPU',
    price: 3000000,
    bonus: 100,
  },
  /* FIREWALL */
  {
    _id: '5fc13fcf7e196b5b2c875e4d',
    name: 'A lighter and a can of fuel',
    type: 'Firewall',
    price: 15000,
    bonus: 3,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4e',
    name: 'Linksys VPN router',
    type: 'Firewall',
    price: 50000,
    bonus: 10,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e4f',
    name: 'Zyxel ZYWALL110',
    type: 'Firewall',
    price: 150000,
    bonus: 20,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e50',
    name: 'Zyxel USG1100 UTM BDL',
    type: 'Firewall',
    price: 500000,
    bonus: 50,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e51',
    name: 'Fortinet Firewall Solution',
    type: 'Firewall',
    price: 1000000,
    bonus: 100,
  },

  /* ANTIVIRUS (AVS) */

  {
    _id: '5fc13fcf7e196b5b2c875e52',
    name: 'Windows defender',
    type: 'AntiVirus',
    price: 15000,
    bonus: 3,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e53',
    name: 'McAfee',
    type: 'AntiVirus',
    price: 50000,
    bonus: 10,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e54',
    name: 'Norton Antivirus',
    type: 'AntiVirus',
    price: 120000,
    bonus: 20,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e55',
    name: 'AVG',
    type: 'AntiVirus',
    price: 300000,
    bonus: 50,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e56',
    name: 'Avast Business Pro',
    type: 'AntiVirus',
    price: 1000000,
    bonus: 100,
  },

  /* ENCRYPTION */
  {
    _id: '5fc13fcf7e196b5b2c875e57',
    name: 'Enigma machine',
    type: 'Encryption',
    price: 15000,
    bonus: 3,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e58',
    name: 'Bcrypt npm node',
    type: 'Encryption',
    price: 50000,
    bonus: 10,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e59',
    name: 'IVeraCrypt',
    type: 'Encryption',
    price: 120000,
    bonus: 20,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e5a',
    name: 'CertainSafe',
    type: 'Encryption',
    price: 300000,
    bonus: 50,
  },

  {
    _id: '5fc13fcf7e196b5b2c875e5b',
    name: 'Vernam Cipher',
    type: 'Encryption',
    price: 1000000,
    bonus: 100,
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
