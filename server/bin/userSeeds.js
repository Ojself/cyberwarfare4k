const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('../configs/database');

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/userSeeds.js
// todo, create something that takes care of all the relational database stuff
// or a note of how to run the seeds in which order.

const mongoose = require('mongoose');
const User = require('../models/User');

const avatars = require('./avatars.json');

const giveRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

const users = [
  {
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
      Encryption: 25,
    },
    account: {
      email: 'alice@email.com',
      password: '$2b$10$UakxtcaByDAe.UYaG0l/WeXJ6kMvWy0hgCRGvN/H/9df9gi9IGiea',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470b', // Shanghai
      rank: 0,
      rankName: 'Script kiddie',
    },
    name: 'npc_alice',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'firstMonkeys',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 25,
      Encryption: 25,
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
      email: 'bob@email.com',
      password: '$2b$10$8pLbWUz3jfdTqrFxo0O3e.afgMLCFyfPoLXapJRzNHKMHkukjMR7S',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470c', // Hanoi
      rank: 1,
      rankName: 'Family IT-Support',
    },
    name: 'npc_bob',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'firstMonkeys',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 25,
      Encryption: 25,
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
      email: 'chuck@email.com',
      password: '$2b$10$QiVbeBQubHQLvJUZGgsN.e6qG7jqjVzKq//q3VhBIn4IwHW/5iRPy',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470d', // Stavanger
      rank: 2,
      rankName: 'Blog Writer',
    },
    name: 'npc_chuck',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'firstMonkeys',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 25,
      Encryption: 25,
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
      email: 'craig@email.com',
      password: '$2b$10$tfG83xjjH7zNzY8bsi34COnGGiIN3hqYJPYKxHV3uREkg64oV5lP6',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470e', // Phoenix
      rank: 3,
      rankName: "HTML 'programmer'",
    },
    name: 'npc_craig',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'secondMonkeys',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 25,
      Encryption: 25,
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
      email: 'eve@email.com',
      password: '$2b$10$2JvNYbiT8M0xlSDf.wxcle30u1tmZiR/aSwcnzdb5ezIZbsEqn2Jy',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470f', // Novosibirsk
      rank: 4,
      rankName: 'Jr. Web Dev',
    },
    name: 'npc_eve',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'secondMonkeys',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 75,
      Encryption: 25,
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
      email: 'faythe@email.com',
      password: '$2b$10$tdqM1M7SoYQdZBtWMTkLs.bpdRUtdp8QxNoX1BJUPuX6JUuKp1CWy',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470b', // Shanghai
      rank: 5,
      rankName: 'Sr. Web Dev',
    },
    name: 'npc_fayth',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'firstLead',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 75,
      Encryption: 25,
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
      email: 'mallory@email.com',
      password: '$2b$10$o4syLJwQN2eHRKuE.SJlP.zJQl3ui3cgLyLVhlot4mzYESedRWM76',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470c', // Hanoi
      rank: 6,
      rankName: 'System Dev',
    },
    name: 'npc_mallory',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'secondLead',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 160,
      Encryption: 25,
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
      email: 'sybil@email.com',
      password: '$2b$10$4doyGM5DNtRzjSuOAu2PNuU8JoMezyXUZVETxQjX/xr4QOPPYTESe',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470d', // Stavanger
      rank: 7,
      rankName: 'Cyber Security Dev',
    },
    name: 'npc_sybil',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'analyst',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 125,
      Encryption: 25,
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
      email: 'trudy@email.com',
      password: '$2b$10$RLqNwdxrfEtd4IlBCeI0Fuj553IC50udq3o9Ax6DEzvk7TMETqrLe',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      bounty: 800000,
      bountyDonors: ['5fca3b4a86e77b5c8e58b683'],
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470e', // Phoenix
      rank: 8,
      rankName: 'Basement Dweller',
    },
    name: 'npc_trudy',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'cto',
  },
  {
    hackSkill: {
      CPU: 1,
      AntiVirus: 200,
      Encryption: 25,
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
      email: 'gerald@email.com',
      password: '$2b$10$cbgDBDZ29vPErIz78foiE.rIHbaibn2rGpfWaOMjj8uWJgRDFNoky',
      avatar: giveRandomAvatar(),
      isSetup: true,
    },
    playerStats: {
      bounty: 1000000,
      bountyDonors: ['5fca3b4a86e77b5c8e58b683'],
      maxFireWall: 200,
      currentFirewall: 200,
      city: '5fae62409cbf7d270f23470f', // Novosibirisk
      rank: 9,
      rankName: 'Anonymous',
    },
    name: 'npc_gerald',
    alliance: '5fae6d7ee60018434108369c',
    allianceRole: 'boss',
  },
  {
    name: 'Admin_Tor',
    _id: '5fca3b4a86e77b5c8e58b683',
    account: {
      email: 'tormod@mail.com',
      password: '$2b$10$dXcx87D2LmkjravCI9UgROSW92oGCIx4qBb9qPiz.MCmlKo882uce',
      avatar: '/hackerAvatars/Waifu/greenblack.png',
      isSetup: true,
    },
    playerStats: {
      bounty: 0,
      maxFireWall: 100,
      currentFirewall: 100,
      city: '5fae62409cbf7d270f23470f', // Novosibirisk
      rank: 0,
      rankName: 'Script kiddie',
    },
  },
];

User.deleteMany()
  .then(() => User.create(users))
  .then((usersCreated) => {
    console.info(`Success! ${usersCreated.length} users created!`);
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error('Error: ', err);
    process.exit(1);
  });
