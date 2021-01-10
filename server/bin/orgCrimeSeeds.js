/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const mongoose = require('mongoose');
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
    TE: {
      name: 'Technical',
      description: 'Steal personal information',
      difficulty: difficultyValues.impossible,
    },
    SE: {
      name: 'Social Engineering',
      description: 'Steal login credentials',
      difficulty: difficultyValues.impossible,
    },
    FE: {
      name: 'Forensics',
      description: 'Compromise decryption keys',
      difficulty: difficultyValues.impossible,
    },
    CG: {
      name: 'Cryptography',
      description: 'Crack the AES-128 algorithm',
      difficulty: difficultyValues.impossible,
    },
  },
  {
    name: 'Equifax data breach',
    description: 'Exploit the unpatched servers through the Apache Struts vulnerability and steal personal information from millions of users',
    batteryCost: 30,
    image: 'security',
    TN: {
      name: 'Technical',
      description: 'Spread malware throughout servers',
      difficulty: difficultyValues.impossible,
    },
    SE: {
      name: 'Social Engineering',
      description: 'Pose as unhappy customer in web portal',
      difficulty: difficultyValues.impossible,
    },
    FE: {
      name: 'Forensics',
      description: 'Compromise decryption keys',
      difficulty: difficultyValues.impossible,
    },
    CG: {
      name: 'Cryptography',
      description: 'Pull data from servers',
      difficulty: difficultyValues.impossible,
    },
  },
];

OrgCrime.deleteMany()
  .then(() => OrgCrime.create(orgCrimes))
  .then((crimesCreated) => console.info(`${crimesCreated.length} crimes created`))
  .then(() => {
    mongoose.disconnect();
    process.exit(0);
  })
  .catch((err) => {
    mongoose.disconnect();
    console.error(err);
    process.exit(1);
  });
