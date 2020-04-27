const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const ForumThread = require('../models/ForumThread');
const User = require('../models/User');

require('../configs/database');

let admin;

const getCreator = async () => {
  admin = await User.findOne({ name: 'AdminTor' });
};

const threads = [{
  creator: null,
  name: 'News and Announcements',
  description: 'News and Announcements from the developers will be posted here',
  allianceThread: false,
  locked: true,
},
{
  creator: null,
  name: 'General discussion',
  description: 'Anything CHW4K',
  allianceThread: false,
},
{
  creator: null,
  name: 'FAQ',
  description: 'Frequently Asked Question',
  allianceThread: false,
},
{
  creator: null,
  name: 'Beginners Corner',
  description: 'Come on in and introduce yourself',
  allianceThread: false,
},
{
  creator: null,
  name: 'Support',
  description: 'Have a question from your fellow hackers or developers? ',
  allianceThread: false,
},

];

ForumThread.deleteMany()
  .then(() => getCreator())
  .then(() => {
    threads.forEach((t) => {
      t.creator = admin._id;
    });
  })
  .then(() => ForumThread.create(threads))
  .then((threadsCreated) => {
    console.log(
      `${threadsCreated.length} threads created with the following id:`,
    );
    console.log(threadsCreated.map((u) => u._id));
  })
  .then(() => {
    console.log('disconnecting from mongoose');
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
