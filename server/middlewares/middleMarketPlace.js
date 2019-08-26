// todo, export and require functions for this and datacentre

function marketPlaceCriteria(item, user) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }

  if (!existingValue(item)) {
    return "Item doesn't exist";
  }

  if (!checkFunds(user.playerStats.bitCoins, item.price)) {
    return 'Insufficent money';
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
