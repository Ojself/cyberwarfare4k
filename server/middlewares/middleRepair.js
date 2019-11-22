const {
  batteryCheck,
  existingValue,
  checkFunds,
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to perform repair crime
function repairRouteCriterias(user, repairCost) {
  console.log('repairRouteCriterias');
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  /* if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  } */
  if (!checkFunds(user.playerStats.bitCoins, repairCost)) {
    return 'Insufficient funds';
  }
  if (!checkFullHealth(user)) {
    return 'Your computer is already working just fine!';
  }
  return null;
}

function checkFullHealth(user) {
  console.log('checkFullHealth triggered', ...arguments);
  return user.playerStats.currentFirewall !== user.playerStats.maxFirewall;
}

module.exports = { repairRouteCriterias };
