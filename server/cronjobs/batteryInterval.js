const User = require('../models/User');

const subscriptionMaxBattery = {
  Bronze: 150,
  Silver: 175,
  Gold: 200,
  default: 100,
};

/* Ensures that users gets more battery after cetain time and never exceeds 100 */
const batteryInterval = async () => {
  const users = await User.find();
  users.forEach((user) => {
    let { subscription } = user.account;
    if (!subscription)subscription = 'default';

    user.playerStats.battery += 1;
    if (user.playerStats.battery > subscriptionMaxBattery[subscription]) {
      user.playerStats.battery = subscriptionMaxBattery[subscription];
    }
  });
  await Promise.all(users.map((user) => user.save()));
};

module.exports = batteryInterval;
