const {
  crimeSkillDropChance,
  stashDropChance,
  legendaryDropChance,
  batteryCheck,
  existingValue
} = require('../middlewares/middleHelpers');

function pettyCrime(user) {
  let crimeSkills = user.crimeSkill;
  let values = Object.values(crimeSkills);
  let decider = Math.random();
  let probabiltiy;
  let pettyResult = {
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

  console.log(probabiltiy, 'probabiltiy', decider, 'decider');
  /* Checking for success */
  if (probabiltiy > decider) {
    /* Success */
    console.log('probabiltiy HIGHER than decider');
    pettyResult.bitcoins = pettyWinBitcoins(user);
    pettyResult.exp = pettyWinExp(user);
    if (probabiltiy > decider + 0.2) {
      /* bonus success +0.2*/
      console.log('probabiltiy HIGHER than decider + 0.2');
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
  console.log('pettyWinBitcoins condition');
  let bitcoins = 10;
  //user.giveBitcoins(bitcoins);
  return bitcoins;
}

function pettyWinExp(user) {
  console.log('pettyWinExp condition');
  let exp = 20;
  //user.giveExp(exp);
  return exp;
}

function pettyHackRouteCriterias(user, batteryCost) {
  if (!batteryCheck(user, batteryCost)) {
    return 'insufficent battery';
  }
  if (!existingValue(user)) {
    return "User  doesn't exist";
  }
  return null;
}

module.exports = {
  pettyCrime,
  pettyWinBitcoins,
  pettyWinExp,
  pettyHackRouteCriterias
};
