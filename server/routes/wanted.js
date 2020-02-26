const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { addBountyCriteria, getAllWantedUsers } = require('../middlewares/middleWanted.js');

// @GET
// PRIVATE
// Retrives all users and all users with a bounty
router.get('/', async (req, res) => {
  let allUsers;
  try {
    allUsers = await getAllWantedUsers();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }

  // same object is being sent twice.
  res.status(200).json({
    success: true,
    message: 'wanted hackers loaded..',
    users: allUsers[0],
    bountyUsers: allUsers[1],
  });
});

// @POST
// PRIVATE
// Adds bounty to a user
router.post('/add-bounty', async (req, res) => {
  const { bountyTargetId, bounty } = req.body;
  const userId = req.user._id;
  let user;
  let bountyTarget;

  try {
    user = await User.findById(userId);
    bountyTarget = await User.findById(bountyTargetId);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }
  const message = addBountyCriteria(user, bountyTarget, bounty);
  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // performs the actual action in db
  user.bitcoinDrain(bounty);
  bountyTarget.addBounty(user, bounty);

  let allUsers;
  try {
    allUsers = await getAllWantedUsers();
  } catch (e) {
    res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }

  return res.status(200).json({
    success: true,
    message: `${bounty} added to ${bountyTarget.name}s bounty`,
    users: allUsers[0],
    bountyUsers: allUsers[1],
  });
});

module.exports = router;
