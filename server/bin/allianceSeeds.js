const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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
    active: true,
    _id: '5fae6d7ee60018434108369c',
    boss: '5fca3b4a86e77b5c8e58b682',
    analyst: '5fca3b4a86e77b5c8e58b67f',
    cto: '5fca3b4a86e77b5c8e58b681',
    firstLead: '5fca3b4a86e77b5c8e58b67e',
    secondLead: '5fca3b4a86e77b5c8e58b680',
    firstMonkeys: ['5fae6d7ee60018434108369c', '5fca3b4a86e77b5c8e58b67a', '5fca3b4a86e77b5c8e58b67b'],
    secondMonkeys: ['5fca3b4a86e77b5c8e58b67c', '5fca3b4a86e77b5c8e58b67d'],
  },
];

Alliance.deleteMany()
  .then(() => Alliance.create(alliances))
  .then((alliancesCreated) => {
    console.info(`${alliancesCreated.length} alliances created`);
  })
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error('Error: ', err);
    process.exit(1);
  });
