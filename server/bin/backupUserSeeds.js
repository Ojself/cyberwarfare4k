const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('../configs/database');

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/userSeeds.js
// todo, create something that takes care of all the relational database stuff
// or a note of how to run the seeds in which order.

const mongoose = require('mongoose');
const User = require('../models/User');
const City = require('../models/City');
const Alliance = require('../models/Alliance');

let cities;
let greyAlliance;

const getUserId = (users, role) => {
  const user = users.find((u) => u.allianceRole === role);
  return user._id;
};

const getCities = async () => {
  cities = await City.find();
  cityIds = cities.map((c) => c._id);
};

const getAlliances = async () => {
  greyAlliance = await Alliance.findOne({ name: 'Grey' });
};

User.deleteMany()
  .then(() => getCities())
  .then(() => getAlliances())
  .then(() => {
    const users = [
    ];

    return User.create(users);
  })
  .then(async (usersCreated) => {
    cities.forEach(async (city) => {
      city.residents = usersCreated
        .filter((user) => user.playerStats.city._id.toString() === city._id.toString())
        .map((user) => user._id);
      await city.save();
    });

    console.log(`${usersCreated.length} users created`);
    greyAlliance.boss = getUserId(usersCreated, 'boss');
    greyAlliance.cto = getUserId(usersCreated, 'cto');
    greyAlliance.analyst = getUserId(usersCreated, 'analyst');
    greyAlliance.firstLead = getUserId(usersCreated, 'firstLead');
    greyAlliance.secondLead = getUserId(usersCreated, 'secondLead');
    greyAlliance.firstMonkeys = usersCreated.filter((user) => user.allianceRole === 'firstMonkeys');
    greyAlliance.secondMonkeys = usersCreated.filter((user) => user.allianceRole === 'secondMonkeys');
    greyAlliance.active = true;
    await greyAlliance.save();
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
