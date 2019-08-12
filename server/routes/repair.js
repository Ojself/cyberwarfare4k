const express = require('express');
const { isLoggedIn } = require('../middlewaresAuth');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

/* 
POST
PRIVATE
Partially repairs the users HP/Firewall
*/

router.post('/partial', isLoggedin, async (req, res, next) => {
  console.log('you are now in partial repair route');
  let userId = req.user._id;
  let user = await User.findById({ userId });

  if (user.bitCoins < 3000) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient funds'
    });
  }

  if (user.currentFirewall === user.maxFireWall) {
    return res.status(400).json({
      success: false,
      message: 'Your computer is already working just fine!'
    });
  }

  user.partialRepair();

  res.status(200).json({
    success: true,
    message:
      'You successfully glued together some loose parts from your computer'
  });
});

router.post('/full', isLoggedin, async (req, res, next) => {
  console.log('you are now in full repair route');
  let userId = req.user._id;
  let user = await User.findById({ userId });

  if (user.bitCoins < 12000) {
    res.status(400).json({
      success: false,
      message: 'Insufficient funds'
    });
    return null;
  }

  if (user.currentFirewall === user.maxFireWall) {
    res.status(400).json({
      success: false,
      message: 'Your computer is already working just fine!'
    });
    return null;
  }

  user.systemFullRepair();
  res.status(200).json({
    success: true,
    message:
      'You successfully glued together some loose parts from your computer'
  });
});
