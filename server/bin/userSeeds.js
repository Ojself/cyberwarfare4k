const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../configs/database");

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/userSeeds.js
// todo, create something that takes care of all the relational database stuff
// or a note of how to run the seeds in which order.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const City = require("../models/City");
const Alliance = require("../models/Alliance");
const avatars = require("./avatars");

const bcryptSalt = 10;

const cityIds = [];
const allianceIds = [];
const npcIds = [];

function giveRandomAvatar() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}

async function getCities() {
  const cities = await City.find();
  cities.forEach((c) => {
    cityIds.push(c._id);
  });
}

async function getAlliances() {
  const alliances = await Alliance.find();
  alliances.forEach((element) => {
    allianceIds.push(element._id);
  });
}

async function pushAllNpcToAlliance() {
  await Alliance.findOneAndUpdate({ name: "Grey" }).then((npcAlliance) => {
    /* todo. something is wrong here */
    this.members = npcIds;
    this.save();
  });
}

function randomCityId() {
  return cityIds[Math.floor(Math.random() * cityIds.length)];
}

User.deleteMany()
  .then(() => getCities())
  .then(() => getAlliances())
  .then(() => {
    const users = [
      {
        email: "alice@email.com",
        account: {
          password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 0,
          rankName: "Script kiddie",
        },
        name: "npc_alice_level1",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Code Monkey0",
      },
      {
        email: "bob@email.com",
        account: {
          password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 1,
          rankName: "Family IT-Support",
        },
        name: "npc_bob_level2",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Code Monkey0",
      },
      {
        email: "chuck@email.com",
        account: {
          password: bcrypt.hashSync("chuck", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 2,
          rankName: "Blog Writer",
        },
        name: "npc_chuck_level3",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Code Monkey0",
      },
      {
        email: "craig@email.com",
        account: {
          password: bcrypt.hashSync("craig", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 3,
          rankName: "HTML 'programmer'",
        },
        name: "npc_craig_level4",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Code Monkey1",
      },
      {
        email: "eve@email.com",
        account: {
          password: bcrypt.hashSync("eve", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 4,
          rankName: "Jr. Web Dev",
        },
        name: "npc_eve_level5",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Code Monkey1",
      },
      {
        email: "faythe@email.com",
        account: {
          password: bcrypt.hashSync("faythe", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 5,
          rankName: "Sr. Web Dev",
        },
        name: "npc_faythe_level6",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Lead0",
      },
      {
        email: "mallory@email.com",
        account: {
          password: bcrypt.hashSync("mallory", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 6,
          rankName: "System Dev",
        },
        name: "npc_mallory_level7",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Lead1",
      },
      {
        email: "sybil@email.com",
        account: {
          password: bcrypt.hashSync("sybil", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 7,
          rankName: "Cyber Security Dev",
        },
        name: "npc_sybil_level8",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Analyst",
      },
      {
        email: "trudy@email.com",
        account: {
          password: bcrypt.hashSync("trudy", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 8,
          rankName: "Basement Dweller",
        },
        name: "npc_trudy_level9",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "CTO",
      },
      {
        email: "gerald@email.com",
        account: {
          password: bcrypt.hashSync("gerald", bcrypt.genSaltSync(bcryptSalt)),
          avatar: giveRandomAvatar(),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc",
        },
        playerStats: {
          city: randomCityId(),
          rank: 9,
          rankName: "Anonymous",
        },
        name: "npc_gerald_level10",
        alliance: allianceIds[allianceIds.length - 1],
        allianceRole: "Boss",
      },
    ];
    return User.create(users);
  })
  .then((usersCreated) => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map((u) => u._id));
    usersCreated.forEach((el) => npcIds.push(el._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch((err) => {
    mongoose.disconnect();
    throw err;
  });

/* todo, this might be exported elsewhere too */
module.exports = { getCities };
