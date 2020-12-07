const User = require('../models/User');

const subscriptionBonus = {
  Bronze: { battery: 1, max: 150 },
  Silver: { battery: 2, max: 175 },
  Gold: { battery: 3, max: 200 },
  Platinum: { battery: 4, max: 200 },
};

/* Ensures that users gets more battery after cetain time and never exceeds 100 */
const bonusBatteryInterval = async () => {
  const users = await User.find({
    $or: [
      { "account.subscription": "Bronze" },
      { "account.subscription": "Silver" },
      { "account.subscription": "Gold" },
      { "account.subscription": "Platinum" },
      { "earnBattery.githubStar": true },
    ],
  });
  console.log(users.length,'length')
  users.forEach((user) => {
    const { subscription } = user.account || 'Bronze';
    console.log(subscription, "subscription");
    const githubBonus = user.earnBattery.githubStar ? 1 : 0;
    user.playerStats.battery += subscriptionBonus[subscription].battery + githubBonus;
    console.log(user.playerStats.battery, "user.playerStats.battery");
    if (user.playerStats.battery > subscriptionBonus[subscription].max) {
      console.log("if!", subscriptionBonus[subscription].max);
      user.playerStats.battery = subscriptionBonus[subscription].max;
    }
  });
  await Promise.all(users.map((user) => user.save()));
};

module.exports = bonusBatteryInterval;
