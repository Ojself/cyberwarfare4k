const { existingValue, checkFunds } = require('../middlewares/middleHelpers');
const User = require('../models/User');

// Sees if everything is in order to add bounty
function addBountyCriteria(user, opponent, bounty) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(opponent)) {
    return "Opponent doesn't exist";
  }
  if (!checkFunds(user.playerStats.bitCoins, bounty)) {
    console.log(user.playerStats.bitCoins, bounty);
    return 'Insufficent money';
  }
  if (bounty < 1000) {
    return 'Bounty is too low';
  }
  return null;
}


const getAllWantedUsers = async () => {
  const dbSelectOptions = {
    name: '1',
    playerStats: '1',
    alliance: '1',
    'playerStats.bounty': '1',
    'playerStats.bountyDonors': '1',
    'playerStats.rankName': '1',
  };

  let users;
  try {
    users = await User.find()
      .sort({ 'playerStats.bounty': -1 })
      .select(dbSelectOptions)
      .populate('alliance', 'name')
      .populate('playerStats.bountyDonors', 'name');
  } catch (e) {
    console.error('error:', e); // todo, this doesn't seem right
    throw new Error(e);
  }

  const bountyUsers = users.filter((u) => u.playerStats.bounty > 0);

  return [users, bountyUsers];
};

module.exports = { addBountyCriteria, getAllWantedUsers };
