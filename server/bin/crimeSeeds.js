const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all crimes and create XXX new crimes

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

/* Suggestions */
/* Spoof rfid to office doors */
/* Open car doors */
/* Set up fake public  wifi */

const mongoose = require('mongoose');
const User = require('../models/User');
const Crime = require('../models/Crime');

require('../configs/database');

let crimes = [

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
