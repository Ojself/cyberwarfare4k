const mongoose = require('mongoose');

const { allianceSeeds } = require('./allianceSeeds');
const { betaForumSeeds } = require('./betaForumSeeds');
const { citySeeds } = require('./citySeeds');
const { crimeSeeds } = require('./crimeSeeds');
const { currencySeeds } = require('./currencySeeds');
const { dataCenterSeeds } = require('./dataCenterSeeds');
const { funeralSeeds } = require('./funeralSeeds');
const { itemSeeds } = require('./itemSeeds');
const { messageSeeds } = require('./messageSeeds');
const { orgCrimeSeeds } = require('./orgCrimeSeeds');
const { stashSeeds } = require('./stashSeeds');
const { userSeeds } = require('./userSeeds');

const seedAll = async () => {
  await Promise.all([
    userSeeds(),
    allianceSeeds(),
    betaForumSeeds(),
    citySeeds(),
    crimeSeeds(),
    currencySeeds(),
    dataCenterSeeds(),
    funeralSeeds(),
    itemSeeds(),
    messageSeeds(),
    orgCrimeSeeds(),
    stashSeeds(),
  ]);
  mongoose.disconnect();
  process.exit(0);
};

seedAll();
