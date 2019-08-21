const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const router = express.Router();
const User = require('../models/User');
const { repairRouteCriterias } = require('../middlewares/middleRepair');
/* todo isloggedin for routes */
/* 
POST
PRIVATE
Partially repairs the users HP/Firewall with 20%
*/

router.post('/partial', async (req, res, next) => {
  console.log('you are now in partial repair route');
  const userId = req.user._id;
  const user = await User.findById(userId);

  // const batteryCost = 5
  // base repair cost on level, networth, how many times repair has been done etc?
  const repairCost = 10000;

  let message = repairRouteCriterias(user, repairCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  user.partialRepair(repairCost);

  res.status(200).json({
    success: true,
    message: `You successfully glued together some loose parts from your computer`
  });
});

/* 
POST
PRIVATE
Fully repairs the users HP/Firewall with 20%
*/

router.post('/full', async (req, res, next) => {
  console.log('you are now in full repair route');
  let userId = req.user._id;
  let user = await User.findById(userId);

  const repairCost = 40000;

  let message = repairRouteCriterias(user, repairCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  user.fullRepair(repairCost);
  res.status(200).json({
    success: true,
    message: `You successfully glued together some loose parts from your computer`
  });
});

module.exports = router;
