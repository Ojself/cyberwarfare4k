const marketPlaceCriterias = (user, item) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!item) {
    return "Opponent doesn't exist";
  }
  if (user.playerStats.bitCoins < item.price) {
    return 'Insufficient funds';
  }
  if (JSON.stringify(user.marketPlaceItems[item.type]) === JSON.stringify(item._id.toString())) {
    return 'You already own this item';
  }
  return null;
};

module.exports = { marketPlaceCriterias };
