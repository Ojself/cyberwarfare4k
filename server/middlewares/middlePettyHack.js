const {
  crimeSkillDropChance,
  stashDropChance,
  legendaryDropChance,
  batteryCheck,
  existingValue
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to perform petty crime
function pettyHackRouteCriterias(user, batteryCost) {
  if (!batteryCheck(user, batteryCost)) {
    return 'insufficent battery';
  }
  if (!existingValue(user)) {
    return "User  doesn't exist";
  }
  return null;
}

function pettyCrime(user) {
  const crimeSkills = user.crimeSkill;
  const decider = Math.random();
  let values = Object.values(crimeSkills);
  let probabiltiy;
  const pettyResult = {
    bitcoins: 0,
    exp: 0,
    battery: 5,
    stashGained: '',
    crimeSkillGained: '',
    legendaryGained: ''
  };

  /* Grabs the two lowest values from crimeskill  */
  values = values.sort();

  values = values[0] + values[1];

  /* Good overall skills give you 90% chance of success of petty crime*/
  if (values > 30) {
    probabiltiy = 0.9;
  } else {
    probabiltiy = values / 50 + Math.random();
  }

  /* Checking for success */
  if (probabiltiy > decider) {
    /* Success */

    pettyResult.bitcoins = pettyWinBitcoins(user);
    pettyResult.exp = pettyWinExp(user);
    if (probabiltiy > decider + 0.2) {
      pettyResult.stashGained = stashDropChance(user, values * 100);
      pettyResult.crimeSkillGained = crimeSkillDropChance(user);
      pettyResult.legendaryGained = legendaryDropChance(user);
    }
    //call user.method something something
  }
  user.handlePettyCrime(pettyResult);
  return pettyResult;
}

function pettyWinBitcoins(user) {
  const bitcoins = Math.floor(Math.random * 1000);
  return bitcoins;
}

function pettyWinExp(user) {
  const exp = Math.floor(Math.random * 100);
  return exp;
}

module.exports = {
  pettyCrime,
  pettyWinBitcoins,
  pettyWinExp,
  pettyHackRouteCriterias
};
