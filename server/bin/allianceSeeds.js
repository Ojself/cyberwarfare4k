const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/allianceSeeds.js

const mongoose = require('mongoose');
const Alliance = require('../models/Alliance');

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
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
