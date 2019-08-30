const { existingValue, checkFunds } = require('../middlewares/middleHelpers');

// Sees if everything is in order to add bounty
function addBountyCriteria(user, opponent, bounty) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(opponent)) {
    return "Opponent doesn't exist";
  }
  if (!checkFunds(user.playerStats.bitCoins, bounty)) {
    return 'Insufficent money';
  }
  return null;
}

module.exports = { addBountyCriteria };
