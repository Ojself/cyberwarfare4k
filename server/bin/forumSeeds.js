const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');

const Alliance = require('../models/Alliance');
const User = require('../models/User');
const Forum = require('../models/Forum');

require('../configs/database');

let admin;
let alliances;

const fetchUsersAndAlliances = async () => {
  admin = await User.findOne({ name: 'AdminTor' });
  alliances = await Alliance.find({});
};

const forums = [{
  creator: null,
  title: 'Help desk',
  description: 'Help and support for questions encountered in CHW4K',
  category: 'administration',
},
{
  creator: null,
  title: 'Report Bugs',
  description: 'Post suspected bugs here',
  category: 'administration',
},
{
  creator: null,
  title: 'Announcements',
  description: 'News and announcements will be posted here!',
  category: 'administration',
  locked: true,
},
{
  creator: null,
  title: 'Introduction',
  description: 'New to CHW4K? Well come right here, we don\'t bite',
  category: 'administration',
},
{
  creator: null,
  title: 'Community suggestions',
  description: 'Help and support for questions encountered in CHW4K',
  category: 'general',
},
{
  creator: null,
  title: 'Strategy and player guide',
  description: 'Have a few tips? Want to help out some new players? Share your strategy with everyone!',
  category: 'general',
},
{
  creator: null,
  title: 'Game-play discussions',
  description: 'Declare war. Declare peace. It is up to you- the revolution has started',
  category: 'general',
},
{
  creator: null,
  title: 'Misc',
  description: 'Feel free to talk about anything and everything',
  category: 'offtopic',
},
{
  creator: null,
  title: '/b/',
  description: 'Random',
  category: 'offtopic',
}];

const allianceForums = [{
  creator: null,
  title: 'Leader',
  description: 'Only visible for leaders of this alliance',
  category: 'allianceChair',
  allianceForum: true,
  alliance: null,
},
{
  creator: null,
  title: 'War room',
  description: 'For war and fights with other alliances and players',
  category: 'general',
  allianceForum: true,
  alliance: null,
},
{
  creator: null,
  title: 'Alliance news and announcements',
  description: 'For war and fights with other alliances and players',
  category: 'administration',
  allianceForum: true,
  alliance: null,
},
{
  creator: null,
  title: 'Rules and guidelines',
  description: 'Alliance rules and guidelines can be found here',
  category: 'administration',
  allianceForum: true,
  alliance: null,
},
{
  creator: null,
  title: 'Social club',
  description: 'Talk about anything and everything',
  category: 'offtopic',
  allianceForum: true,
  alliance: null,
}];

const allForums = [];

Forum.deleteMany()
  .then(() => fetchUsersAndAlliances())
  .then(() => {
    let tempForums = [];
    alliances.forEach((a) => {
      allianceForums.forEach((f) => {
        f.creator = admin._id;
        f.alliance = a._id;
        tempForums.push(f);
      });
      Forum.create(tempForums).then((allianceForumsCreated) => {
        console.log(
          `${allianceForumsCreated.length} alliance forums created with the following id:`,
        );
        console.log(allianceForumsCreated.map((u) => u._id));
      });
      tempForums = [];
    });
  })
  .then(() => {
    forums.forEach((f) => {
      f.creator = '5ea717d8b3e02b1e635f897c';
      allForums.push(f);
    });
  })
  .then(() => Forum.create(allForums))
  .then((forumsCreated) => {
    console.log(
      `${forumsCreated.length} forums created with the following id:`,
    );
    console.log(forumsCreated.map((u) => u._id));
  })
  .then(() => {
    console.log('disconnecting from mongoose');
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });
