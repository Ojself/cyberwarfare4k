const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const Funeral = require('../models/Funeral');

require('../configs/database');

const comments = [{
  name: 'npc_walter',
  avatar: '/hackerAvatars/anon/anon-red.jpg',
  alliance: '5fae6d7ee60018434108369c',
  comments: [{
    creator: '5fca3b4a86e77b5c8e58b67f',
    comment: 'rip',
    flower: '',
  },
  {
    creator: '5fca3b4a86e77b5c8e58b680',
    comment: 'rip in piece',
    flower: '',
  }],
}];

Funeral.deleteMany
  .then(() => Funeral.create(deadMembers))
  .then((commentsCreated) => console.log(`${commentsCreated.length} funerals created`))
  .catch((err) => console.error('Funeral seeds error: ', err));
