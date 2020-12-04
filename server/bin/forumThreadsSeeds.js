const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');

const { forumThreads } = require('./consts');

const ForumThread = require('../models/ForumThread');
const Forum = require('../models/Forum');
const Alliance = require('../models/Alliance');
/* const User = require('../models/User'); */

require('../configs/database');

let alliances;

const getAlliances = async () => {
  alliances = await Alliance.find({});
};

const setGlobalThreadsWithForumIds = (threadName) => {
  let id;

  Forum.findOne({ title: threadName }).then((result) => {
    id = result._id;
  }).then(() => {
    forumThreads.globalThreads[threadName].forEach((t) => {
      t.forum = id;
    });
  }).then(() => {
    ForumThread.create(forumThreads.globalThreads[threadName]).then((threadCreated) => {
      console.log(
        `${threadCreated.length} threads created with the following id:`,
      );
    });
  });
};

const createAllianceThreads = (allianceId, threads) => {
  Object.keys(threads).forEach((k) => {
    Forum.findOne({ $and: [{ title: k }, { alliance: mongoose.Types.ObjectId(allianceId) }] }).then((result) => {
      const forumId = result._id;
      forumThreads.allianceThreads[k].forEach((t) => {
        t.alliance = allianceId;
        t.forum = forumId;
      });
      ForumThread.create(forumThreads.allianceThreads[k]).then((threadsCreated) => {
        console.log(
          `${threadsCreated.length} threads created with the following id:`,
        );
        console.log(threadsCreated.map((u) => u._id));
      });
    });
  });
};

// console.log(Object.keys(forumThreads.globalThreads).map((t, i, a) => a));
ForumThread.deleteMany()
  .then(() => getAlliances())
  .then(() => Object.keys(forumThreads.globalThreads).forEach((el) => setGlobalThreadsWithForumIds(el)))
  .then(() => alliances.forEach((a) => createAllianceThreads(a._id, forumThreads.allianceThreads)))
  .then(() => console.log(forumThreads.globalThreads))
  .then(() => {
    setTimeout(() => {
      console.log('disconnecting');
      mongoose.disconnect();
    }, 3000);
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
