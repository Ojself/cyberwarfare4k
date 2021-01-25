const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const BetaForum = require('../models/BetaForum');

require('../configs/database');

const users = [
  '5fae6d7ee60018434108369c',
  '5fca3b4a86e77b5c8e58b67a',
  '5fca3b4a86e77b5c8e58b67b',
  '5fca3b4a86e77b5c8e58b67c',
  '5fca3b4a86e77b5c8e58b67d',
  '5fca3b4a86e77b5c8e58b67e',
  '5fca3b4a86e77b5c8e58b680',
  '5fca3b4a86e77b5c8e58b67f',
  '5fca3b4a86e77b5c8e58b681',
  '5fca3b4a86e77b5c8e58b682',
  '5fca3b4a86e77b5c8e58b683',
];

const generateRandomText = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
const randomBool = (x = 0.5) => Math.random() > x;
const getCommentLikes = () => {
  if (randomBool()) {
    return [];
  }
  const usersWhoLiked = new Set();
  const likeLimit = Math.floor(Math.random() * 8);
  for (let i = 0; i < likeLimit; i += 1) {
    usersWhoLiked.add(users[Math.floor(Math.random() * users.length)]);
  }
  return Array.from(usersWhoLiked);
};
const getRandomDate = () => {
  const now = Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7 * 4);
  return new Date(now);
};
const comments = Array.from({ length: 30 }, (_, i) => ({
  creator: users[Math.floor(Math.random() * users.length)],
  comment: generateRandomText(),
  allianceForum: i % 2 === 0,
  alliance: i % 2 === 0 ? '5fae6d7ee60018434108369c' : null,
  edited: randomBool(0.75),
  deleted: randomBool(0.95),
  likes: getCommentLikes(),
  updatedAt: getRandomDate(),
}));

const betaForumSeeds = async () => {
  await BetaForum.deleteMany();
  let betaForumsCreated;
  try {
    betaForumsCreated = await BetaForum.create(comments);
  } catch (err) {
    console.error('Betaforum seeds error: ', err);
    throw err;
  }
  console.info(betaForumsCreated.length, ' betaforums created');
};

module.exports = { betaForumSeeds };
