const User = require('../models/User');

const generateQueryString = (game) => {
  const lexi = 'abcdefghijkmnpqrstuvwxyz23456789ABCDEFGHIJKLMNPQRSTUVWXYZ';
  let query = '';
  for (let i = 0; i < 6; i += 1) {
    query += lexi[Math.floor(Math.random() * lexi.length)];
  }
  if (game === 'chessathor') {
    query = `#${query}`;
  }
  return query;
};

const earnBatteryInterval = async () => {
  const users = await User.find({ 'account.isSetup': true });
  users.forEach((user) => {
    user.earnBattery.megarpg = generateQueryString('megarpg');
    user.earnBattery.chessathor = generateQueryString('chessathor');
  });
  await Promise.all(users.map((user) => user.save()));
};

module.exports = earnBatteryInterval;
