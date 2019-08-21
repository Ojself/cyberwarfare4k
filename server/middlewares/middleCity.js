const {
  batteryCheck,
  existingValue,
  checkFunds
} = require('../middlewares/middleHelpers');

// one function to run them all
function changeCityRouteCriterias(user, newCity, oldCity, batteryCost) {
  console.log('changeCityRouteCriterias');

  if (!existingValue(user)) {
    return "User doesn't exist";
  }

  if (!existingValue(newCity)) {
    return "Arrival city doesn't exist";
  }

  if (!existingValue(oldCity)) {
    return "Departure city doesn't exist";
  }

  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }

  if (!checkFunds(user.playerStats.bitcoin, newCity.price)) {
    return 'Insufficent money';
  }

  if (!checkSameCity(user.playerStats.bitcoin, newCity.price)) {
    return 'Your VPN is already set to this city';
  }
  return null;
}

function checkSameCity(currentCity, newCity) {
  console.log('checkSameCity triggered', arguments);
  return currentCity !== newCity;
}

module.exports = { changeCityRouteCriterias };
