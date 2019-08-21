const {
  batteryCheck,
  existingValue,
  checkOccuranceLimit
} = require('../middlewares/middleHelpers');

// one function to run them all
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

  // todo undefine / null out values. make gen function
  return finalResult;
}

/*  TODO explanation here!! */
function crimeRecursiveBattle(user, crime, result) {
  // sets the probability to succeed, higher is better
  let probability = chanceCalculator(user, crime);

  // calculates the 'damage' the user inflicts on the crime
  let damage = damageCalulator(user, crime);
  console.log(damage, 'damage');
  // the number that decides the success, lower is better
  let decider = Math.random();

  // crime lost
  // if user has lost 4 times, the crime is considered lost
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    console.log('CRIME LOST!');
    result.playerGains.batteryCost += 10;
    return result;
  }

  // crime win
  // todo, calculate reward
  if (result.crimeHp <= 0) {
    console.log('CRIME WIN!');
    return crimeWin(result, crime, user);
  }

  // round win
  if (probability >= decider) {
    console.log('ROUND WIN!');
    roundWin(result, damage);
  }

  // round lost
  if (probability < decider) {
    console.log(probability, decider, 'ROUND LOST!');
    roundLost(result);
  }

  return crimeRecursiveBattle(user, crime, result);
}
// end of recursive

function damageCalulator(user, crime) {
  // generates randomNumber, higher is worse
  let randomNumber = Math.floor(Math.random() * 6) + 3;
  console.log('randomnumber', randomNumber);

  // crimeSkill that matches crimetype, higher is better
  let crimeTypeDamage = user.crimeSkill[crime.crimeType];
  console.log(crimeTypeDamage, 'ctd');

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  let hackSkillDamage =
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

function chanceCalculator(user, crime) {
  const userSkillNumber = user.crimeSkill[crime.crimeType];
  const crimeSkillNumber = crime.difficulty;
  // if user tried to do crimes way over his level
  if (crimeSkillNumber - userSkillNumber > 30) {
    return 0.05;
  }
  let probability = (userSkillNumber - crimeSkillNumber) / 100 + Math.random();
  return probability;
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
