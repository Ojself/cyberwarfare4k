const { generateNotification } = require('./_helpers');
const User = require('../models/User');

const config = {
  minimumSendSpyAmount: 100000,
};

const depositCriteria = (user, amount) => {
  if (!user) {
    return 'Something went wrong';
  }
  if (!amount) {
    return 'Missing input';
  }
  if (amount < 0) {
    return 'You can\'t withdraw from the vault';
  }
  if (amount > user.playerStats.bitCoins) {
    return 'You can\'t deposit money you don\'t have..';
  }
  return null;
};

const attachRemainingTimeToSpiesAndFilter = (spies, now) => {
  const updatedSpies = spies
    .filter((spy) => spy.arrives.getTime() > now)
    .map((spy) => {
      const timeLeft = Math.round((spy.arrives.getTime() - now) / 1000);
      spy.timeLeft = timeLeft;
      return spy;
    });
  return updatedSpies;
};

const getSpyInfo = (opponent) => {
  const information = [];
  const { playerStats } = opponent;
  const bgs = playerStats.bodyguards.alive.length;
  information.push(`${opponent.name} is currently in ${playerStats.city.name}`);
  information.push(`Weapon equipped: ${opponent.fightInformation.equippedWeapon}`);
  information.push(`Bitcoins on hand: ${playerStats.bitCoins}`);
  information.push(`${playerStats.currentFirewall} HP and ${bgs} bodyguard${bgs === 1 ? '' : 's'}`);
  return information;
};

const handleSpy = async (userId, opponentId, id) => {
  const user = await User.findById(userId).lean();
  const opponent = await User.findById(opponentId)
    .populate('playerStats.city', 'name');

  const spyInAction = user.fightInformation.activeSpies.find((spy) => spy.id === id);
  if (!spyInAction) {
    console.info(`User: ${user.name} - No spy found`);
    return;
  }

  const success = spyInAction.bitCoinSpent > opponent.playerStats.vault;

  if (success) {
    const spyInformation = getSpyInfo(opponent);
    generateNotification(userId, spyInformation, 'Spy Report');
  } else {
    const failMessage = `You failed to spy on ${opponent.name} with ${spyInAction.bitCoinSpent} bitcoins`;
    generateNotification(userId, failMessage, 'Spy Report');
    const warningMessage = `${user.name} failed to spy on you with ${spyInAction.bitCoinSpent} bitcoins`;
    opponent.vaultDrain(spyInAction.bitCoinSpent);
    generateNotification(opponentId, warningMessage, 'Spy Report');
    await opponent.save();
  }
};

const sendSpyCriteria = (user, opponent, bitCoinSpent) => {
  if (!user || !opponent) {
    return 'Something went wrong..';
  }
  if (!bitCoinSpent) {
    return 'Missing input';
  }
  if (bitCoinSpent > user.playerStats.vault) {
    return 'You have insufficent bitcoins in your vault';
  }
  if (bitCoinSpent < config.minimumSendSpyAmount) {
    return `Minimum amount is ${config.minimumSendSpyAmount}`;
  }
  if (user._id.toString() === opponent._id.toString()) {
    return 'You tried to spy on yourself, but failed';
  }
  return null;
};

const cancelSpyCriteria = (user, id, now) => {
  if (!user || !id) {
    return 'Something went wrong..';
  }
  const spy = user.fightInformation.activeSpies.find((s) => s.id === id);
  if (!spy) {
    return 'This spy doesn\'t exist';
  }
  if (now > spy.arrives) {
    return 'This spy is inactive';
  }

  return null;
};

module.exports = {
  depositCriteria, handleSpy, sendSpyCriteria, cancelSpyCriteria, attachRemainingTimeToSpiesAndFilter,
};
