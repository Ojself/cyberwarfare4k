const {
  batteryCheck,
  checkOccuranceLimit,
} = require('./middleHelpers');

// Sees if everything is in order to perform attack
const isGraced = (opponent, now) => opponent.fightInformation.gracePeriod > now;

const fraudRouteCriteria = async (user, opponent, batteryCost, now, userIsOnline) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (user.playerStats.rank < 1) {
    return 'You are too weak to fraud anyone';
  }
  if (!opponent) {
    return "Opponent doesn't exist";
  }
  /* restarts counter if opponent is online after being graced for more than five minutes */
  const userIsGracedMoreThanFiveMinuts = isGraced(opponent, (now + (1000 * 60 * 5)));
  if (userIsOnline && userIsGracedMoreThanFiveMinuts) {
    opponent.setGracePeriod(now + (1000 * 60 * 5));
    await opponent.save();
    return `${opponent.name} is currently graced, try again later!`;
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (user.playerStats.currentFirewall < 1) {
    return 'You need a Firewall in order to fraud others';
  }
  if (user._id.toString() === opponent._id.toString()) {
    return 'You tried to fraud yourself for some reason..';
  }
  if (user.playerStats.city._id.toString() !== opponent.playerStats.city._id.toString()) {
    return `${opponent.name} is not in your city. Try changing VPN!`;
  }
  if (opponent.playerStats.currentFirewall <= 0) {
    return "You can't fraud what is already dead";
  }
  if (opponent.playerStats.rank < 1) {
    return `${opponent.name} is too weak`;
  }
  if (isGraced(opponent, now)) {
    return `${opponent.name} is currently graced, try again later!`;
  }
  return null;
};

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
  if (userIsOnline && userIsGracedMoreThanFiveMinuts) {
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
    return `${opponent.name} is not in your city. Try changing VPN!`;
  }
  if (opponent.playerStats.currentFirewall <= 0) {
    return "You can't kill what is already dead";
  }
  if (opponent.playerStats.rank < 1) {
    return `${opponent.name} is too weak to be attacked`;
  }
  if (isGraced(opponent, now)) {
    return `${opponent.name} is currently graced, try again later!`;
  }
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
  console.log('attack start');
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
      const { CPU } = result.user.hackSkill;
      newResult.damageDealt = Math.round(Math.random() * (CPU * 0.15 - CPU * 0.10) + 0.10);
      // To prevent extreme damage
      if (newResult.damageDealt > 30) {
        newResult.damageDealt = 30;
      }
    }
    return newResult;
  }

  // Attacker gets blocked

  const chanceForBlocked = calculateBlockChance(result.user.hackSkill.Encryption, result.opponent.hackSkill.CPU);
  if (chanceForBlocked >= Math.random()) {
    result.roundResult.push('blocked');
    return attackRecursiveBattle(result);
  }

  /* const attackNumber = damageCalculator(result.user);
  const defenseNumber = defenseCalulator(result.opponent); */

  // round lost
  /* if (attackNumber <= defenseNumber) {
    const status = result.opponent.hackSkill.AntiVirus > result.opponent.hackSkill.Encryption ? 'lost' : 'blocked';
    result.roundResult.push(status);
    return attackRecursiveBattle(result);
  } */
  const chanceForAttack = primitiveCalculateAttackChance(result.user.hackSkill.CPU, result.opponent.hackSkill.AntiVirus);

  // round win
  if (chanceForAttack > Math.random()) {
    result.roundResult.push('win');
  } else {
    result.roundResult.push('lost');
  }

  return attackRecursiveBattle(result);
};
// end of recursive

/* const damageCalculator = (hacker) => {
  const { CPU, Encryption, AntiVirus } = hacker.hackSkill;
  const max = (CPU * CPU) / (AntiVirus + Encryption);
  const min = max / 3;

  const damageNumber = Math.random() * (max - min) + min;
  return Math.round(damageNumber);
};

 const defenseCalulator = (hacker) => {
  const { CPU, AntiVirus } = hacker.hackSkill;
  const max = AntiVirus / CPU;
  const min = max / 3;

  const defenseNumber = Math.random() * (max - min) + min;
  return Math.round(defenseNumber);
};

// deprecated
 const blockCalculator = (hacker) => {
  const { CPU, Encryption, AntiVirus } = hacker.hackSkill;
  const max = (Encryption * Encryption) / (CPU + AntiVirus);
  const min = max / 3;
  const encryptionNumber = Math.random() * (max - min) + min;
  return Math.round(encryptionNumber);
}; */

/* const fraudCalculator = (hacker) => {
  const crimeSkill = Object.values(hacker.crimeSkill).reduce((acc, cur) => acc + cur, 0);
  const { CPU, Encryption } = hacker.hackSkill;

  const max = (crimeSkill * crimeSkill) / (CPU + Encryption);
  const min = max / 3;

  const fraudDamage = Math.random() * (max - min) + min;
  return Math.round(fraudDamage);
}; */

const fraudHacker = (user, opponent, batteryCost, now) => {
  const result = {
    user,
    opponent,
    now,
    won: false,
    playerGains: {
      bitCoinStolen: 0,
      batteryCost,
    },
  };
  const finalResult = fraudGenerator(result);

  user.handleFraud(finalResult);
  const gracePeriod = 1000 * 60 * 5;
  opponent.handleFraudDefense(finalResult, now + gracePeriod);

  return finalResult;
};

const fraudGenerator = (result) => {
  // hack lost
  // if user has lost 4 times, the hack is considered lost
  let bitCoinStolen = 0;
  for (let i = 0; i < 4; i += 1) {
    const attackInput = Object.values(result.user.crimeSkill).reduce((acc, curr) => acc + curr, 0) / 4;
    const defenseInput = (result.opponent.hackSkill.AntiVirus + result.opponent.hackSkill.Encryption) / 2;
    const chanceForSuccess = primitiveCalculateAttackChance(attackInput, defenseInput);
    /* const attackerChance = fraudCalculator(result.user);
    const opponentChance = fraudCalculator(result.opponent); */

    if (chanceForSuccess > Math.random()) {
      const multiplier = 1 + result.user.playerStats.rank;
      const rng = Math.random() * (multiplier - multiplier / 2) + (multiplier / 2);
      const percentage = rng / 100;
      bitCoinStolen += Math.floor(percentage * result.opponent.playerStats.bitCoins);
    }
  }

  if (bitCoinStolen > 0) {
    result.won = true;
    result.playerGains.bitCoinStolen = bitCoinStolen;
  }
  return result;
};

// returns between 0.05 and 0.95
const calculateBlockChance = (defenseStat, attackStat) => {
  const x = defenseStat / attackStat;
  const a = 6 * Math.sqrt(5 / 19999);
  const b = 13639 / 72000;
  return a * Math.sqrt(x + b);
};

const primitiveCalculateAttackChance = (attackSkill, opponentSkill) => {
  const probability = attackSkill / (opponentSkill * 1.125);
  if (probability >= 0.90) {
    return 0.90;
  }
  if (probability < 0.05) {
    return 0.05;
  }
  return probability;
};

module.exports = {
  attackRouteCriterias, fightHacker, fraudRouteCriteria, fraudHacker,
};
