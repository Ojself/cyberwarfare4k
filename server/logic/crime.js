const {
  batteryCheck,
  checkOccuranceLimit,
} = require('./_helpers');

// calculates the 'damage' the user inflicts on the crime
// boils down the players crimcrimesInitiatede and hacking skills and returns a randomnumber from 0 to x
const damageCalulator = (user, crime) => {
  const crimeTypeDamage = user.crimeSkill[crime.crimeType];
  const hackSkillDamage = Object.values(user.hackSkill).reduce((a, b) => a + b);
  return Math.round(Math.random() * (crimeTypeDamage + hackSkillDamage));
};

// sets the probability to succeed, higher is better
const chanceCalculator = (user, crime) => {
  const userSkillNumber = user.crimeSkill[crime.crimeType];
  const crimeSkillNumber = crime.difficulty;
  let probability = (userSkillNumber - crimeSkillNumber) / 100 + (Math.random() / 2);
  const newbieBonus = user.fightInformation.crimesInitiated < 2 && crime.difficulty <= 70;
  if (newbieBonus) {
    probability += 0.65;
  }
  return probability;
};

const crimeWinBitcoins = (multiplier) => Math.floor(Math.random() * multiplier) * 1000;

// returns a skill based on luck and rank. Higher rank gives lower chance
const skillGained = (decider, rank, crimeType) => {
  if (rank === 0) {
    rank = 1;
  }
  if (Math.random() - rank / 14 < decider) {
    return null;
  }
  const crimeTypes = [
    'Technical',
    'Social Engineering',
    'Forensics',
    'Cryptography',
  ].filter((el) => el !== crimeType);
  return crimeTypes[Math.floor(Math.random() * crimeTypes.length)];
};

const crimeWinExp = (multiplier, userRank) => {
  const max = (multiplier + (userRank * 2)) * 350;
  const min = multiplier * 150;
  return Math.floor(Math.random() * (max - min) + min);
};

// gives user statpoints based on luck and rank. Higher rank gives lower chance
const statGained = (decider, rank) => {
  if (Math.random() - rank || 1 / 8 < decider) {
    return null;
  }
  return true;
  // return Math.random() - (rank / 10) < decider
};

const crimeWin = (result, crime, user, decider) => {
  result.won = true;
  result.playerGains.exp = crimeWinExp(crime.difficulty, user.playerStats.rank);
  result.playerGains.bitCoins = crimeWinBitcoins(crime.difficulty);
  result.playerGains.skillGained = skillGained(
    decider,
    user.playerStats.rank,
    crime.crimeType,
  );
  result.playerGains.statGained = statGained(decider, user.playerStats.rank);
  return result;
};

const roundWin = (result, damage) => {
  result.crimeHp -= damage;
  result.roundResult.push('win');
  result.roundCrimeRemainingHp.push(result.crimeHp);
  return result;
};

const roundLost = (result) => {
  result.roundResult.push('lost');
  result.roundCrimeRemainingHp.push(result.crimeHp);
  return result;
};

// recursive const that = runs until the hp of the crime is 0 or the user has lost 4 time=>s
const crimeRecursiveBattle = (user, crime, result) => {
  const probability = chanceCalculator(user, crime);
  const damage = damageCalulator(user, crime);

  // the number that decides the success, lower is better
  const decider = Math.random();

  // crime lost
  // if user has lost 4 times, the crime is considered 'lost'
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    return result;
  }

  // crime win
  // the health of the crime is 0 or below and the crime is 'won'
  if (result.crimeHp <= 0) {
    return crimeWin(result, crime, user);
  }

  // round win
  if (probability >= decider) {
    roundWin(result, damage);
  }

  // round lost
  if (probability < decider) {
    roundLost(result);
  }

  return crimeRecursiveBattle(user, crime, result);
};
// end of recursive

// Sees if everything is in order to perform crime

const crimeRouteCriterias = (crime, user, batteryCost, now) => {
  if (!crime || !user) {
    return 'Something went wrong';
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!crime.gracePeriod > now) {
    return 'This crime is not available at the moment';
  }
  return null;
};

const fightCrime = async (user, crime, batteryCost, now) => {
  const result = {
    now,
    user,
    crimeType: crime.crimeType,
    roundResult: [],
    roundCrimeRemainingHp: [crime.currentFirewall],
    crimeHp: crime.currentFirewall,
    won: false,
    playerGains: {
      levelUp: false,
      batteryCost,
      exp: 0,
      bitCoins: 0,
      skillGained: null,
      stashGained: null,
    },
  };
  const finalResult = crimeRecursiveBattle(user, crime, result);

  // sees if player leveled up
  finalResult.playerGains.levelUp = user.playerStats.exp + finalResult.playerGains.exp
    >= user.playerStats.expToLevel;

  user.handleCrime(finalResult);

  await user.save().then((userSaved) => {
    userSaved
      .populate('playerStats.city', 'name')
      .execPopulate()
      .then((res) => {
        finalResult.user = res;
      });
  });
  crime.handleCrime(finalResult);
  await crime.save();

  return finalResult;
};

module.exports = {
  crimeRouteCriterias,
  crimeWin,
  fightCrime,
  chanceCalculator,
  damageCalulator,
  roundWin,
  roundLost,
};
