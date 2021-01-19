const {
  skillDropChance,
  stashDropChance,
  batteryCheck,
  randomNumberMinMax,
} = require('./_helpers');

const pettyWinBitcoins = (multiplier) => {
  const bonus = 1000 + (multiplier * 500);
  const rng = randomNumberMinMax(bonus / 2, bonus);
  return Math.round(rng);
};

const pettyWinExp = (multiplier) => {
  const bonus = 1000 + (multiplier * 750);
  const rng = randomNumberMinMax(bonus / 2, bonus);
  return Math.round(rng);
};

// Sees if everything is in order to perform petty crime
const pettyHackRouteCriterias = (user, batteryCost) => {
  if (!user) {
    return 'Something went wrong';
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
  const crimeSkillsSum = Object.values(crimeSkills).reduce((acc, curr) => acc + curr, 0);

  const pettyResult = {
    levelUp: false,
    won: false,
    bitCoins: 0,
    exp: 0,
    battery: batteryCost,
    stashGained: null,
    skillGained: null,
  };

  let probabiltiy = (crimeSkillsSum / 53) + (Math.random() / 4);
  if (crimeSkillsSum <= 5 || probabiltiy > 0.90) {
    probabiltiy = 0.90;
  }
  /* Checking for success */
  if (probabiltiy > decider) {
    pettyResult.won = true;
    pettyResult.bitCoins = pettyWinBitcoins(user.playerStats.rank);
    pettyResult.exp = pettyWinExp(user.playerStats.rank);
    if (probabiltiy > (decider + (user.playerStats.rank / 13))) {
      pettyResult.stashGained = stashDropChance(user, crimeSkillsSum);
      pettyResult.skillGained = skillDropChance(user);
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
