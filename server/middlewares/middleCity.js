const {
  batteryCheck,
  existingValue,
  checkFunds,
  checkSameValue
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

  if (!checkSameValue(oldCity.name, newCity.name)) {
    return 'Your VPN is already set to this city';
  }
  return null;
}

function changeCity(user, newCity, oldCity, batteryCost) {
  newCity.arrival(user._id);
  user.changeCity(newCity, batteryCost);
  oldCity.departure(user._id);
}

module.exports = {
  getCityRouteCriterias,
  changeCityRouteCriterias,
  changeCity
};
