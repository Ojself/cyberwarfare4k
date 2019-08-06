const Stash = require('../models/Stash');

function stashDropChance(user, multiplier = 1) {
  console.log('stashDropChance');
  const commonStash = [
    'Raspberry Pi',
    'Ubertooth One',
    'EyeSpy Digital Spy Recorder',
    'Keylogger',
    'Lock pick set',
    'Linux for dummies',
    'Cables'
  ];
  const rareStash = [
    'WiFi Pineapple',
    'Mini Hidden Camera',
    'Rubber Ducky',
    'Proxmark3 Kit'
  ];
  const ultraStash = ['Computer', 'HackRf One'];

  let givenStash = '';

  let decider = Math.round(Math.random() * 1000) + multiplier;
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

  console.log('givenStash', givenStash, typeof givenStash);
  return givenStash;
}

function crimeSkillDropChance(user) {
  console.log('crimeSkillDropChance');
  let crimeSkills = [
    'technical',
    'socialEngineering',
    'forensics',
    'cryptography'
  ];
  let givenCrimeSkill;

  let decider = Math.random() * 1000;

  if (decider > 750) {
    /* Give technical skill */
    givenCrimeSkill = crimeSkills[0];
  } else if (decider > 500) {
    /* Give socialEngineering skill */
    givenCrimeSkill = crimeSkills[1];
  } else if (decider > 250) {
    /* Give forensics skill */
    givenCrimeSkill = crimeSkills[2];
  } else {
    /* give cryptography skill */
    givenCrimeSkill = crimeSkills[3];
  }
  //user.giveSkill(givenCrimeSkill);
  console.log(givenCrimeSkill, 'givenskill crime');
  return givenCrimeSkill;
}

function legendaryDropChance(user) {
  console.log('legendaryDropChance');
  const legendary = ['emp', 'geostorm', 'medusa'];
  let givenLegendary;

  let decider = Math.random() * 1000;

  if (decider > 998) {
    /* Give legendary skill */
    givenLegendary = legendary[Math.floor(Math.random() * legendary.length)];
  }

  return givenLegendary;
}

function batteryCheck(user, x) {
  console.log('batterycheck triggered', user.playerStats.battery, x);
  return user.playerStats.battery > x;
}

function existingValue(value) {
  console.log('existing value triggered', arguments);
  return !!value;
}

// eg. user.playerStats.bitCoins >= item.price
function checkFunds(x, y) {
  console.log('checkFunds triggered', arguments);
  return x >= y;
}

// checks for number of occurance is over
function checkOccuranceLimit(array, value, x) {
  const result = array.filter(el => el === value);
  return result.length >= x;
}

module.exports = {
  stashDropChance,
  crimeSkillDropChance,
  batteryCheck,
  legendaryDropChance,
  existingValue,
  checkEnoughFunds,
  checkOccuranceLimit
};
