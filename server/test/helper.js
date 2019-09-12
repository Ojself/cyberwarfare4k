const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../configs/database");
const mongoose = require("mongoose");
const User = require("../models/User");

// todo city in user model- should a default?

// Creates a dummy user
// With attributes parameters (object) with values you want to change
async function createDummyUser(attributes) {
  const account = {
    role: "testUser",
    password: "Open Sesame",
    ip: ["127.0.0.1"]
  };
  const namesArray = [
    "Markus",
    "Sindre",
    "Haakon",
    "Lars",
    "Thomas",
    "Jonas",
    "Stian",
    "Foyen",
    "Stine"
  ];

  const randomArrayNumber = Math.floor(Math.random() * namesArray.length);

  const name = namesArray[randomArrayNumber] + Math.floor(Math.random() * 1000);
  const email = `${name}@mail.com`;

  const dummyUser = { email, account, name };

  if (attributes) {
    if (attributes.hackSkill) {
      dummyUser.hackSkill = attributes.hackSkill;
    }
    if (attributes.crimeSkill) {
      dummyUser.crimeSkill = attributes.crimeSkill;
    }
    if (attributes.currencies) {
      dummyUser.currencies = attributes.currencies;
    }
    if (attributes.playerStats) {
      dummyUser.playerStats = attributes.playerStats;
    }
    if (attributes.marketPlaceItems) {
      dummyUser.marketPlaceItems = attributes.marketPlaceItems;
    }
    if (attributes.specialWeapons) {
      dummyUser.specialWeapons = attributes.specialWeapons;
    }
    if (attributes.fightInformation) {
      dummyUser.fightInformation = attributes.fightInformation;
    }
    if (attributes.allianceRole) {
      dummyUser.allianceRole = attributes.allianceRole;
    }
    if (attributes.stash) {
      dummyUser.stash = attributes.stash;
    }
    if (attributes.alliance) {
      dummyUser.alliance = attributes.alliance;
    }
    if (attributes.role) {
      dummyUser.account.role = attributes.role;
    }
  }

  return User.create(dummyUser);
  cleanUp();
}

function cleanUp() {
  User.deleteMany({
    $or: [{ "account.role": "testUser" }, { "account.role": "testUserDB" }]
  })
    .then(() => {
      mongoose.disconnect();
    })
    .catch(err => {
      mongoose.disconnect();
      throw err;
    });
}

module.exports = { createDummyUser, cleanUp };
