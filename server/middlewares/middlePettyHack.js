function pettyCrime(user) {
  let crimeSkills = user.crimeSkill;
  let values = Object.values(crimeSkills);
  let decider = Math.random();
  let probabiltiy;
  let pettyResult = {
    bitcoins: 0,
    exp: 0,
    crimeSkillGained: '',
    stashGained: ''
  };

  /* Grabs the two lowest values from crimeskill  */
  values = values.sort();
  values = values[0] + values[1];

  /* Good overall skills give you 90% chance of success of petty crime*/
  if (values > 30) {
    probabiltiy = 0.9;
  } else {
    probabiltiy = values / 100 + Math.random() / 2;
  }

  /* Checking for success */
  if (probabiltiy > decider) {
    /* Success */
    console.log('probability HIGHER than decider');
    pettyResult.bitcoins = pettyWinBitcoins(user);
    pettyResult.exp = pettyWinExp(user);
    if (probability > decider + 0.2) {
      /* bonus success */
      console.log('probability HIGHER than decider + 0.15');
      pettyResult.stashGained = stashDropChance(user);
      pettyResult.crimeSkillGained = crimeSkillDropChance(user);
    }
  }
  return pettyResult;
}

function pettyWinBitcoins(user) {
  console.log('pettyWinBitcoins condition');
  let bitcoins = 10;
  return bitcoins;
}

function pettyWinExp(user) {
  console.log('pettyWinExp condition');
  let exp = 20;
  return exp;
}

module.exports = {};
