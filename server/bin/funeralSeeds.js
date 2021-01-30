const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Funeral = require('../models/Funeral');

require('../configs/database');

const deadMembers = [{
  name: 'npc_walter',
  avatar: '/hackerAvatars/anon/anon-red.jpg',
  alliance: '5fae6d7ee60018434108369c',
  bounty: 50000,
  comments: [{
    creator: '5fca3b4a86e77b5c8e58b67f',
    comment: 'rip',
    flower: '2',
  },
  {
    creator: '5fca3b4a86e77b5c8e58b680',
    comment: 'rip in piece',
    flower: '1',
  }],
}];
const funeralSeeds = async () => {
  await Funeral.deleteMany;
  let funeralsCreated;
  try {
    funeralsCreated = await Funeral.create(deadMembers);
  } catch (err) {
    console.error('User seeds error: ', err);
    throw err;
  }
  console.info(funeralsCreated.length, 'users created');
};

module.exports = { funeralSeeds };
