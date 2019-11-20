const User = require("../models/User");

/* Ensures that users gets more battery after cetain time and never exceeds 100 */
function batteryInterval() {
  User.find({}).then(users => {
    users.map(user => {
      user.playerStats.battery += 10;
      if (user.playerStats.battery > 100) user.playerStats.battery = 100;
      user.save();
    });
  });
}

module.exports = batteryInterval;
