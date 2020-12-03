const {
  batteryCheck,
  existingValue,
} = require('./middleHelpers');

// Sees if everything is in order to get cities
const getCityRouteCriterias = (cities) => {
  if (!existingValue(cities)) {
    return "Cities doesn't exist";
  }
  return null;
};

// Sees if everything is in order to change city
const changeCityRouteCriterias = (user, newCity, oldCity, batteryCost) => {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!newCity) {
    return "Arrival city doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (user.playerStats.bitCoins < newCity.price) {
    return 'Insufficient funds';
  }
  if (oldCity.name === newCity.name) {
    return 'Your VPN is already set to this city';
  }
  return null;
};

module.exports = {
  getCityRouteCriterias,
  changeCityRouteCriterias,
};
