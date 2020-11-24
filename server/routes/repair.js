const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { repairRouteCriterias } = require('../middlewares/middleRepair');
const { saveAndUpdateUser } = require('./helper');

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

module.exports = router;
