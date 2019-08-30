const {
  batteryCheck,
  existingValue,
  checkOccuranceLimit
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to perform attack
function attackRouteCriterias(user, opponent, batteryCost) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(opponent)) {
    return "Crime doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!checkCityandLevel(user, opponent)) {
    return `All traffic from ${user.playerStats.city} is blocked. Try changing VPN or level up!`;
  }
  if (!checkSuicide(user, opponent)) {
    return `You can't hack yourself..`;
  }
  if (!graceCheck(opponent)) {
    return `${opponent.name} is currently graced, try again later!`;
  }
  if (!checkHealth(user)) {
    return `You need a firewall in order to attack others`;
  }
  if (!checkHealth(opponent)) {
    return `You can't kill what is already dead`;
  }
  return null;
}

function fightHacker(user, opponent, batteryCost) {
  const result = {
    user,
    opponent,
    date: Date.now(),
    roundResult: [],
    roundopponentRemainingHp: [],
    hackerHp: opponent.currentFirewall,
    won: false,
    opponentDead: false,
    playerGains: {
      levelUp: false,
      batteryCost: batteryCost,
      exp: 0,
      bitcoins: 0,
      opponentCurrency: opponent.currencies
    }
  };
  const finalResult = attackRecursiveBattle(user, crime, result);

  // sees if player leveled up
  //TODO check if this is the same in other middleware
  if (
    user.playerStats.exp + finalResult.playerGains.exp >=
    user.playerStats.expToLevel
  ) {
    finalResult.playerGains.levelUp = true;
    user.newRank();
  }

  /* if won, do this, else do something else? */

  opponent.handleAttackDefense(finalResult);
  user.handleAttack(finalResult);

  return finalResult;
}

/*  TODO explanation here!! */
function attackRecursiveBattle(user, opponent, result) {
  // crime lost
  // if user has lost 4 times, the crime is considered lost
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    console.log('ATTACK LOST!');
    result.playerGains.batteryCost += 10;
    return result;
  }

  // crime win
  // todo, calculate reward
  if (result.hackerHp <= 0) {
    console.log('ATTACK WIN!');
    // WRITE ATTACK WIN
    return attackWin(result, opponent, user);
  }

  // Encryption / blocked
  if (encryptionChecker(user)) {
    console.log('ROUND LOST! ENCRYPTED');
    roundLost(result);
  }

  let attackNumber = attackCalulator(user);
  let defenseNumber = defenseCalulator(opponent);

  if (attackNumber < defenseNumber) {
    console.log('ROUND LOST!');
    return attackRecursiveBattle(user, opponent, result);
  }

  // round win
  if (attackNumber > defenseNumber) {
    console.log('ROUND WIN!');
    //TODO attacknumber instead?
    roundWin(result, defenseNumber);
  }

  return crimeRecursiveBattle(user, crime, result);
}
// end of recursive

function attackCalulator(opponent) {
  // generates randomNumber, higher is worse
  let randomNumber = Math.floor(Math.random() * 6) + 3;

  // cpu skill of attacker
  let cpuDamage = attacker.hackSkill.cpu;

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  let hackSkillDamage =
    Object.values(attacker.hackSkill).reduce((a, b) => a + b) / randomNumber;

  return Math.floor(cpuDamage + hackSkillDamage);
}

function defenseCalulator(defender) {
  // generates randomNumber, higher is worse
  let randomNumber = Math.floor(Math.random() * 6) + 3;

  // avs skill of defender
  let avsDefense = defender.hackSkill.antiVirus;

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  let hackSkillDamage =
    Object.values(defender.hackSkill).reduce((a, b) => a + b) / randomNumber;

  return Math.floor(avsDefense + hackSkillDamage);
}

// returns Boolean to see if attacker was encrypted / blocked by the attack
function encryptionChecker(attacker, defender) {
  let randomNumber = Math.random();
  let decider;

  // encryption skills for both players
  let encryptionAttacker = attacker.hackSkill.encryption;
  let encryptionDefender = defender.hackSkill.encryption;

  // If attacker has high encryption, gives him 75% of success
  encryptionAttacker > encryptionDefender ? (decider = 0.25) : (decider = 0.75);
  console.log(decider, randomNumber, decider > randomNumber, 'encryptioncheck');
  return randomNumber > decider;
}

function roundWin(result, damage) {
  result.hackerHp -= damage;
  result.roundResult.push('win');
  result.roundopponentRemainingHp.push(result.crimeHp);
  return result;
}

function roundLost(result) {
  result.roundResult.push('lost');
  result.hackerHp.push(result.hackerHp);
  return result;
}

function attackWin(result, crime, user) {
  // TODO
  // Write some math random stuff here
  result.won = true;
  result.playerGains.exp = 10;
  result.gains.bitCoins = 20;

  return result;
}

// checks if opponent is graced and therefor invincible
function graceCheck(opponent) {
  return !opponent.attackInformation.gracePeriod;
}

// checks if user is in same city, and if not, at least level 5
function checkCityandLevel(user, opponent) {
  return (
    user.playerStats.city === opponent.playerStats.city ||
    opponent.playerStats.rank >= 5
  );
}

function checkHealth(player) {
  return !!player.playerStats.currentFirewall;
}

// checks if you're attacking yourself
// todo this function exist somewhere else
function checkSuicide(user, opponent) {
  return user.name === opponent.name;
}

module.exports = { crimeRouteCriterias, fightCrime };
