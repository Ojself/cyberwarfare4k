const express = require('express');

const router = express.Router();
const User = require('../models/User');

const { getAllUsers } = require('./helper'); // move to middleware?
const { addBountyCriteria } = require('../middlewares/middleWanted.js');

// @GET
// PRIVATE
// Retrives all users and all users with a bounty

router.get('/', async (req, res) => {
  const users = await getAllUsers();

  if (!users) {
    return res.status(400).json({
      success: false,
      message: 'no hackers found, try again later..',
    });
  }

  // only add players above level 2?
  const bountyUsers = users.filter((user) => user.playerStats.bounty > 0);

  return res.status(200).json({
    success: true,
    message: 'wanted hackers loaded..',
    bountyUsers,
    users,
  });
});

// @POST
// PRIVATE
// Adds bounty to a user

router.post('/add-bounty', async (req, res) => {
  const { name, bounty } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const opponent = await User.findOne({ name });

  const message = addBountyCriteria(user, opponent, bounty);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  user.bitcoinDrain(bounty);
  opponent.addBounty(user, bounty);

  return res.status(200).json({
    success: true,
    message: `${bounty} added to ${opponent.name}s bounty`,
  });
});

module.exports = router;
