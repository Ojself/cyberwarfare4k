const {
  batteryCheck,
  existingValue,
  checkOccuranceLimit
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to perform attack
function attackRouteCriterias(user, opponent, batteryCost) {
  if (!existingValue(user)) { // todo, caught in the try catch
    return "User doesn't exist";
  }
  if (!existingValue(opponent)) {
    return "Crime doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!checkCityandLevel(user, opponent)) {
    // name doesn't show
    return `All traffic from ${user.playerStats.city.name} is blocked. Try changing VPN or level up!`;
  }
  if (!checkSuicide(user, opponent)) {
    return `You can't hack yourself..`;
  }
  if (!checkHealth(user)) {
    return `You need a firewall in order to attack others`;
  }
  if (!graceCheck(opponent)) {
    return `${opponent.name} is currently graced, try again later!`;
  }
  if (!checkHealth(opponent)) {
    return `You can't kill what is already dead`;
  }
  return null;
}

// checks if user is in same city, and if not, at least level 5
function checkCityandLevel(user, opponent) {
  const userCity = JSON.stringify(user.playerStats.city);
  const opponentCity = JSON.stringify(opponent.playerStats.city);
  return userCity === opponentCity || opponent.playerStats.rank >= 5;
}

// checks if you're attacking yourself
function checkSuicide(user, opponent) {
  return user.name !== opponent.name;
}

// checks if opponent is graced and therefor invincible
function graceCheck(opponent) {
  return !opponent.fightInformation.gracePeriod;
}

function checkHealth(player) {
  return player.playerStats.currentFirewall <= 0;
}

function fightHacker(user, opponent, batteryCost) {
  const result = {
    user,
    opponent,
    date: Date.now(),
    roundResult: [],
    roundVictimRemainingHp: [],
    roundHackerRemainingHp: [],
    victimHp: opponent.playerStats.currentFirewall,
    hackerHp: user.playerStats.currentFirewall,
    damageDealt: 0,
    won: false,
    victimDead: false,
    playerGains: {
      levelUp: false,
      batteryCost: batteryCost,
      exp: 10,
      bitCoins: 10,
      opponentCurrency: opponent.currencies
    }
  };
  const finalResult = attackRecursiveBattle(result);

  // sees if player leveled up
  if (
    user.playerStats.exp + finalResult.playerGains.exp >=
    user.playerStats.expToLevel
  ) {
    finalResult.playerGains.levelUp = true;
    user.newRank();
  }

  // check if opponent is dead
  if (opponent.playerStats.currentFirewall - finalResult.damageDealt <= 0) {
    finalResult.victimDead = true;
  }

  opponent.handleAttackDefense(finalResult);
  user.handleAttack(finalResult);

  return finalResult;
}

function attackRecursiveBattle(result) {
  // hack lost
  // if user has lost 4 times, the hack is considered lost
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    result.playerGains.batteryCost += 10;
    return result;
  }

  // hack lost
  // if user has been encrypted/blocked 4 times, the hack is considered lost
  if (checkOccuranceLimit(result.roundResult, 'encrypted', 4)) {
    result.playerGains.batteryCost += 10;
    return result;
  }

  // hack lost
  // attacker is dead
  if (result.hackerHp <= 0) {
    result.playerGains.batteryCost += 10;
    return result;
  }

  // hack win
  // victim is dead
  if (result.victimHp <= 0) {
    result.damageDealt = attackCalulator(result.user);
    return attackWin(result);
  }

  // Encryption / blocked
  // attacker got blocked
  if (encryptionChecker(result.user, result.opponent)) {
    roundLost(result, 'encrypted');
    return attackRecursiveBattle(result);
  }

  let attackNumber = attackCalulator(result.user);
  let defenseNumber = defenseCalulator(result.opponent);

  if (attackNumber <= defenseNumber) {
    roundLost(result, 'lost', defenseNumber);
    //return attackRecursiveBattle(result);
  }

  // round win
  if (attackNumber > defenseNumber) {
    roundWin(result, attackNumber);
  }

  return attackRecursiveBattle(result);
}
// end of recursive

function attackCalulator(hacker) {
  // generates randomNumber, higher is worse
  const randomNumber = Math.random() * 6 + 3;

  // cpu skill of hacker/attacker
  const cpuDamage = hacker.hackSkill.cpu;

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  const hackSkillDamage =
    Object.values(hacker.hackSkill).reduce((a, b) => a + b) / randomNumber;

  let damageNumber = cpuDamage + hackSkillDamage;
  if (damageNumber > 30) {
    damageNumber = 30;
  }

  return Math.floor(damageNumber);
}

function defenseCalulator(victim) {
  // generates randomNumber, higher is worse
  const randomNumber = Math.random() * 6 + 3;

  // avs skill of victim
  const avsDefense = victim.hackSkill.antiVirus;

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  const hackSkillDamage =
    Object.values(victim.hackSkill).reduce((a, b) => a + b) / randomNumber;

  return Math.floor(avsDefense + hackSkillDamage);
}

// returns Boolean to see if hacker was encrypted / blocked by the attack
function encryptionChecker(attacker, victim) {
  // encryption skills for both players
  const encryptionAttacker =
    attacker.hackSkill.encryption / 1000 + Math.random();
  const encryptionVictim = victim.hackSkill.encryption / 1000 + Math.random();

  console.log(encryptionAttacker, encryptionVictim, 'jarle');

  return encryptionAttacker < encryptionVictim;
}

function roundWin(result, damage) {
  result.victimHp -= damage;
  result.roundResult.push('win');
  result.roundVictimRemainingHp.push(result.victimHp);
  result.roundHackerRemainingHp.push(result.hackerHp);
  return result;
}

function roundLost(result, instance, damage = 0) {
  result.hackerHp -= damage;
  result.roundResult.push(instance);
  result.roundVictimRemainingHp.push(result.victimHp);
  result.roundHackerRemainingHp.push(result.hackerHp);
  return result;
}

function attackWin(result) {
  // TODO
  // calculate gains
  result.won = true;
  result.playerGains.exp = 10;
  result.playerGains.bitCoins = 20;

  return result;
}

module.exports = { attackRouteCriterias, fightHacker };
