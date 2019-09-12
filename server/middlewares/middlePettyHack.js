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

function pettyCrime(user) {
  const crimeSkills = user.crimeSkill;
  const decider = Math.random();
  let values = Object.values(crimeSkills);
  let probabiltiy;
  const pettyResult = {
    won: false,
    bitcoins: 0,
    exp: 0,
    battery: 5,
    stashGained: "",
    crimeSkillGained: "",
    legendaryGained: ""
  };

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
    pettyResult.bitcoins = pettyWinBitcoins(probabiltiy);
    pettyResult.exp = pettyWinExp(probabiltiy);
    if (probabiltiy > decider + 0.1) {
      /* bonus success */
      pettyResult.stashGained = stashDropChance(user, values * 100);
      pettyResult.crimeSkillGained = crimeSkillDropChance(user);
      pettyResult.legendaryGained = legendaryDropChance(user);
    }
  }
  if (user.account.role !== "testUser") {
    user.handlePettyCrime(pettyResult);
  }
  //   console.log(pettyResult, "result");
  return pettyResult;
}

function pettyWinBitcoins(probabiltiy = 0.5) {
  return Math.floor(Math.random() * 5000 * probabiltiy);
}

function pettyWinExp(probabiltiy = 0.5) {
  return Math.floor(Math.random() * 2000 * probabiltiy);
}

module.exports = {
  pettyCrime,
  pettyWinBitcoins,
  pettyWinExp,
  pettyHackRouteCriterias
};
