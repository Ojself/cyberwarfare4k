const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Seeds file that remove all crimes and create XXX new crimes

// To execute this seed, run from the root of the project
// $ node bin/orgCrimeSeeds.js

const mongoose = require('mongoose');
const User = require('../models/User');
const OrgCrime = require('../models/OrgCrime');

require('../configs/database');

let orgCrimes = [
  // SE
  {
    name: 'Internet trolling',
    description: 'Create online havoc by trolling online',
    crimeType: 'Social Engineering',
    difficulty: 30,
    currentFirewall: 90,
    maxFirewall: 90
  },

  {
    name: 'Piggyback',
    description:
      'Follow a businessman into his office and steal valuable information',
    crimeType: 'Social Engineering',
    difficulty: 50,
    currentFirewall: 150,
    maxFirewall: 150
  },

  {
    name: 'Spoof RFID',
    description: 'Enter an office buildning by brute forcing their door',
    crimeType: 'Social Engineering',
    difficulty: 70,
    currentFirewall: 210,
    maxFirewall: 210
  },

  {
    name: 'ID theft',
    description: 'Be someone else, who wants to be you anyway..',
    crimeType: 'Social Engineering',
    difficulty: 90,
    currentFirewall: 270,
    maxFirewall: 270
  },

  {
    name: 'Ransomware',
    description: 'Use ransomware to blackmail businesses for money',
    crimeType: 'Social Engineering',
    difficulty: 150,
    currentFirewall: 450,
    maxFirewall: 450
  },

  // Forensics
  {
    name: 'Wipe HDD',
    description: 'Microwave peoples harddrive for money',
    crimeType: 'Forensics',
    difficulty: 30,
    currentFirewall: 90,
    maxFirewall: 90
  },

  {
    name: 'Hide data',
    description: 'Hide your neighbours data and blackmail them!',
    crimeType: 'Forensics',
    difficulty: 50,
    currentFirewall: 150,
    maxFirewall: 150
  },
  {
    name: 'Retrieve data',
    description: 'Help desperate souls to retrieve their lost data',
    crimeType: 'Forensics',
    difficulty: 70,
    currentFirewall: 210,
    maxFirewall: 210
  },
  {
    name: 'Cross-Site Scripting',
    description: 'Drop malicious code in a comment blog ',
    crimeType: 'Forensics',
    difficulty: 90,
    currentFirewall: 270,
    maxFirewall: 270
  },
  {
    name: 'Cookie theft',
    description: 'Steal precious information from the cookie',
    crimeType: 'Forensics',
    difficulty: 150,
    currentFirewall: 450,
    maxFirewall: 450
  },

  // Technical
  {
    name: 'Guess password',
    description: 'Guess your friends social login password',
    crimeType: 'Technical',
    difficulty: 30,
    currentFirewall: 90,
    maxFirewall: 90
  },
  {
    name: 'Change grades',
    description: 'Change university grades for money',
    crimeType: 'Technical',
    difficulty: 50,
    currentFirewall: 150,
    maxFirewall: 150
  },
  {
    name: 'Web scrapping',
    description: 'Scrap the web for data and sell profitable patterns',
    crimeType: 'Technical',
    difficulty: 70,
    currentFirewall: 210,
    maxFirewall: 210
  },
  {
    name: 'SQL injection',
    description: 'Look for credit card information in company databases',
    crimeType: 'Technical',
    difficulty: 90,
    currentFirewall: 270,
    maxFirewall: 270
  },
  {
    name: 'GPS jamming',
    description: 'Jam GPS signals in 3rd world countries',
    crimeType: 'Technical',
    difficulty: 150,
    currentFirewall: 450,
    maxFirewall: 450
  },

  // Cryptography
  {
    name: 'Crack consoles',
    description: 'Sell cracked gaming consoles',
    crimeType: 'Cryptography',
    difficulty: 30,
    currentFirewall: 90,
    maxFirewall: 90
  },
  {
    name: 'Crypto currency',
    description: 'Speculate in Virtual currency',
    crimeType: 'Cryptography',
    difficulty: 50,
    currentFirewall: 150,
    maxFirewall: 150
  },
  {
    name: 'Fake Public-key',
    description: "Who's really signing those certificates?",
    crimeType: 'Cryptography',
    difficulty: 70,
    currentFirewall: 210,
    maxFirewall: 210
  },
  {
    name: 'Spoof TLS Handshake',
    description: 'Much easier to handshake online than irl',
    crimeType: 'Cryptography',
    difficulty: 90,
    currentFirewall: 270,
    maxFirewall: 270
  },
  {
    name: 'SSL sniffing',
    description: 'The s in HTTPS is only indicative',
    crimeType: 'Cryptography',
    difficulty: 150,
    currentFirewall: 450,
    maxFirewall: 450
  }
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
