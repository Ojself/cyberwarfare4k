const {
  checkFunds,
} = require('./middleHelpers');

const isUserFullHealth = (user) => user.playerStats.currentFirewall !== user.playerStats.maxFirewall;

// Sees if everything is in order to perform repair crime
const repairRouteCriterias = (user, repairCost) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!checkFunds(user.playerStats.bitCoins, repairCost)) {
    return 'Insufficient funds';
  }
  if (!isUserFullHealth(user)) {
    return 'Your computer is already working just fine!';
  }
  return null;
};

module.exports = { repairRouteCriterias };
