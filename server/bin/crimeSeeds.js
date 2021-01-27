const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// To execute this seed, run from the root of the project
// $ node bin/orgCrimeSeeds.js

const Crime = require('../models/Crime');

require('../configs/database');

const difficultyValues = {
  easy: 30,
  medium: 50,
  hard: 70,
  challenging: 90,
  impossible: 150,
};

const firewallValues = {
  easy: 90,
  medium: 150,
  hard: 210,
  challenging: 270,
  impossible: 450,
};

const crimes = [
  // SE
  {
    name: 'Internet trolling',
    description: 'Create online havoc by trolling online',
    crimeType: 'Social Engineering',
    difficulty: difficultyValues.easy,
    currentFirewall: firewallValues.easy,
    maxFirewall: firewallValues.easy,
    difficultyString: 'easy',
  },

  {
    name: 'Piggyback',
    description:
      'Follow a businessman into his office and steal valuable information',
    crimeType: 'Social Engineering',
    difficulty: difficultyValues.medium,
    currentFirewall: firewallValues.medium,
    maxFirewall: firewallValues.medium,
    difficultyString: 'medium',
  },

  {
    name: 'Spoof RFID',
    description: 'Enter an office buildning by brute forcing their door',
    crimeType: 'Social Engineering',
    difficulty: difficultyValues.hard,
    currentFirewall: firewallValues.hard,
    maxFirewall: firewallValues.hard,
    difficultyString: 'hard',
  },

  {
    name: 'ID theft',
    description: 'Be someone else, who wants to be you anyway..',
    crimeType: 'Social Engineering',
    difficulty: difficultyValues.challenging,
    currentFirewall: firewallValues.challenging,
    maxFirewall: firewallValues.challenging,
    difficultyString: 'challenging',
  },

  {
    name: 'Ransomware',
    description: 'Use ransomware to blackmail businesses for money',
    crimeType: 'Social Engineering',
    difficulty: difficultyValues.impossible,
    currentFirewall: firewallValues.impossible,
    maxFirewall: firewallValues.impossible,
    difficultyString: 'impossible',
  },

  // Forensics
  {
    name: 'Wipe HDD',
    description: 'Microwave peoples harddrive for money',
    crimeType: 'Forensics',
    difficulty: difficultyValues.easy,
    currentFirewall: firewallValues.easy,
    maxFirewall: firewallValues.easy,
    difficultyString: 'easy',
  },

  {
    name: 'Hide data',
    description: 'Hide your neighbours data and blackmail them!',
    crimeType: 'Forensics',
    difficulty: difficultyValues.medium,
    currentFirewall: firewallValues.medium,
    maxFirewall: firewallValues.medium,
    difficultyString: 'medium',
  },
  {
    name: 'Retrieve data',
    description: 'Help desperate souls to retrieve their lost data',
    crimeType: 'Forensics',
    difficulty: difficultyValues.hard,
    currentFirewall: firewallValues.hard,
    maxFirewall: firewallValues.hard,
    difficultyString: 'hard',
  },
  {
    name: 'Cross-Site Scripting',
    description: 'Drop malicious code in a comment blog',
    crimeType: 'Forensics',
    difficulty: difficultyValues.challenging,
    currentFirewall: firewallValues.challenging,
    maxFirewall: firewallValues.challenging,
    difficultyString: 'challenging',
  },
  {
    name: 'Cookie theft',
    description: 'Steal precious information from the cookie',
    crimeType: 'Forensics',
    difficulty: difficultyValues.impossible,
    currentFirewall: firewallValues.impossible,
    maxFirewall: firewallValues.impossible,
    difficultyString: 'impossible',
  },

  // Technical
  {
    name: 'Guess password',
    description: 'Guess your friends social login password',
    crimeType: 'Technical',
    difficulty: difficultyValues.easy,
    currentFirewall: firewallValues.easy,
    maxFirewall: firewallValues.easy,
    difficultyString: 'easy',
  },
  {
    name: 'Change grades',
    description: 'Change university grades for money',
    crimeType: 'Technical',
    difficulty: difficultyValues.medium,
    currentFirewall: firewallValues.medium,
    maxFirewall: firewallValues.medium,
    difficultyString: 'medium',
  },
  {
    name: 'Web scrapping',
    description: 'Scrap the web for data and sell profitable patterns',
    crimeType: 'Technical',
    difficulty: difficultyValues.hard,
    currentFirewall: firewallValues.hard,
    maxFirewall: firewallValues.hard,
    difficultyString: 'hard',
  },
  {
    name: 'SQL injection',
    description: 'Look for credit card information in company databases',
    crimeType: 'Technical',
    difficulty: difficultyValues.challenging,
    currentFirewall: firewallValues.challenging,
    maxFirewall: firewallValues.challenging,
    difficultyString: 'challenging',
  },
  {
    name: 'GPS jamming',
    description: 'Jam GPS signals in 3rd world countries',
    crimeType: 'Technical',
    difficulty: difficultyValues.impossible,
    currentFirewall: firewallValues.impossible,
    maxFirewall: firewallValues.impossible,
    difficultyString: 'impossible',
  },

  // Cryptography
  {
    name: 'Crack consoles',
    description: 'Sell cracked gaming consoles',
    crimeType: 'Cryptography',
    difficulty: difficultyValues.easy,
    currentFirewall: firewallValues.easy,
    maxFirewall: firewallValues.easy,
    difficultyString: 'easy',
  },
  {
    name: 'Crypto currency',
    description: 'Speculate in Virtual currency',
    crimeType: 'Cryptography',
    difficulty: difficultyValues.medium,
    currentFirewall: firewallValues.medium,
    maxFirewall: firewallValues.medium,
    difficultyString: 'medium',
  },
  {
    name: 'Fake Public-key',
    description: "Who's really signing those certificates?",
    crimeType: 'Cryptography',
    difficulty: difficultyValues.hard,
    currentFirewall: firewallValues.hard,
    maxFirewall: firewallValues.hard,
    difficultyString: 'hard',
  },
  {
    name: 'Spoof TLS Handshake',
    description: 'Much easier to handshake online than irl',
    crimeType: 'Cryptography',
    difficulty: difficultyValues.challenging,
    currentFirewall: firewallValues.challenging,
    maxFirewall: firewallValues.challenging,
    difficultyString: 'challenging',
  },
  {
    name: 'SSL sniffing',
    description: 'The s in HTTPS is only indicative',
    crimeType: 'Cryptography',
    difficulty: difficultyValues.impossible,
    currentFirewall: firewallValues.impossible,
    maxFirewall: firewallValues.impossible,
    difficultyString: 'impossible',
  },
];
const crimeSeeds = async () => {
  await Crime.deleteMany();
  let crimesCreated;
  try {
    crimesCreated = await Crime.create(crimes);
  } catch (err) {
    console.error('Crime seeds error: ', err);
  }
  console.info(crimesCreated.length, ' crimes created');
};
module.exports = { crimeSeeds };
