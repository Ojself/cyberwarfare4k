const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User');

require('../configs/database');

const userIds = [];
const messages = [];

async function getUserIds() {
  const users = await User.find();
  users.forEach((u) => {
    userIds.push(u._id);
  });
}

const getRandomUserId = () => userIds[Math.floor(Math.random() * userIds.length)];
const generateRandomDate = () => {
  const randomDateMs = Date.now() - (Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7));
  return new Date(randomDateMs).toString().slice(0, 21);
};
const generateRandomText = () => {
  const texts = ['On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. ', ' At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.', 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '];
  return texts[Math.floor(Math.random() * texts.length)];
};

Message.deleteMany()
  .then(() => getUserIds())
  .then(() => {
    for (let i = 0; i < 10; i += 1) {
      messages.push({
        from: getRandomUserId(),
        to: getRandomUserId(),
        dateSent: generateRandomDate(),
        read: Math.random() > 0.2,
        text: generateRandomText(),
      });
    }
  })
  .then(() => Message.create(messages))
  .then((messagesCreated) => {
    console.log(`${messagesCreated.length} messages created with the following id:`);
    console.log(messagesCreated.map((u) => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
