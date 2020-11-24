const {
  crimeSkillDropChance,
  stashDropChance,
  legendaryDropChance,
  batteryCheck,
  existingValue,
} = require('./middleHelpers');

const pettyWinBitcoins = (multiplier) => Math.floor(Math.random() * (1000 + (multiplier * 500)));

const pettyWinExp = (multiplier) => Math.floor(Math.random() * (1000 + (multiplier * 750)));

// Sees if everything is in order to perform petty crime
const pettyHackRouteCriterias = (user, batteryCost) => {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'insufficent battery';
  }
  return null;
};

const pettyCrime = async (user, batteryCost) => {
  const decider = Math.random();

  // sums up the crimeskills
  const crimeSkills = user.crimeSkill;
  const values = Object.values(crimeSkills).reduce((acc, curr) => acc + curr, 0);

  const pettyResult = {
    levelUp: false,
    won: false,
    bitCoins: 0,
    exp: 0,
    battery: batteryCost,
    stashGained: '',
    crimeSkillGained: '',
    legendaryGained: '',
  };

  let probabiltiy;
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
    if (probabiltiy > (decider + 0.35)) {
      pettyResult.stashGained = stashDropChance(user, values);
      pettyResult.crimeSkillGained = crimeSkillDropChance(user);
      pettyResult.legendaryGained = legendaryDropChance(user);
    }
  }

  if (pettyResult.exp + user.playerStats.exp >= user.playerStats.expToLevel) {
    pettyResult.levelUp = true;
  }

  await user.handlePettyCrime(pettyResult);
  const updatedUser = await user.save();

  return { pettyResult, updatedUser };
};

module.exports = {
  pettyCrime,
  pettyWinBitcoins,
  pettyWinExp,
  pettyHackRouteCriterias,
};
