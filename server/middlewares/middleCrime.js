const {
  batteryCheck,
  existingValue,
  checkOccuranceLimit
} = require("../middlewares/middleHelpers");

// Sees if everything is in order to perform crime

//todo do this try catch instead.
function crimeRouteCriterias(crime, user, batteryCost) {
  if (!batteryCheck(user, batteryCost)) {
    return "Insufficent battery";
  }
  if (!crime.available) {
    return "This crime is not available at the moment";
  }
  return null;
}

async function fightCrime(user, crime, batteryCost) {
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
      bitCoins: 0,
      skillGained: null,
      stashGained: null,
      legendaryGained: null
    }
  };
  const finalResult = crimeRecursiveBattle(user, crime, result);

  // sees if player leveled up
  if (
    user.playerStats.exp + finalResult.playerGains.exp >=
    user.playerStats.expToLevel
  ) {
    finalResult.playerGains.levelUp = true;
    console.log(user._id, "rankup");
  }

  if (user.account.role !== "testUser") {
    await user.handleCrime(finalResult);
    await crime.handleCrime(finalResult);
  }
  return finalResult;
}

// recursive function that runs until the hp of the crime is 0 or the user has lost 4 times
function crimeRecursiveBattle(user, crime, result) {
  const probability = chanceCalculator(user, crime);

  const damage = damageCalulator(user, crime);

  // the number that decides the success, lower is better
  const decider = Math.random();

  // crime lost
  // if user has lost 4 times, the crime is considered 'lost'
  // adds more battery as a penalty for lost crime
  if (checkOccuranceLimit(result.roundResult, "lost", 4)) {
    result.playerGains.batteryCost += 10;
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
}
// end of recursive

// sets the probability to succeed, higher is better
function chanceCalculator(user, crime) {
  const userSkillNumber = user.crimeSkill[crime.crimeType];
  const crimeSkillNumber = crime.difficulty;
  // if user tried to do crimes way over his level, give him 5% chance for success
  if (crimeSkillNumber - userSkillNumber > 30) {
    return 0.05;
  }
  const probability =
    (userSkillNumber - crimeSkillNumber) / 100 + Math.random();
  return probability;
}

//todo if user has 50 skill don't give him more skill in pettycrime

// calculates the 'damage' the user inflicts on the crime
//boils down the players crime and hacking skills and returns a randomnumber from 0 to x
function damageCalulator(user, crime) {
  const crimeTypeDamage = user.crimeSkill[crime.crimeType];
  const hackSkillDamage = Object.values(user.hackSkill).reduce((a, b) => a + b);
  return Math.round(Math.random() * (crimeTypeDamage + hackSkillDamage));
}

function roundWin(result, damage) {
  result.crimeHp -= damage;
  result.roundResult.push("win");
  result.roundCrimeRemainingHp.push(result.crimeHp);
  return result;
}

function roundLost(result) {
  result.roundResult.push("lost");
  result.roundCrimeRemainingHp.push(result.crimeHp);
  return result;
}

function crimeWin(result, crime, user, decider) {
  // TODO write legendaryGained

  result.won = true;
  result.playerGains.exp = crimeWinExp(crime.difficulty);
  result.playerGains.bitCoins = crimeWinBitcoins(crime.difficulty);
  result.playerGains.skillGained = skillGained(
    decider,
    user.playerStats.rank,
    crime.crimeType
  );
  result.playerGains.statGained = statGained(decider, user.playerStats.rank);
  result.playerGains.legendaryGained = "";
  return result;
}

function crimeWinBitcoins(multiplier) {
  return Math.floor(Math.random() * multiplier) * 1000;
}
function crimeWinExp(multiplier) {
  return Math.floor(Math.random() * multiplier) * 300; // TODO balance this one
}

// returns a skill based on luck and rank. Higher rank gives lower chance
function skillGained(decider, rank, crimeType) {
  if (rank === 0) {
    rank = 1;
  }
  if (Math.random() - rank / 14 < decider) {
    return null;
  }
  const crimeTypes = [
    "Technical",
    "Social Engineering",
    "Forensics",
    "Cryptography"
  ].filter(el => el !== crimeType);
  return crimeTypes[Math.floor(Math.random() * crimeTypes.length)];
}

// gives user statpoints based on luck and rank. Higher rank gives lower chance
function statGained(decider, rank) {
  if (rank === 0) {
    rank = 1;
  }
  if (Math.random() - rank / 8 < decider) {
    return null;
  }
  return true;
  //return Math.random() - (rank / 10) < decider
}

module.exports = {
  crimeRouteCriterias,
  crimeWin,
  fightCrime,
  chanceCalculator,
  damageCalulator,
  roundWin,
  roundLost
};
