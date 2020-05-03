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
const randomBool = (x = 0.5) => Math.random() > x;
const getCommentLikes = () => {
  if (randomBool()) {
    return [];
  }
  const usersWhoLiked = [];
  const likeLimit = Math.floor(Math.random() * 8);
  for (let i = 0; i < likeLimit; i += 1) {
    usersWhoLiked.push(users[Math.floor(Math.random() * users.length)]._id);
  }
  return usersWhoLiked;
};
const getRandomDate = () => {
  const now = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7 * 4);
  return new Date(now);
};

const comments = [];

ForumComment.deleteMany()
  .then(() => getUsersAndThreads())
  .then(() => {
    for (let i = 0; i < 100; i += 1) {
      comments.push({
        userId: users[Math.floor(Math.random() * users.length)]._id,
        comment: generateRandomText(),
        forumThread: threads[Math.floor(Math.random() * threads.length)]._id,
        edited: randomBool(0.75),
        deleted: randomBool(0.95),
        likes: getCommentLikes(),
        createdAt: getRandomDate(),
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
