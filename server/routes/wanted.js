const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { addBountyCriteria, getAllWantedUsers } = require('../logic/wanted.js');
const { saveAndUpdateUser } = require('./helper');

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
    users: allUsers.users,
    bountyUsers: allUsers.bountyUsers,
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
  const disallowed = addBountyCriteria(user, bountyTarget, bounty);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.bitCoinDrain(bounty);
  const updatedUser = await saveAndUpdateUser(user);
  bountyTarget.addBounty(user, bounty);
  await bountyTarget.save();

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
    users: allUsers.users,
    bountyUsers: allUsers.bountyUsers,
    user: updatedUser,
  });
});

module.exports = router;
