const express = require('express');

const router = express.Router();
const User = require('../models/User');
const { repairRouteCriterias } = require('../middlewares/middleRepair');

// @POST
// PRIVATE
// Lets user repair his Firewall partialy

router.post('/partial', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  // base repair cost on level, networth, how many times repair has been done etc?
  // price = price * 1.1 ?
  const repairCost = 10000;
  const message = repairRouteCriterias(user, repairCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  user.partialRepair(repairCost);

  return res.status(200).json({
    success: true,
    message: 'You successfully glued together some loose parts from your computer..',
  });
});

// @POST
// PRIVATE
// Lets user repair his Firewall fully

router.post('/full', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const repairCost = 40000;

  const message = repairRouteCriterias(user, repairCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  user.fullRepair(repairCost);
  return res.status(200).json({
    success: true,
    message: 'You successfully glued together some loose parts from your computer..',
  });
});

module.exports = router;
