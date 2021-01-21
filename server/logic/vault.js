const { generateNotification } = require('./_helpers');
const User = require('../models/User');

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
    console.log('No spy found');
    return;
  }

  const success = spyInAction.bitCoinSpent > opponent.playerStats.vault;

  if (success) {
    console.log('success');
    const spyInformation = getSpyInfo(opponent);
    generateNotification(userId, spyInformation, 'Spy Report');
  } else {
    const failMessage = `You failed to spy on ${opponent.name}`;
    generateNotification(userId, failMessage, 'Spy Report');
    const warningMessage = `${user.name} failed to spy on you with ${spyInAction.bitCoinSpent} bitcoins`;
    generateNotification(opponentId, warningMessage, 'Spy Report');
    opponent.vaultDrain(spyInAction.bitCoinSpent);
    await opponent.save();
  }
};

// missing users
// missing input
// sufficent money in vault
const sendSpyCriteria = (user, opponent, bitCoinSpent) => null;

// missing users
// timed out or less than 3 seconds
// existing

const cancelSpyCriteria = (user, id) => null;

module.exports = {
  depositCriteria, handleSpy, sendSpyCriteria, cancelSpyCriteria, attachRemainingTimeToSpiesAndFilter,
};
