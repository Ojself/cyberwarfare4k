const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/allianceSeeds.js

const mongoose = require('mongoose');
const Alliance = require('../models/Alliance');

require('../configs/database');

const alliances = [
  {
    name: 'White',
    _id: '5fae6d7ee600184341083698',
  },
  {
    name: 'Black',
    _id: '5fae6d7ee600184341083699',
  },
  {
    name: 'Red',
    _id: '5fae6d7ee60018434108369a',
  },
  {
    name: 'Brown',
    _id: '5fae6d7ee60018434108369b',
  },
  {
    name: 'Grey',
    _id: '5fae6d7ee60018434108369c',
  },
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
