const {
  batteryCheck,
  existingValue,
  checkFunds
} = require('../middlewares/middleHelpers');

function getCityRouteCriterias(cities) {
  console.log('getCityRouteCriterias');

  if (!existingValue(cities)) {
    return "Cities doesn't exist";
  }

  return null;
}

// one function to run them all
function changeCityRouteCriterias(user, newCity, oldCity, batteryCost) {
  console.log('changeCityRouteCriterias');

  if (!existingValue(user)) {
    return "User doesn't exist";
  }

  if (!existingValue(newCity)) {
    return "Arrival city doesn't exist";
  }

  // if (!existingValue(oldCity)) {
  //   return "Departure city doesn't exist";
  // }

  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }

  if (!checkFunds(user.playerStats.bitCoins, newCity.price)) {
    return 'Insufficent money';
  }

  if (!checkSameCity(oldCity.name, newCity.name)) {
    return 'Your VPN is already set to this city';
  }
  return null;
}

function checkSameCity(currentCityName, newCityName) {
  console.log('checkSameCity triggered', ...arguments);
  return currentCityName !== newCityName;
}

module.exports = { getCityRouteCriterias, changeCityRouteCriterias };
