const {
  batteryCheck,
  existingValue,
  checkFunds
} = require('../middlewares/middleHelpers');

// one function to run them all
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
