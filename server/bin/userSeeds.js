const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('../configs/database');

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/userSeeds.js
// todo, create something that takes care of all the relational database stuff
// or a note of how to run the seeds in which order.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const City = require('../models/City');
const Alliance = require('../models/Alliance');

const avatars = require('./avatars.json');

const bcryptSalt = 10;

let cities;
let cityIds;
let greyAlliance;

const generateQueryString = (game) => {
  const lexi = 'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
  let query = '';
  for (let i = 0; i < 6; i += 1) {
    query += lexi[Math.floor(Math.random() * lexi.length)];
  }
  if (game === 'chessathor') {
    query = `#${query}`;
  }
  return query;
};

const giveRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

const getUserId = (users, role) => {
  const user = users.find((u) => u.allianceRole === role);
  return user._id;
};

const getCities = async () => {
  cities = await City.find();
  cityIds = cities.map((c) => c._id);
};

const getAlliances = async () => {
  greyAlliance = await Alliance.findOne({ name: 'Grey' });
};

const randomCityId = () => cityIds[Math.floor(Math.random() * cityIds.length)];

User.deleteMany()
  .then(() => getCities())
  .then(() => getAlliances())
  .then(() => {
    const users = [
      {
        email: 'alice@email.com',
        _id: '5fae6d7ee60018434108369c',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        hackSkill: {
          CPU: 1,
          AntiVirus: 25,
        },
        account: {
          password: bcrypt.hashSync('alice', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 0,
          rankName: 'Script kiddie',
        },
        name: 'npc_alice',
        alliance: greyAlliance._id,
        allianceRole: 'firstMonkeys',
      },
      {
        email: 'bob@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 25,
        },
        _id: '5fca3b4a86e77b5c8e58b67a',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('bob', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 1,
          rankName: 'Family IT-Support',
        },
        name: 'npc_bob',
        alliance: greyAlliance._id,
        allianceRole: 'firstMonkeys',
      },
      {
        email: 'chuck@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 25,
        },
        _id: '5fca3b4a86e77b5c8e58b67b',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('chuck', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 2,
          rankName: 'Blog Writer',
        },
        name: 'npc_chuck',
        alliance: greyAlliance._id,
        allianceRole: 'firstMonkeys',
      },
      {
        email: 'craig@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 25,
        },
        _id: '5fca3b4a86e77b5c8e58b67c',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('craig', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 3,
          rankName: "HTML 'programmer'",
        },
        name: 'npc_craig',
        alliance: greyAlliance._id,
        allianceRole: 'secondMonkeys',
      },
      {
        email: 'eve@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 25,
        },
        _id: '5fca3b4a86e77b5c8e58b67d',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('eve', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 4,
          rankName: 'Jr. Web Dev',
        },
        name: 'npc_eve',
        alliance: greyAlliance._id,
        allianceRole: 'secondMonkeys',
      },
      {
        email: 'faythe@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 75,
        },
        _id: '5fca3b4a86e77b5c8e58b67e',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('faythe', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 5,
          rankName: 'Sr. Web Dev',
        },
        name: 'npc_fayth',
        alliance: greyAlliance._id,
        allianceRole: 'firstLead',
      },
      {
        email: 'mallory@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 75,
        },
        _id: '5fca3b4a86e77b5c8e58b680',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('mallory', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 6,
          rankName: 'System Dev',
        },
        name: 'npc_mallory',
        alliance: greyAlliance._id,
        allianceRole: 'secondLead',
      },
      {
        email: 'sybil@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 160,
        },
        _id: '5fca3b4a86e77b5c8e58b67f',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('sybil', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 7,
          rankName: 'Cyber Security Dev',
        },
        name: 'npc_sybil',
        alliance: greyAlliance._id,
        allianceRole: 'analyst',
      },
      {
        email: 'trudy@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 125,
        },
        _id: '5fca3b4a86e77b5c8e58b681',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('trudy', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          bounty: 800000,
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 8,
          rankName: 'Basement Dweller',
        },
        name: 'npc_trudy',
        alliance: greyAlliance._id,
        allianceRole: 'cto',
      },
      {
        email: 'gerald@email.com',
        hackSkill: {
          CPU: 1,
          AntiVirus: 200,
        },
        _id: '5fca3b4a86e77b5c8e58b682',
        fightInformation: {
          shutdowns: 0,
          attacksInitiated: Math.floor(Math.random() * 10),
          attacksVictim: Math.floor(Math.random() * 5),
          crimesInitiated: Math.floor(Math.random() * 10),
          vpnChanges: Math.floor(Math.random() * 5),
          currencyPurchases: Math.floor(Math.random() * 5),
        },
        account: {
          password: bcrypt.hashSync('gerald', bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          bounty: 1000000,
          maxFireWall: 200,
          currentFirewall: 200,
          city: randomCityId(),
          rank: 9,
          rankName: 'Anonymous',
        },
        name: 'npc_gerald',
        alliance: greyAlliance._id,
        allianceRole: 'boss',
      },
      {
        email: 'tormod@mail.com',
        name: 'Admin_Tor',
        _id: '5fca3b4a86e77b5c8e58b683',
        account: {
          password: '$2b$10$dXcx87D2LmkjravCI9UgROSW92oGCIx4qBb9qPiz.MCmlKo882uce',
          avatar: '/hackerAvatars/Waifu/greenblack.png',
          subscription: 'Bronze',
          ip: ['192.168.1.1', '192.168.1.2'],
          isSetup: true,
        },
        playerStats: {
          bounty: 0,
          maxFireWall: 100,
          currentFirewall: 100,
          city: randomCityId(),
          rank: 0,
          rankName: 'Script kiddie',
        },
      },
    ];

    return User.create(users);
  })
  .then(async (usersCreated) => {
    cities.forEach(async (city) => {
      city.residents = usersCreated
        .filter((user) => user.playerStats.city._id.toString() === city._id.toString())
        .map((user) => {
          user._id;
        });
      await city.save();
    });

    console.log(`${usersCreated.length} users created`);
    greyAlliance.boss = getUserId(usersCreated, 'boss');
    greyAlliance.cto = getUserId(usersCreated, 'cto');
    greyAlliance.analyst = getUserId(usersCreated, 'analyst');
    greyAlliance.firstLead = getUserId(usersCreated, 'firstLead');
    greyAlliance.secondLead = getUserId(usersCreated, 'secondLead');
    greyAlliance.firstMonkeys = usersCreated.filter((user) => user.allianceRole === 'firstMonkeys');
    greyAlliance.secondMonkeys = usersCreated.filter((user) => user.allianceRole === 'secondMonkeys');
    greyAlliance.active = true;
    await greyAlliance.save();
  })
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
