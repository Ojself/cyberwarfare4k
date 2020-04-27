const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const ForumThread = require('../models/ForumThread');
const ForumComment = require('../models/ForumComment');
const User = require('../models/User');

require('../configs/database');

let users;
let threads;

const getUsersAndThreads = async () => {
  users = await User.find({});
  threads = await ForumThread.find({});
};

const generateRandomText = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const randomBool = () => Math.random() > 0.75;

const comments = [];

ForumComment.deleteMany()
  .then(() => getUsersAndThreads())
  .then(() => {
    for (let i = 0; i < 30; i += 1) {
      comments.push({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        comment: generateRandomText(),
        forumThread: threads[Math.floor(Math.random() * threads.length)]._id,
        edited: randomBool(),
      });
    }
  })
  .then(() => ForumComment.create(comments))
  .then((commentsCreated) => {
    console.log(
      `${commentsCreated.length} comments created with the following id:`,
    );
    console.log(commentsCreated.map((u) => u._id));
  })
  .then(() => {
    console.log('disconnecting from mongoose');
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
