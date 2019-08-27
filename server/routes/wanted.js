const express = require('express');
const router = express.Router();
const User = require('../models/User');

const { addBountyCriteria } = require('../middlewares/middleWanted.js');
const { nullifyValues } = require('../middlewares/middleHelpers.js');

router.get('/', async (req, res, next) => {
  const users = await User.find().populate('playerStats.bountyDonors', 'name');

  if (!users) {
    return res.status(400).json({
      success: false,
      message: 'no hackers found, try again later'
    });
  }
  const bountyUsers = users
    .filter(user => user.playerStats.bounty > 0)
    .map(user =>
      nullifyValues(user, [
        'account',
        'hackSkill',
        'crimeSkill',
        'marketPlaceItems',
        'specialWeapons',
        'fightInformation',
        'stash',
        'currencies',
        'email'
      ])
    );

  res.status(200).json({
    success: true,
    message: 'wanted hackers loaded',
    bountyUsers
  });
});
// consistency in route url. camelCase or dash?
/* adds bounty to opponent */
router.post('/add-bounty', async (req, res, next) => {
  console.log(req.body, 'body');
  const { name, bounty } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const opponent = await User.findOne({ name });

  let message = addBountyCriteria(user, opponent, bounty);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  user.bitcoinDrain(bounty);
  opponent.addBounty(user, bounty);

  res.status(200).json({
    success: true,
    message: `${bounty} added to ${opponent.name}s bounty`
  });
});

module.exports = router;
