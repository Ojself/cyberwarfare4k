const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all items and create all items for marketplace

// To execute this seed, run from the root of the project
// $ node bin/itemSeeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Item = require('../models/Item');

require('../configs/database');

let items = [
  /* CPU */
  {
    name: 'Intel celeron G3930',
    type: 'cpu',
    price: 15000,
    bonus: 3
  },

  {
    name: 'Intel i3-8350K',
    type: 'cpu',
    price: 50000,
    bonus: 10
  },

  {
    name: 'AMD Ryzen Threaddripper 1950X',
    type: 'cpu',
    price: 120000,
    bonus: 20
  },

  {
    name: 'Intel i9-7980 xe',
    type: 'cpu',
    price: 300000,
    bonus: 50
  },

  {
    name: 'Intel Xeon Platinum 8180',
    type: 'cpu',
    price: 1000000,
    bonus: 100
  },
  /* FIREWALL */
  {
    name: 'A lighter and a can of fuel',
    type: 'firewall',
    price: 15000,
    bonus: 3
  },

  {
    name: 'Linksys VPN router',
    type: 'firewall',
    price: 50000,
    bonus: 10
  },

  {
    name: 'Zyxel ZYWALL110',
    type: 'firewall',
    price: 120000,
    bonus: 20
  },

  {
    name: 'Zyxel USG1100 UTM BDL',
    type: 'firewall',
    price: 300000,
    bonus: 50
  },

  {
    name: 'Cisco PIX 500',
    type: 'firewall',
    price: 1000000,
    bonus: 100
  },

  /* ANTIVIRUS (AVS) */

  {
    name: 'Windows defender',
    type: 'avs',
    price: 15000,
    bonus: 3
  },

  {
    name: 'McAfee',
    type: 'avs',
    price: 50000,
    bonus: 10
  },

  {
    name: 'Norton Antivirus',
    type: 'avs',
    price: 120000,
    bonus: 20
  },

  {
    name: 'AVG',
    type: 'avs',
    price: 300000,
    bonus: 50
  },

  {
    name: 'Avast Business Pro',
    type: 'avs',
    price: 1000000,
    bonus: 100
  },

  /* ENCRYPTION */
  {
    name: 'Enigma machine',
    type: 'encryption',
    price: 15000,
    bonus: 3
  },

  {
    name: 'Bcrypt npm node',
    type: 'encryption',
    price: 50000,
    bonus: 10
  },

  {
    name: 'IVeraCrypt',
    type: 'encryption',
    price: 120000,
    bonus: 20
  },

  {
    name: 'CertainSafe',
    type: 'encryption',
    price: 300000,
    bonus: 50
  },

  {
    name: 'Vernam Cipher',
    type: 'encryption',
    price: 1000000,
    bonus: 100
  }
];

Item.deleteMany()
  .then(() => {
    return Item.create(items);
  })
  .then(itemsCreated => {
    console.log(`${itemsCreated.length} items created with the following id:`);
    console.log(itemsCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
