/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const OrgCrime = require('../models/OrgCrime');

require('../configs/database');

const difficultyValues = {
  easy: 30,
  medium: 50,
  hard: 75,
  challenging: 100,
  impossible: 150,
};

const orgCrimes = [
  {
    name: 'Marriott Hotels',
    description: 'Steal login credentials, compromise decryption keys, crack the AES-128 algorithm and steal personal information from 500 million guests',
    batteryCost: 30,
    image: 'hacker3',
    roles: [
      {
        roleName: 'Technical',
        description: 'Steal personal information',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Social Engineering',
        description: 'Steal login credentials',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Forensics',
        description: 'Compromise decryption keys',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Cryptography',
        description: 'Crack the AES-128 algorithm',
        difficulty: difficultyValues.impossible,
      },
    ],
  },
  {
    name: 'Equifax',
    description: 'Exploit the unpatched servers through the Apache Struts vulnerability and steal personal information from millions of users',
    batteryCost: 30,
    image: 'security',
    roles: [
      {
        roleName: 'Technical',
        description: 'Spread malware throughout servers',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Social Engineering',
        description: 'Pose as unhappy customer in web portal',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Forensics',
        description: 'Compromise decryption keys',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Cryptography',
        description: 'Pull data from servers',
        difficulty: difficultyValues.impossible,
      },
    ],
  },
  {
    name: 'JP Morgan',
    description: 'Trick employee to hand over login credentials, exploit heartbleed vulnerability, brute force firewall defense, hide identy behind dozens of shell companies and steal personal information from millions of users',
    batteryCost: 30,
    image: 'coding',
    roles: [
      {
        roleName: 'Technical',
        description: 'Brute force firewall defense',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Social Engineering',
        description: 'Trick employee to hand over login credentials',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Forensics',
        description: 'Hide identy behind dozens of shell companies',
        difficulty: difficultyValues.impossible,
      },
      {
        roleName: 'Cryptography',
        description: 'Exploit heartbleed vulnerability',
        difficulty: difficultyValues.impossible,
      },
    ],
  },
];
const orgCrimeSeeds = async () => {
  await OrgCrime.deleteMany();
  let crimesCreated;
  try {
    crimesCreated = await OrgCrime.create(orgCrimes);
  } catch (err) {
    console.error('Org crime seed error: ', err);
    throw err;
  }
  console.info(crimesCreated.length, 'org crimes created');
};

module.exports = { orgCrimeSeeds };
