const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all crimes and create XXX new crimes

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

/* Suggestions */
/* Open car doors */
/* Set up fake public  wifi */

const mongoose = require('mongoose');
const User = require('../models/User');
const Crime = require('../models/Crime');

require('../configs/database');

// very easy 10 - 30
//  easy 30-50
//  medium 50-70
//  hard 70-90
//  impossible 90-100
/* technical, forensics, socialengineering, cryptography */

let crimes = [
  // SE
  {
    name: 'Internet trolling',
    description: 'Create online havoc by trolling online',
    available: 3,
    crimeType: 'socialEngineering',
    difficulty: 1,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  {
    name: 'Piggyback',
    description:
      'Follow a businessman into his office and steal valuable information',
    available: 3,
    crimeType: 'socialEngineering',
    difficulty: 2,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  {
    name: 'Spoof RFID',
    description: 'Enter an office buildning by brute forcing their door',
    available: 3,
    crimeType: 'socialEngineering',
    difficulty: 3,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  {
    name: 'ID theft',
    description: 'Be someone else, who wants to be you anyway..',
    available: 3,
    crimeType: 'socialEngineering',
    difficulty: 4,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  {
    name: 'Ransomware',
    description: 'Use ransomware to blackmail businesses for money',
    available: 3,
    crimeType: 'socialEngineering',
    difficulty: 5,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  // forensics
  {
    name: 'Wipe HDD',
    description: 'Microwave peoples harddrive for money',
    available: 3,
    crimeType: 'forensics',
    difficulty: 1,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  {
    name: 'Hide data',
    description: 'Hide your neighbours data and blackmail them!',
    available: 3,
    crimeType: 'forensics',
    difficulty: 2,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },
  {
    name: 'Retrieve data',
    description: 'Help desperate souls to retrieve their lost data',
    available: 3,
    crimeType: 'forensics',
    difficulty: 3,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  // technical
  {
    name: 'Guess password',
    description: 'Guess your friends social login password',
    available: 3,
    crimeType: 'technical',
    difficulty: 1,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },
  {
    name: 'Change grades',
    description: 'Change university grades for money',
    available: 3,
    crimeType: 'technical',
    difficulty: 2,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },
  {
    name: 'Web scrapping',
    description: 'Scrap the web for data and sell profitable patterns',
    available: 3,
    crimeType: 'technical',
    difficulty: 3,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },

  // cryptography
  {
    name: 'Crack consoles',
    description: 'Sell cracked gaming consoles',
    available: 3,
    crimeType: 'cryptography',
    difficulty: 1,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  },
  {
    name: 'Crypto currency',
    description: 'Speculate in Virtual currency',
    available: 3,
    crimeType: 'cryptography',
    difficulty: 2,
    encryption: 1,
    currentFirewall: 10,
    maxFirewall: 10
  }

  /* 
Hack adobe
Hack Sony
Hack Equifax
Hack adult friend finder
Marriott hotels
Yahoo!
JP Morgan
Home Depot
VISA 
MasterCard

Online bank heist organized
Rewards points transfer
Hack social network
Hijack corporate email
Ex girlfriend
Break into cellphone 

Steal credit cards

gain access to gym
free apps
free pornhub account
Web shells
payloads
Logic bombs
backdoors
exploits
screen scrapers
Ransomware
SQL injection



 */
];

Crime.deleteMany()
  .then(() => {
    return Crime.create(crimes);
  })
  .then(crimesCreated => {
    console.log(
      `${crimesCreated.length} crimes created with the following id:`
    );
    console.log(crimesCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

/* 
let crimes = [
  
  {
    name: 'Internet Troll',
    difficulty: 1,
    encryption: 10,
    currentFirewall: 140,
    maxFirewall: 140
  },

  
  {
    name: 'Internet Scam',
    difficulty: 2.5,
    encryption: 20,
    currentFirewall: 200,
    maxFirewall: 200
  },

  

  {
    name: 'ID Theft',
    difficulty: 5,
    encryption: 30,
    currentFirewall: 300,
    maxFirewall: 300
  },


  {
    name: 'DDOS',
    difficulty: 10,
    encryption: 50,
    currentFirewall: 400,
    maxFirewall: 400
  },



  {
    name: 'Logic Bomb',
    difficulty: 15,
    encryption: 60,
    currentFirewall: 700,
    maxFirewall: 700
  }

];

 */
