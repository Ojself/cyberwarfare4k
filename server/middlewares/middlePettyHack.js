const {
  crimeSkillDropChance,
  stashDropChance,
  legendaryDropChance,
  batteryCheck,
  existingValue
} = require("../middlewares/middleHelpers");

// Sees if everything is in order to perform petty crime
function pettyHackRouteCriterias(user, batteryCost) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(batteryCost)) {
    return "Battery doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return "insufficent battery";
  }
  return null;
}

async function pettyCrime(user) {
  const crimeSkills = user.crimeSkill;
  const decider = Math.random();
  let values = Object.values(crimeSkills);
  let probabiltiy;
  const pettyResult = {
    levelUp: false,
    won: false,
    bitCoins: 0,
    exp: 0,
    battery: 5,
    stashGained: "",
    crimeSkillGained: "",
    legendaryGained: ""
  };
  // sums up the crimeskills
  values = values.reduce((acc, curr) => acc + curr, 0);

  if (values <= 5) {
    probabiltiy = 0.95;
  } else if (values < 10) {
    probabiltiy = 0.4;
  } else if (values < 15) {
    probabiltiy = 0.5;
  } else if (values < 20) {
    probabiltiy = 0.7;
  } else if (values < 30) {
    probabiltiy = 0.85;
  } else {
    probabiltiy = 0.95;
  }

  /* Checking for success */
  if (probabiltiy > decider) {
    /* Success */
    pettyResult.won = true;
    pettyResult.bitCoins = pettyWinBitcoins(user.playerStats.rank);
    pettyResult.exp = pettyWinExp(user.playerStats.rank);
    if (probabiltiy > decider + 0.1) {
      /* bonus success */
      pettyResult.stashGained = stashDropChance(user, values);
      pettyResult.crimeSkillGained = crimeSkillDropChance(user);
      pettyResult.legendaryGained = legendaryDropChance(user);
    }
  }

  if (pettyResult.exp + user.playerStats.exp >= user.playerStats.expToLevel) {
    pettyResult.levelUp = true;
  }

  if (user.account.role !== "testUser") {
    console.log('if triggered')
    await user.handlePettyCrime(pettyResult);
  }
  return pettyResult;
}

function pettyWinBitcoins(multiplier) {
  return Math.floor(Math.random() * 1000 + (multiplier * 1000))
}

function pettyWinExp(multiplier) {
  return Math.floor(Math.random() * 1000 + (multiplier * 1000))
}

module.exports = {
  pettyCrime,
  pettyWinBitcoins,
  pettyWinExp,
  pettyHackRouteCriterias
};
