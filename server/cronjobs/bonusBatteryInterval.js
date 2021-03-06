const User = require('../models/User');

const subscriptionBonus = {
  Bronze: { battery: 1, max: 175 },
  Silver: { battery: 2, max: 200 },
  Gold: { battery: 3, max: 250 },
  Platinum: { battery: 4, max: 300 },
};

/* Ensures that users gets more battery after cetain time and never exceeds 100 */
const bonusBatteryInterval = async () => {
  const users = await User.find({
    $or: [
      { 'account.subscription': 'Bronze' },
      { 'account.subscription': 'Silver' },
      { 'account.subscription': 'Gold' },
      { 'account.subscription': 'Platinum' },
      { 'earnBattery.githubStar': true },
    ],
  });
  users.forEach((user) => {
    let { subscription } = user.account;
    if (!subscription) subscription = 'Bronze';
    const githubBonus = user.earnBattery.githubStar ? 1 : 0;
    const totalBonus = subscriptionBonus[subscription].battery + githubBonus;
    if (user.playerStats.battery + totalBonus <= subscriptionBonus[subscription].max) {
      user.playerStats.battery += totalBonus;
    }
  });
  await Promise.all(users.map((user) => user.save()));
};

module.exports = bonusBatteryInterval;
