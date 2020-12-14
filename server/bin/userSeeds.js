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

function randomCityId() {
  return cityIds[Math.floor(Math.random() * cityIds.length)];
}

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
      {
        _id: '5fca4130132f1d662859417a',
        account: {
          password: '$2b$10$vCF5AS1mekpW8T267fmy1eyVS4BrazDceEy2jIwkNdj/rAn7KruTC',
        },
        earnBattery: {
          githubUserName: 'haakona',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'haarholt@mail.com',
      },
      {
        _id: '5fc269476b7c7d570fff19e6',
        account: {
          password: '$2b$10$MO8Osp8yqr6282ftXTva/ObfQHCNIiKP3nZZlVyKk9wjZqg5SHjwm',
        },
        earnBattery: {
          githubUserName: 'l1nnkri',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'testuser2@mail.com',
      },
      {
        _id: '5fca4121132f1d6628594179',
        account: {
          password: '$2b$10$kPsnSYOXwn.ITw5nPtcFQergSsEDcHJ9zk7F8HjQ5H2WZ4eOFqHzm',
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'taarholt@mail.com',
      },
      {
        _id: '5fc9437fe25c4f3a4651f319',
        account: {
          password: '$2b$10$4dFuq.J3vZ89VLo4yXF8Puq4jkqRRNJSASlp5x9pZf0xgb0/utAfa',
        },
        earnBattery: {
          githubUserName: 'Parnswir',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'max@mail.com',
      },
      {
        _id: '5fc269306b7c7d570fff19e5',
        account: {
          password: '$2b$10$6Z9MQcZlaMjrwt21JH71tOApCdNmu76RA3zr.T1AXWk2nXGPRV2A2',
        },
        earnBattery: {
          githubUserName: 'haakondf',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'testuser1@mail.com',
      },
      {
        _id: '5fcb617afa77598e97d3991f',
        account: {
          password: '$2b$10$SQwE81xcdDtaEF5feM.2iukUcddfDauYOceLbz5tqVbD0j/0hDK5y',
        },
        earnBattery: {
          githubUserName: 'turdsferguson',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'turds@mail.com',
      },
      {
        _id: '5fc2691e6b7c7d570fff19e4',
        account: {
          password: '$2b$10$F35Wk1RRyCaOFK7ynCOawu1JEJWGPU1b1BXwcpA9lgwYE5wLkIIha',
        },
        earnBattery: {
          githubUserName: 'Mirobit',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'testuser0@mail.com',
      },
      {
        _id: '5fcbc8d77594c1c2ed690c3e',
        account: {
          password: '$2b$10$uTtuWWQR1K.PIZm4F/xS3OYDCXTdiuT5mS15Ua4KVO58TG3/feUNi',
        },
        earnBattery: {
          githubUserName: 'Xaviior',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'stian@mail.com',
      },
      {
        _id: '5fcbebd176553fda018c6f07',
        account: {
          password: '$2b$10$jJLX7Zkw9kG6NwefDZOcUuNLbCjjQXOmwjuEaMSiE1M2Yxf/.Z/l.',
        },
        earnBattery: {
          githubUserName: 'fenrew',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'markus@mail.com',
      },
      {
        _id: '5fcd0b2b143650295c1791fc',
        account: {
          password: '$2b$10$sHiEl9c4XIHuEbL/acCqwe3.pYlyO5dI.w6Vo6cJoaxis2Fk1/iBy',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },

        name: `unconfirmedplayer${Math.random()}`,
        email: 'vidar@mail.com',
      },
      {
        _id: '5fcd272575a30b35cd3d19e5',
        account: {
          password: '$2b$10$5BQPqF1R1yVBqf/UkBKzP.3u.PJ.Q9irvSPVVzqJiFU5TVJptkDRC',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'kristian@mail.com',
      },
      {
        _id: '5fcd270f75a30b35cd3d19e4',
        account: {
          password: '$2b$10$puqO5Aaom/VL5nU1EpMG0.wW04bbOBK9Iyy18v8cMpfUtU9KZ4pQW',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'lars@mail.com',
      },
      {
        _id: '5fcfbd4546abc2211032dfc7',
        account: {
          password: '$2b$10$q81pI2/nFb0SQgjB6kJOeuGp/yzbk/Sw0DZQUbfh2iV3exfbU./9q',
        },
        earnBattery: {
          githubUserName: 'jhsveli',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'jorgen@mail.com',
      },
      {
        _id: '5fd0b929588e490bfe244f04',
        account: {
          password: '$2b$10$t6FH7haOmp5RjYMERfnjnOYgDjvW8m7gzw9lsZei9H032JAuj.P7G',
        },
        name: `unconfirmedplayer${Math.random()}`,
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        email: 'jesus@mail.com',
      },
      {
        _id: '5fd3d7aa1aec1c314dfe3e63',
        account: {
          password: '$2b$10$0Bo0EEzxHE7xp2BeOemqXuvQNDxZHBz.o56NWQNuMh7Gu9aIJTlGq',
        },
        earnBattery: {
          githubUserName: 'yen-tth',
          githubStar: true,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'yen@mail.com',
      },
      {
        _id: '5fd4c5eabae186704d503ff7',
        account: {
          password: '$2b$10$5rACpLvzvDMD8VToDPDPuOrA8ejqUHgx1wW90/xGmN1SIs78Pz5Pm',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'magne@mail.com',
      },
      {
        _id: '5fd4f8b422d3bc81e3fcfffb',
        account: {
          password: '$2b$10$K1LcRj/6SUCRE6jDW6w1xeB/2M2P/946PYbvv5rHA6VrJMZoZdwbS',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'david@mail.com',
      },
      {
        _id: '5fd4f8a122d3bc81e3fcfffa',
        account: {
          password: '$2b$10$P65pVrHKU2Kt4zkp1DcpiuTPr11q5uM8htUxfc3UI/O6RuH6tgSuO',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'sanni@mail.com',
      },
      {
        _id: '5fd4f9d922d3bc81e3fcfffc',
        account: {
          password: '$2b$10$F4eppvBnD8OFxu1IpyfcP.KeCuFW2YnzucVvsp0dFnIfOiLZBTOTC',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'tui@mail.com',
      },
      {
        _id: '5fd4fa1d22d3bc81e3fcfffe',
        account: {
          password: '$2b$10$GebfdIfn52yuyp.ZYrfFiOyvmuCWMyIIIB6ufGjy8jO7ILFdZ.6ai',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'maxxx@mail.com',
      },
      {
        _id: '5fd651c8d7a5fe45ce170658',
        account: {
          password: '$2b$10$A/quk07H0kE1CXu0M2vW1ufBU.hORQ4d7wcuqCeBQmtXuhJyR.LTe',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'brother@mail.com',
      },
      {
        _id: '5fd652f8d7a5fe45ce170659',
        account: {
          password: '$2b$10$UB4TXDO.Jz8IUzFxE.NPVOqu9gaHerudDQsmpaIOTF4SDqYuhY8Ie',
        },
        earnBattery: {
          githubUserName: '',
          githubStar: false,
          megarpg: generateQueryString('megarpg'),
          chessathor: generateQueryString('chessathor'),
        },
        name: `unconfirmedplayer${Math.random()}`,
        email: 'sindre@mail.com',
      },
    ];

    return User.create(users);
  })
  .then(async (usersCreated) => {
    cities.forEach(async (city) => {
      city.residents = usersCreated
        .filter((user) => user.playerStats.city._id.toString() === city._id.toString())
        .map((user) => user._id);
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
