const User = require('../models/User');

const subscriptionBonus = {
  Bronze: { battery: 7, max: 150 },
  Silver: { battery: 8, max: 175 },
  Gold: { battery: 10, max: 200 },
  default: { battery: 6, max: 100 },
};

/* Ensures that users gets more battery after cetain time and never exceeds 100 */
const batteryInterval = async () => {
  const users = await User.find({ 'account.isSetup': true });
  users.forEach((user) => {
    const { subscription } = user.account || 'default';
    const githubBonus = user.earnBattery.githubStar ? 1 : 0;
    user.playerStats.battery += subscriptionBonus[subscription].battery + githubBonus;
    if (user.playerStats.battery > subscriptionBonus[subscription].max) {
      user.playerStats.battery = subscriptionBonus[subscription].max;
    }
  });
  await Promise.all(users.map((user) => user.save()));
};

module.exports = batteryInterval;
