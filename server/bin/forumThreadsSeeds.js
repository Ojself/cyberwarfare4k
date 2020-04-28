const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const ForumThread = require('../models/ForumThread');
const Forum = require('../models/Forum');
const User = require('../models/User');

require('../configs/database');

let admin;
let forums;

const getAdminandForums = async () => {
  admin = await User.findOne({ name: 'AdminTor' });
  forums = await Forum.find({});
};


// todo. render something on frontend when no threads / forums / comments
const GlobalThreads = [
  {
    creator: null,
    title: 'Which pc games to try in 2020? ',
    forum: null, // misc
  },
  {
    creator: null,
    title: 'Pokémon ultimate pokedex',
    forum: null, // misc
  },
  {
    creator: null,
    title: 'Organized shutdown discussion',
    forum: null, // Game-play discussions
  },
  {
    creator: null,
    title: 'Why bodyguards are too op',
    forum: null, // Game-play discussions
  },
  {
    creator: null,
    title: 'How to come to level 3 on your first 100% battery',
    forum: null, // Strategy and player guide
  },
  {
    creator: null,
    title: 'New meta: petty hacking',
    forum: null, // Strategy and player guide
  },
  {
    creator: null,
    title: 'Cryptocurrency market is broken?',
    forum: null, // Community suggestions
  },
  {
    creator: null,
    title: 'Add Devotion into this game, plz!',
    forum: null, // Community suggestions
  },
  {
    creator: null,
    title: 'Hey everyone, I\'m Tor',
    forum: null, // Introduction
  },
  {
    creator: null,
    title: 'First time playing this game, nice to meet you all!',
    forum: null, // Introduction
  },
  {
    creator: null,
    title: 'New feature: Minigame to reload your battery!',
    forum: null, // Announcements
  },
  {
    creator: null,
    title: 'NEWS: Game launch delayed, yet again',
    forum: null, // Announcements
  },
  {
    creator: null,
    title: 'Before you ask, read this first',
    forum: null, // Help desk
    sticky: true,
  },
  {
    creator: null,
    title: 'HELP: How do I create an alliance?',
    forum: null, // Help desk
  }, {
    creator: null,
    title: 'Share your waifu',
    forum: null, // b
  },
  {
    creator: null,
    title: '10 reasons why to try Tide pods today',
    forum: null, // b
  }];

const allianceThreads = [{
  creator: null,
  title: '',
  forum: null,
  allianceThread: true,
  alliance: null,
}, {
  creator: null,
  title: '',
  forum: null,
  allianceThread: true,
  alliance: null,
}];

ForumThread.deleteMany()
  .then(() => getAdminandForums())
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
