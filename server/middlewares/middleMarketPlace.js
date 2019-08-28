// todo, export and require functions for this and datacenter
// todo you messed up here check routes
function marketPlaceCriterias(user, opponent) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }

  if (!existingValue(opponent)) {
    return "Opponent doesn't exist";
  }

  if (!checkFunds(user.playerStats.bitCoins, bounty)) {
    return 'Insufficient funds';
  }

  if (
    checkSameValue(
      user.marketPlaceItems[item.type].toString(),
      item._id.toString()
    )
  ) {
    return `You already own this item`;
  }

  return null;
}

module.exports = { addBountyCriteria };
