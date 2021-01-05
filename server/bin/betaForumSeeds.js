const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const BetaForum = require('../models/BetaForum');
const User = require('../models/User');

require('../configs/database');

let users;

const getUsers = async () => {
  users = await User.find({});
};

const generateRandomText = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const randomBool = (x = 0.5) => Math.random() > x;
const getCommentLikes = () => {
  if (randomBool()) {
    return [];
  }
  const usersWhoLiked = new Set();
  const likeLimit = Math.floor(Math.random() * 8);
  for (let i = 0; i < likeLimit; i += 1) {
    usersWhoLiked.add(users[Math.floor(Math.random() * users.length)]._id);
  }
  return Array.from(usersWhoLiked);
};
const getRandomDate = () => {
  const now = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7 * 4);
  return new Date(now);
};

const comments = [];

BetaForum.deleteMany()
  .then(() => getUsers())
  .then(() => {
    for (let i = 0; i < 30; i += 1) {
      comments.push({
        creator: users[Math.floor(Math.random() * users.length)]._id,
        comment: generateRandomText(),
        allianceForum: i % 2 === 0,
        alliance: i % 2 === 0 ? '5fae6d7ee600184341083698' : null,
        edited: randomBool(0.75),
        deleted: randomBool(0.95),
        likes: getCommentLikes(),
        updatedAt: getRandomDate(),
      });
    }
  })
  .then(() => BetaForum.create(comments))
  .then((commentsCreated) => {
    console.log(
      `${commentsCreated.length} beta comments created`,
    );
  })
  .then(() => {
    console.log('disconnecting from mongoose');
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
