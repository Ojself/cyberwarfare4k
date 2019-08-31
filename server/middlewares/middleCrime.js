const {
  batteryCheck,
  existingValue,
  checkOccuranceLimit
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to perform crime
function crimeRouteCriterias(crime, user, batteryCost) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(crime)) {
    return "Crime doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!crime.available) {
    return 'This crime is not available at the moment';
  }
  return null;
}

function fightCrime(user, crime, batteryCost) {
  const result = {
    user,
    crimeType: crime.crimeType,
    roundResult: [],
    roundCrimeRemainingHp: [],
    crimeHp: crime.currentFirewall,
    won: false,
    playerGains: {
      levelUp: false,
      batteryCost: batteryCost,
      exp: 0,
      bitcoins: 0,
      skillGained: '',
      stashGained: '',
      legendaryGained: ''
    }
  };
  const finalResult = crimeRecursiveBattle(user, crime, result);

  // sees if player leveled up
  if (user.playerStats.exp >= user.playerStats.expToLevel) {
    finalResult.playerGains.levelUp = true;
    user.newRank();
  }

  crime.handleCrime(finalResult);
  user.handleCrime(finalResult);

  return finalResult;
}

// recursive function that runs until the hp of the crime is 0 or the user has lost 4 times
function crimeRecursiveBattle(user, crime, result) {
  let probability = chanceCalculator(user, crime);

  let damage = damageCalulator(user, crime);

  // the number that decides the success, lower is better
  let decider = Math.random();

  // crime lost
  // if user has lost 4 times, the crime is considered 'lost'
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    result.playerGains.batteryCost += 10;
    return result;
  }

  // crime win
  // the health of the crime is 0 or below and the crime is 'won'
  // todo, calculate reward
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
}
// end of recursive

// sets the probability to succeed, higher is better
function chanceCalculator(user, crime) {
  const userSkillNumber = user.crimeSkill[crime.crimeType];
  const crimeSkillNumber = crime.difficulty;
  // if user tried to do crimes way over his level, give him low chance for success
  if (crimeSkillNumber - userSkillNumber > 30) {
    return 0.05;
  }
  const probability =
    (userSkillNumber - crimeSkillNumber) / 100 + Math.random();
  return probability;
}

// calculates the 'damage' the user inflicts on the crime
function damageCalulator(user, crime) {
  // generates randomNumber, higher is worse
  const randomNumber = Math.floor(Math.random() * 6) + 3;

  // crimeSkill that matches crimetype, higher is better
  const crimeTypeDamage = user.crimeSkill[crime.crimeType];

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  const hackSkillDamage =
    Object.values(user.hackSkill).reduce((a, b) => a + b) / randomNumber;

  return Math.floor(crimeTypeDamage + hackSkillDamage);
}

function roundWin(result, damage) {
  result.crimeHp -= damage;
  result.roundResult.push('win');
  result.roundCrimeRemainingHp.push(result.crimeHp);
  return result;
}

function roundLost(result) {
  result.roundResult.push('lost');
  result.roundCrimeRemainingHp.push(result.crimeHp);
  return result;
}

function crimeWin(result, crime, user) {
  // TODO
  // Write some math random stuff here
  // stash and legendary
  result.won = true;
  result.playerGains.exp = 10;
  result.playerGains.bitCoins = 20;
  result.playerGains.skillGained = crime.crimeType;
  result.playerGains.skillGained = ''; // function here
  result.playerGains.legendaryGained = ''; // function here
  return result;
}

module.exports = { crimeRouteCriterias, fightCrime };
