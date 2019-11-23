const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all ranks and create all ranks for marketplace

// To execute this seed, run from the root of the project
// $ node bin/rankSeeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Rank = require('../models/Rank');

require('../configs/database');

const ranks = [
  {
    name: 'Script Kiddie',
    rank: 0,
    expToNewRank: 10000,
  },

  {
    name: 'Family IT-Support',
    rank: 1,
    expToNewRank: 25000,
  },

  {
    name: 'Blog Writer',
    rank: 2,
    expToNewRank: 62500,
  },

  {
    name: "HTML 'programmer'",
    rank: 3,
    expToNewRank: 156000,
  },

  {
    name: 'Jr. Web Dev',
    rank: 4,
    expToNewRank: 390000,
  },

  {
    name: 'Sr. Web Dev',
    rank: 5,
    expToNewRank: 975000,
  },

  {
    name: 'System Dev',
    rank: 6,
    expToNewRank: 2437500,
  },

  {
    name: 'Cyber Security Dev',
    rank: 7,
    expToNewRank: 6093314,
  },

  {
    name: 'Basement Dweller',
    rank: 8,
    expToNewRank: 15231337,
  },

  {
    name: 'Anonymous',
    rank: 9,
    expToNewRank: 9999999999999,
  },
  {
    name: 'Cheater',
    rank: 10,
    expToNewRank: Infinity,
  },
];

Rank.deleteMany()
  .then(() => Rank.create(ranks))
  .then((ranksCreated) => {
    console.log(`${ranksCreated.length} ranks created with the following id:`);
    console.log(ranksCreated.map((u) => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
