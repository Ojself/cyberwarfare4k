const stashDropChance = (user, multiplier = 1) => {
  const commonStash = [
    'Raspberry Pi',
    'Ubertooth One',
    'EyeSpy Digital Spy Recorder',
    'Keylogger',
    'Lock pick set',
    'Linux for dummies',
    'Cables',
  ];
  const rareStash = [
    'WiFi Pineapple',
    'Mini Hidden Camera',
    'Rubber Ducky',
    'Proxmark3 Kit',
  ];
  const ultraStash = ['Computer', 'HackRf One'];

  let givenStash;

  const decider = Math.round(Math.random() * 1000) + multiplier;

  if (decider > 750) {
    /* Give ultra  item */
    givenStash = ultraStash[Math.floor(Math.random() * ultraStash.length)];
  } else if (decider > 450) {
    /* Give rare item */
    givenStash = rareStash[Math.floor(Math.random() * rareStash.length)];
  } else {
    /* give common item */
    givenStash = commonStash[Math.floor(Math.random() * commonStash.length)];
  }
  return givenStash;
};

const randomNumberMinMax = (min, max) => Math.random() * (max - min) + min;

const skillDropChance = (user) => (Math.random() > 0.5 ? crimeSkillDropChance(user) : hackSkillDropChance(user));

const crimeSkillDropChance = (user) => {
  const crimeSkills = [
    'Technical',
    'Social Engineering',
    'Forensics',
    'Cryptography',
  ];

  const givenCrimeSkill = crimeSkills[Math.floor(Math.random() * crimeSkills.length)];
  return user.crimeSkill[givenCrimeSkill] >= 100 ? null : givenCrimeSkill;
};

const hackSkillDropChance = (user) => {
  const hackSkills = [
    'CPU',
    'Encryption',
    'AntiVirus',
  ];

  const givenHackSkill = hackSkills[Math.floor(Math.random() * hackSkills.length)];
  return user.hackSkill[givenHackSkill] >= 100 ? null : givenHackSkill;
};

// not been implemented yet
const legendaryDropChance = (multiplier) => {
  const legendary = ['emp', 'geostorm', 'medusa'];

  const decider = (Math.random() * 1000) + multiplier;

  if (decider > 998) {
    return legendary[Math.floor(Math.random() * legendary.length)];
  }
  return null;
};

const batteryCheck = (user, x) => user.playerStats.battery >= x;

const existingValue = (value) => !!value;

// e.g. user.playerStats.bitCoins >= item.price
const checkFunds = (x, y) => x >= y;

// checks for number of occurance is over
const checkOccuranceLimit = (array, value, x) => {
  const result = array.filter((el) => el === value);
  return result.length >= x;
};

// Checks for two values being the same incl. type
const checkSameValue = (valueX, valueY) => valueX !== valueY;

// Nullifies values in obj so unnecessary data is left behind
const nullifyValues = (obj, valuesArray) => {
  for (const key in obj) {
    if (valuesArray.includes(key)) {
      obj[key] = null;
    }
  }
  return obj;
};

// Removes blanks from an object
const removeBlankValuesFromObject = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || isNaN(obj[propName])) {
      delete obj[propName];
    }
  }
};

module.exports = {
  checkFunds,
  stashDropChance,
  skillDropChance,
  batteryCheck,
  legendaryDropChance,
  existingValue,
  checkOccuranceLimit,
  checkSameValue,
  nullifyValues,
  removeBlankValuesFromObject,
  randomNumberMinMax,
};
