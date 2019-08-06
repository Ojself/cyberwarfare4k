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
  if (!batteryCheck(user.playerStats.battery, batteryCost)) {
    return 'Insufficent battery';
  }
  return null;
}

function fightCrime(user, crime, batteryCost) {
  const result = {
    crimeType = crime.crimeType
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
    user.newRank()
  }
  // send to user and crime thing here
  // need for asyn await here?
   crime.handleCrime(finalResult);
   user.handleCrime(finalResult);

  return finalResult;
}

/*  TODO explanation here!! */
function crimeRecursiveBattle(user, crime, result) {
  // sets the probability to succeed, higher is better
  let probability = chanceCalculator(user, crime);

  // calculates the 'damage' the user inflicts on the crime
  let damage = damageCalulator(user, crime);

  // the number that decides the success, lower is better
  let decider = Math.random();

  // crime lost
  // if user has lost 4 times, the crime is considered lost
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    console.log('CRIME LOST!');
    result.playerGains[batteryCost] += 10;
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
    console.log('ROUND LOST!');
    roundLost(result);
  }

  return crimeRecursiveBattle(user, crime, result);
}
// end of recursive

function damageCalulator(user, crime) {
  // generates randomNumber, higher is worse
  let randomNumber = Math.floor(Math.random() * 6) + 3;

  // crimeSkill that matches crimetype, higher is better
  let crimeTypeDamage = user.playerStats[crime.crimeType];

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  let hackSkillDamage =
    Object.values(user.hackSkill).reduce((a, b) => a + b) / randomNumber;

  return Math.floor(x + y);
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

  // if user tried to do crimes way over his means
  if (crimeSkillNumber - userSkillNumber < 30) {
    return 0.05;
  }
  let probability = (userSkillNumber - crimeSkillNumber) / 100 + Math.random();
  console.log(probability, 'probability');
  return probability;
  // 200 - 150 + Math.random() / 100 ≈ 0.5 ~ 1.5
  // 100 - 30 + Math.random() / 100 ≈ 0.7 ~ 1.7
  // 30 - 90 + Math.random() / 100 ≈ -0.6 ~ 0.6
  // 60 - 60 + Math.random() / 100 ≈ 0 ~ 1
}

function crimeWin(result, crime, user) {
  // TODO
  // Write some math random stuff here
  // stash and legendary
  result.won = true;
  result.playerGains.exp = 10;
  result.gains.bitCoins = 20;
  result.gains.skillGained = crime.crimeType;
  result.gains.skillGained = ''; // function
  result.gains.legendaryGained = ''; // function
  return result;
}

module.exports = { crimeRouteCriterias, fightCrime };
