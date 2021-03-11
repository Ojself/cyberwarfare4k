const { batteryCheck, checkOccuranceLimit } = require('./_helpers');

const config = {
  low: {
    chance: 0.55,
    multiplier: 0.9,
  },
  med: {
    chance: 0.7,
    multiplier: 1.05,
  },
  high: {
    chance: 0.85,
    multiplier: 1.3,
  },
  maxDamage: 40,
};

// Sees if everything is in order to perform attack
const isGraced = (opponent, now) => opponent.fightInformation.gracePeriod > now;

const fraudRouteCriteria = async (user, opponent, batteryCost, now) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (user.playerStats.rank < 1) {
    return 'You are too weak to fraud anyone';
  }
  if (!opponent) {
    return "Opponent doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (user.playerStats.currentFirewall < 1) {
    return 'You need a Firewall in order to fraud others';
  }
  if (user._id.toString() === opponent._id.toString()) {
    return 'You tried to fraud yourself for some reason...';
  }
  if (
    user.playerStats.city._id.toString()
    !== opponent.playerStats.city._id.toString()
  ) {
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

const attackRouteCriterias = async (user, opponent, batteryCost, now) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (user.playerStats.rank < 1) {
    return 'You are too weak to attack anyone';
  }
  if (!opponent) {
    return "Opponent doesn't exist";
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
  if (
    user.playerStats.city._id.toString()
    !== opponent.playerStats.city._id.toString()
  ) {
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

// Rock - paper - scissor concept
const getAttackValue = (attackWeapon, defendWeapon, type = 'chance') => {
  if (attackWeapon === defendWeapon) return config.med[type];
  if (attackWeapon === 'CPU' && defendWeapon === 'AntiVirus') { return config.high[type]; }
  if (attackWeapon === 'AntiVirus' && defendWeapon === 'Encryption') { return config.high[type]; }
  if (attackWeapon === 'Encryption' && defendWeapon === 'CPU') { return config.high[type]; }
  return config.med[type];
};

const attackRecursiveBattle = (result) => {
  // hack lost
  // if user has lost 4 times, the hack is considered lost
  if (checkOccuranceLimit(result.roundResult, 'lost', 4)) {
    return result;
  }

  // SUCCESS
  if (checkOccuranceLimit(result.roundResult, 'win', 4)) {
    const newResult = result;
    newResult.won = true;

    // kills a bodyguard
    if (newResult.opponent.playerStats.bodyguards.alive.length) {
      const firstBg = newResult.opponent.playerStats.bodyguards.alive[0];

      // Wounds a bodyguard
      if (firstBg > 50) {
        newResult.bodyguardAttacked = true;
        // kills a bodyguard
      } else {
        newResult.bodyguardKilled = true;
      }
      // Inflicts damage upon player
    } else {
      const attackWeapon = result.user.hackSkill[result.user.fightInformation.equippedWeapon];
      const defenseWeapon = result.user.hackSkill[result.user.fightInformation.equippedWeapon];

      const multiplier = getAttackValue(
        attackWeapon,
        defenseWeapon,
        'multiplier',
      );

      const rankPower = (result.user.playerStats.rank + 1) * 1.5;
      const attackPower = attackWeapon * multiplier * 0.1;

      const max = rankPower + attackPower;
      const min = max * 0.85;
      let damageDealt = Math.round(Math.random() * (max - min) + min);

      // To prevent extreme damage
      if (damageDealt > config.maxDamage) {
        damageDealt = config.maxDamage;
      }
      if (damageDealt <= 0) {
        damageDealt = 1;
      }

      // check if opponent is dead
      newResult.victimDead = newResult.opponent.playerStats.currentFirewall - newResult.damageDealt <= 0;

      if (newResult.victimDead) {
        const maxExp = (attackPower + newResult.opponent.playerStats.rank) * 5000;
        const minExp = maxExp * 0.85;
        const expGained = Math.round(
          Math.random() * (maxExp - minExp) + minExp,
        );
        newResult.playerGains.exp = expGained;
      }

      newResult.damageDealt = damageDealt;
    }
    return newResult;
  }

  const attackerWeapon = result.user.hackSkill[result.user.fightInformation.equippedWeapon];
  const defenderWeapon = result.opponent.hackSkill[result.user.fightInformation.equippedWeapon];

  const chanceForAttack = getAttackValue(attackerWeapon, defenderWeapon);

  // round win
  if (chanceForAttack > Math.random()) {
    result.roundResult.push('win');
  } else {
    result.roundResult.push('lost');
  }

  return attackRecursiveBattle(result);
};
// end of recursive

const fightHacker = async (user, opponent, batteryCost, now, userIsOnline) => {
  const result = {
    user,
    opponent,
    now,
    roundResult: [], // 'win', 'lost', 'lost'
    damageDealt: 0,
    won: false,
    victimDead: false,
    bodyguardKilled: false,
    bodyguardAttacked: false,
    playerGains: {
      batteryCost,
      exp: 0,
    },
  };
  const finalResult = attackRecursiveBattle(result);

  user.handleAttack(finalResult);
  const gracePeriodExtra = userIsOnline ? 1000 * 60 * 5 : 1000 * 60 * 60;
  await opponent.handleAttackDefense(finalResult, now + gracePeriodExtra);

  return finalResult;
};

const fraudGenerator = (result) => {
  // hack lost
  // if user has lost 4 times, the hack is considered lost
  let bitCoinStolen = 0;
  for (let i = 0; i < 4; i += 1) {
    let chanceForSuccess = Object.values(result.user.crimeSkill).reduce(
      (acc, curr) => acc + curr,
      0,
    ) / 100;
    if (chanceForSuccess > 0.9) {
      chanceForSuccess = 0.9;
    }

    if (chanceForSuccess > Math.random()) {
      const multiplier = 1 + result.user.playerStats.rank;
      const rng = Math.random() * (multiplier - multiplier / 2) + multiplier / 2;
      const percentage = rng / 100;
      bitCoinStolen += Math.floor(
        percentage * result.opponent.playerStats.bitCoins,
      );
    }
  }

  if (bitCoinStolen > 0) {
    result.won = true;
    result.playerGains.bitCoinStolen = bitCoinStolen;
  }
  return result;
};

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

module.exports = {
  attackRouteCriterias,
  fightHacker,
  fraudRouteCriteria,
  fraudHacker,
};
