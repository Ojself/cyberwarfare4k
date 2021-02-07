const {
  skillDropChance,
  stashDropChance,
  batteryCheck,
  randomNumberMinMax,
} = require('./_helpers');

const pettyWinBitcoins = (multiplier) => {
  const bonus = 1000 + (multiplier * 400);
  const rng = randomNumberMinMax(bonus / 2, bonus);
  return Math.round(rng);
};

const pettyWinExp = (multiplier) => {
  if (multiplier > 3){
    multiplier = 3
  }
  const bonus = 1000 + (multiplier * 500);
  const rng = randomNumberMinMax(bonus / 2, bonus);
  return Math.round(rng);
};

// Sees if everything is in order to perform petty crime
const pettyHackRouteCriterias = (user, batteryCost) => {
  if (!user) {
    return 'Something went wrong';
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
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

  let probabiltiy = (crimeSkillsSum / 100) + (Math.random() / 3);
  if (crimeSkillsSum <= 10 || probabiltiy > 0.90) {
    probabiltiy = 0.90;
  }
  const newbieBonus = user.fightInformation.pettyCrimesInitiated < 3;
  if (newbieBonus) {
    probabiltiy = 1;
  }

  /* Checking for success */
  if (probabiltiy > decider) {
    pettyResult.won = true;
    pettyResult.bitCoins = pettyWinBitcoins(user.playerStats.rank);
    pettyResult.exp = pettyWinExp(user.playerStats.rank);
    if (probabiltiy > (decider + (user.playerStats.rank / 10))) {
      pettyResult.stashGained = stashDropChance(user, crimeSkillsSum);
    }
    if (probabiltiy > (decider + (user.playerStats.rank / 4))){
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
