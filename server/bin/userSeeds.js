const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../configs/database");

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/userSeeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const City = require("../models/City");
const Alliance = require("../models/Alliance");
const bcryptSalt = 10;

const cityIds = [];

async function getCities() {
  let cities = await City.find();
  cities.forEach(element => {
    cityIds.push(element._id);
  });
}

const allianceIds = [];

async function getAlliances() {
  let alliances = await Alliance.find();
  alliances.forEach(element => {
    allianceIds.push(element._id);
  });
}

User.deleteMany()
  .then(() => {
    return getCities();
  })
  .then(() => {
    return getAlliances();
  })
  .then(() => {
    let users = [
      {
        email: "alice@email.com",
        account: {
          password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 0,
          rankName: "Script kiddie"
        },
        name: "npc_alice_level1",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "bob@email.com",
        account: {
          password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 1,
          rankName: "Family IT-Support"
        },
        name: "npc_bob_level2",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "chuck@email.com",
        account: {
          password: bcrypt.hashSync("chuck", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 2,
          rankName: "Blog Writer"
        },
        name: "npc_chuck_level3",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "craig@email.com",
        account: {
          password: bcrypt.hashSync("craig", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 3,
          rankName: "HTML 'programmer'"
        },
        name: "npc_craig_level4",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "eve@email.com",
        account: {
          password: bcrypt.hashSync("eve", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 4,
          rankName: "Jr. Web Dev"
        },
        name: "npc_eve_level5",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "faythe@email.com",
        account: {
          password: bcrypt.hashSync("faythe", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 5,
          rankName: "Sr. Web Dev"
        },
        name: "npc_faythe_level6",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "mallory@email.com",
        account: {
          password: bcrypt.hashSync("mallory", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 6,
          rankName: "System Dev"
        },
        name: "npc_mallory_level7",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "sybil@email.com",
        account: {
          password: bcrypt.hashSync("sybil", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 7,
          rankName: "Cyber Security Dev"
        },
        name: "npc_sybil_level8",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "trudy@email.com",
        account: {
          password: bcrypt.hashSync("trudy", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 8,
          rankName: "Basement Dweller"
        },
        name: "npc_trudy_level9",
        alliance: allianceIds[allianceIds.length - 1]
      },
      {
        email: "gerald@email.com",
        account: {
          password: bcrypt.hashSync("gerald", bcrypt.genSaltSync(bcryptSalt)),
          subscription: "Bronze",
          ip: ["192.168.1.1", "192.168.1.2"],
          isSetup: true,
          role: "npc"
        },
        playerStats: {
          city: cityIds[Math.floor(Math.random() * cityIds.length)],
          rank: 9,
          rankName: "Anonymous"
        },
        name: "npc_gerald_level10",
        alliance: allianceIds[allianceIds.length - 1]
      }
    ];
    console.log(users);
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

module.exports = { getCities };
