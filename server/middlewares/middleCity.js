const {
  batteryCheck,
  existingValue,
  checkFunds,
  checkSameValue,
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to get cities
function getCityRouteCriterias(cities) {
  if (!existingValue(cities)) {
    return "Cities doesn't exist";
  }
  return null;
}

// Sees if everything is in order to change city
function changeCityRouteCriterias(user, newCity, oldCity, batteryCost) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(newCity)) {
    return "Arrival city doesn't exist";
  }

  // if (!existingValue(oldCity)) {
  //   return "Departure city doesn't exist";
  // }

  if (!existingValue(batteryCost)) {
    return "Batterycost doesn't exist";
  }

  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (!checkFunds(user.playerStats.bitCoins, newCity.price)) {
    return 'Insufficient funds';
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
  changeCity,

};
