const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/allianceSeeds.js

const mongoose = require('mongoose');
const Alliance = require('../models/Alliance');
const User = require('../models/User');

require('../configs/database');

const alliances = [
  { name: 'White' },
  { name: 'Black' },
  { name: 'Red' },
  { name: 'Brown' },
  { name: 'Grey' },
];

Alliance.deleteMany()
  .then(() => Alliance.create(alliances))
  .then((alliancesCreated) => {
    console.log(
      `${alliancesCreated.length} alliances created with the following id:`,
    );
    console.log(alliancesCreated.map((u) => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
