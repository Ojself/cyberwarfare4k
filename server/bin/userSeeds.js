const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const bcryptSalt = 10;

require('../configs/database');

let users = [
  {
    email: 'alice@email.com',
    account: {
      password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 0,
      rankName: 'Script kiddie'
    },
    name: 'npc_alice_level1',
    alliance: 'White'
  },
  {
    email: 'bob@email.com',
    account: {
      password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 1,
      rankName: 'Family IT-Support'
    },
    name: 'npc_bob_level2',
    alliance: 'White'
  },
  {
    email: 'charlie@email.com',
    account: {
      password: bcrypt.hashSync('charlie', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 2,
      rankName: 'Blog Writer'
    },
    name: 'npc_charlie_level3',
    alliance: 'White'
  },
  {
    email: 'david@email.com',
    account: {
      password: bcrypt.hashSync('david', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 3,
      rankName: "HTML 'programmer'"
    },
    name: 'npc_david_level4',
    alliance: 'White'
  },
  {
    email: 'edward@email.com',
    account: {
      password: bcrypt.hashSync('edward', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 4,
      rankName: 'Jr. Web Dev'
    },
    name: 'npc_edward_level5',
    alliance: 'White'
  },
  {
    email: 'frederic@email.com',
    account: {
      password: bcrypt.hashSync('frederic', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 5,
      rankName: 'Sr. Web Dev'
    },
    name: 'npc_frederic_level6',
    alliance: 'White'
  },
  {
    email: 'gary@email.com',
    account: {
      password: bcrypt.hashSync('gary', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 6,
      rankName: 'System Dev'
    },
    name: 'npc_gary_level7',
    alliance: 'White'
  },
  {
    email: 'ian@email.com',
    account: {
      password: bcrypt.hashSync('ian', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 7,
      rankName: 'Cyber Security Dev'
    },
    name: 'npc_ian_level8',
    alliance: 'White'
  },
  {
    email: 'jacob@email.com',
    account: {
      password: bcrypt.hashSync('jacob', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 8,
      rankName: 'Basement Dweller'
    },
    name: 'npc_jacob_level9',
    alliance: 'White'
  },
  {
    email: 'gerald@email.com',
    account: {
      password: bcrypt.hashSync('gerald', bcrypt.genSaltSync(bcryptSalt)),
      subscription: 'Bronze',
      ip: ['192.168.1.1', '192.168.1.2'],
      isSetup: true,
      role: 'npc'
    },
    playerStats: {
      rank: 9,
      rankName: 'Anonymous'
    },
    name: 'npc_gerald_level10',
    alliance: 'White'
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
