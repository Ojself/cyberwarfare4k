const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { repairRouteCriterias, buyBodyguardCriterias } = require('../logic/serviceSupport');
const { saveAndUpdateUser } = require('../logic/_helpers');

// @POST
// PRIVATE
// Lets user repair his Firewall partialy

router.post('/partial', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const percentageRepair = 20;
  const cost = Math.floor((user.playerStats.repairCost * percentageRepair) / 100);
  const disallowed = repairRouteCriterias(user, cost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.repair(percentageRepair, cost);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    user: updatedUser,
    message:
      'You successfully glued together some loose parts from your computer..',
  });
});

// @POST
// PRIVATE
// Lets user repair his Firewall fully

router.post('/full', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const percentageRepair = 100;
  const cost = Math.floor((user.playerStats.repairCost * percentageRepair) / 100);
  const disallowed = repairRouteCriterias(user, cost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.repair(percentageRepair, cost);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    user: updatedUser,
    message:
      'You successfully glued together some loose parts from your computer..',
  });
});

// @POST
// PRIVATE
// Lets user buy bodyguard
router.post('/bodyguard', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const cost = Math.floor(user.playerStats.bodyguards.price);
  const disallowed = buyBodyguardCriterias(user, cost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.buyBodyguard();
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    user: updatedUser,
    message:
      'You successfuly hired a bodyuard..',
  });
});

// @POST
// PRIVATE
// Lets user reset stat points
const resetStatPointsCriterias = (user) => {
  if (!user) {
    return 'Something went wrong';
  }
  if (user.playerStats.statPointsHistory.statPointsUsed === 0) {
    return 'You haven\'t used any statpoints';
  }
  if (user.playerStats.statPointResetPrice > user.playerStats.bitCoins) {
    return 'Insufficent funds';
  }
};
router.post('/reset-stat-points', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const disallowed = resetStatPointsCriterias(user);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.resetStatPoitns();
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    user: updatedUser,
    message: 'Your statpoints have been reset!',
  });
});

module.exports = router;
