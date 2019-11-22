// todo, export and require functions for this and datacenter
// todo you messed up here check routes
const {
  checkFunds,
  checkSameValue,
  existingValue,
} = require('../middlewares/middleHelpers');

// Sees if everything is in order to buy item
function marketPlaceCriterias(user, item) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(item)) {
    return "Opponent doesn't exist";
  }
  if (!checkFunds(user.playerStats.bitCoins, item.price)) {
    return 'Insufficient funds';
  }
  // stringify because tostring of null doesn't work
  if (
    !checkSameValue(
      JSON.stringify(user.marketPlaceItems[item.type]),
      JSON.stringify(item._id),
    )
  ) {
    return 'You already own this item';
  }
  return null;
}

module.exports = { marketPlaceCriterias };
