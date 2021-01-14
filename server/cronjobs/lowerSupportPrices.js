/* Lowers the repair prices and bodyguard prices with 10 % */

const User = require('../models/User');

const lowerSupportPricesInterval = async () => {
  const users = await User.find({ 'account.isSetup': true });
  users.forEach((user) => {
    user.playerStats.bodyguards.price *= 0.9;
    if (user.playerStats.bodyguards.price < 100000) {
      user.playerStats.bodyguards.price = 100000;
    }
    user.playerStats.repairCost *= 0.9;
    if (user.playerStats.repairCost < 50000) {
      user.playerStats.repairCost = 50000;
    }
  });
  await Promise.all(users.map((user) => user.save()));
};

module.exports = lowerSupportPricesInterval;
