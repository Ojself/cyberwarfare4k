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
    name: 'Intel celeron G3930',
    type: 'CPU',
    price: 15000,
    bonus: 3,
  },

  {
    name: 'Intel i3-8350K',
    type: 'CPU',
    price: 50000,
    bonus: 10,
  },

  {
    name: 'AMD Ryzen Threaddripper 1950X',
    type: 'CPU',
    price: 120000,
    bonus: 20,
  },

  {
    name: 'Intel i9-7980 xe',
    type: 'CPU',
    price: 300000,
    bonus: 50,
  },

  {
    name: 'Intel Xeon Platinum 8180',
    type: 'CPU',
    price: 1000000,
    bonus: 100,
  },
  /* FIREWALL */
  {
    name: 'A lighter and a can of fuel',
    type: 'Firewall',
    price: 15000,
    bonus: 10,
  },

  {
    name: 'Linksys VPN router',
    type: 'Firewall',
    price: 50000,
    bonus: 20,
  },

  {
    name: 'Zyxel ZYWALL110',
    type: 'Firewall',
    price: 150000,
    bonus: 30,
  },

  {
    name: 'Zyxel USG1100 UTM BDL',
    type: 'Firewall',
    price: 3000000,
    bonus: 40,
  },

  {
    name: 'Fortinet Firewall Solution',
    type: 'Firewall',
    price: 10000000,
    bonus: 50,
  },

  /* ANTIVIRUS (AVS) */

  {
    name: 'Windows defender',
    type: 'AntiVirus',
    price: 15000,
    bonus: 3,
  },

  {
    name: 'McAfee',
    type: 'AntiVirus',
    price: 50000,
    bonus: 10,
  },

  {
    name: 'Norton Antivirus',
    type: 'AntiVirus',
    price: 120000,
    bonus: 20,
  },

  {
    name: 'AVG',
    type: 'AntiVirus',
    price: 300000,
    bonus: 50,
  },

  {
    name: 'Avast Business Pro',
    type: 'AntiVirus',
    price: 1000000,
    bonus: 100,
  },

  /* ENCRYPTION */
  {
    name: 'Enigma machine',
    type: 'Encryption',
    price: 15000,
    bonus: 3,
  },

  {
    name: 'Bcrypt npm node',
    type: 'Encryption',
    price: 50000,
    bonus: 10,
  },

  {
    name: 'IVeraCrypt',
    type: 'Encryption',
    price: 120000,
    bonus: 20,
  },

  {
    name: 'CertainSafe',
    type: 'Encryption',
    price: 300000,
    bonus: 50,
  },

  {
    name: 'Vernam Cipher',
    type: 'Encryption',
    price: 1000000,
    bonus: 100,
  },
];

Item.deleteMany()
  .then(() => Item.create(items))
  .then((itemsCreated) => {
    console.log(`${itemsCreated.length} items created with the following id:`);
    console.log(itemsCreated.map((u) => u._id));
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
