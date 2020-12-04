const {
  batteryCheck,
  checkOccuranceLimit,
} = require('./middleHelpers');

// Sees if everything is in order to perform attack
const isGraced = (opponent, now) => opponent.fightInformation.gracePeriod > now;

const attackRouteCriterias = async (user, opponent, batteryCost, now, userIsOnline) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (user.playerStats.rank < 1) {
    return 'You are too weak to attack anyone';
  }
  if (!opponent) {
    return "Opponent doesn't exist";
  }
  /* restarts counter if opponent is online after being graced for more than five minutes */
  const userIsGracedMoreThanFiveMinuts = isGraced(opponent, (now + (1000 * 60 * 5)));
  /* if (userIsOnline && userIsGracedMoreThanFiveMinuts) {
    opponent.setGracePeriod(now + (1000 * 60 * 5));
    await opponent.save();
    return `${opponent.name} is currently graced, try again later!`;
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (user.playerStats.currentFirewall < 1) {
    return 'You need a Firewall in order to attack others';
  }
  if (user._id.toString() === opponent._id.toString()) {
    return 'You try to commit sudoku, but failed';
  }
  if (user.playerStats.city._id.toString() !== opponent.playerStats.city._id.toString()) {
    return `All traffic from ${user.playerStats.city.name} is blocked. Try changing VPN!`;
  }
  if (opponent.playerStats.currentFirewall <= 0) {
    return "You can't kill what is already dead";
  }
  if (opponent.playerStats.rank < 1) {
    return `${opponent.name} is too weak to be attacked`;
  }
  if (isGraced(opponent, now)) {
    return `${opponent.name} is currently graced, try again later!`;
  } */
  return null;
};

const fightHacker = (user, opponent, batteryCost, now, userIsOnline) => {
  const result = {
    user,
    opponent,
    now,
    roundResult: [], // 'win', 'blocked', 'lost', 'lost'
    damageDealt: 0,
    won: false,
    victimDead: false,
    bodyguardKilled: false,
    playerGains: {
      batteryCost,
    },
  };
  const finalResult = attackRecursiveBattle(result);

  // check if opponent is dead
  finalResult.victimDead = opponent.playerStats.currentFirewall - finalResult.damageDealt <= 0;

  user.handleAttack(finalResult);
  const gracePeriodExtra = userIsOnline ? 1000 * 60 * 5 : 1000 * 60 * 60;
  opponent.handleAttackDefense(finalResult, now + gracePeriodExtra);

  return finalResult;
};

const attackRecursiveBattle = (result) => {
  // hack lost
  // if user has lost 4 times, the hack is considered lost
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    return result;
  }

  // hack lost
  // if user has been encrypted/blocked 4 times, the hack is considered lost
  if (checkOccuranceLimit(result.roundResult, 'blocked', 4)) {
    return result;
  }

  // SUCCESS
  if (checkOccuranceLimit(result.roundResult, 'win', 4)) {
    const newResult = result;
    newResult.won = true;
    // kills a bodyguard
    if (newResult.opponent.playerStats.bodyguards.alive > 0) {
      newResult.bodyguardKilled = true;
    } else {
      const maxDamage = result.user.hackSkill.CPU / 3;
      const minDamage = result.user.hackSkill.CPU / 5;
      newResult.damageDealt = Math.round(Math.random() * (maxDamage - minDamage) + minDamage);
      // To prevent extreme damage
      if (newResult.damageDealt > 30) {
        newResult.damageDealt = 30;
      }
    }
    return newResult;
  }

  const opponentEncryption = Math.random() * result.opponent.hackSkill.Encryption;
  const userEncryption = Math.random() * result.user.hackSkill.Encryption;

  // Attacker gets blocked
  if (opponentEncryption > userEncryption) {
    result.roundResult.push('blocked');
    return attackRecursiveBattle(result);
  }

  const attackNumber = damageCalculator(result.user);
  const defenseNumber = defenseCalulator(result.opponent);

  // round lost
  if (attackNumber <= defenseNumber) {
    result.roundResult.push('lost');
    return attackRecursiveBattle(result);
  }

  // round win
  if (attackNumber > defenseNumber) {
    result.roundResult.push('win');
  }

  return attackRecursiveBattle(result);
};
// end of recursive

const damageCalculator = (hacker) => {
  // generates randomNumber, higher is worse
  const randomNumber = Math.random() * 6 + 3;

  // CPU skill of hacker/attacker
  const cpuSkill = hacker.hackSkill.CPU;

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  const hackSkillAverage = Object.values(hacker.hackSkill).reduce((a, b) => a + b) / randomNumber;

  const damageNumber = cpuSkill + hackSkillAverage;

  return Math.round(damageNumber);
};

const defenseCalulator = (hacker) => {
  // generates randomNumber, higher is worse
  const randomNumber = Math.random() * 6 + 3;

  // Defense (antivirus)
  const cpuSkill = hacker.hackSkill.AntiVirus;

  // summarized hackingskills divided by randomnumber. Higher is better (not the randomNumber)
  const hackSkillAverage = Object.values(hacker.hackSkill).reduce((a, b) => a + b) / randomNumber;

  const defenseNumber = cpuSkill + hackSkillAverage;

  return Math.round(defenseNumber);
};

module.exports = { attackRouteCriterias, fightHacker };
