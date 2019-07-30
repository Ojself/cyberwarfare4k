const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const City = require('../models/City');

/* 
GET
PRIVATE+
ADMIN SITE
*/

router.get('/secret', isLoggedIn, (req, res, next) => {
  /* if (user.role != 'admin'){return} */
  res.json({
    secret: 42,
    user: req.user
  });
});

/* 
POST
PRIVATE
CREATES USER
*/

/* todo, create default names, city and alliance */
router.post('/createUser', isLoggedIn, async (req, res, next) => {
  console.log('you are now in the create user route');

  let userId = req.user._id;
  let user = await User.findById(userId);
  let { name, cityString } = req.body;

  console.log(req.body, 'body');

  if (user.account.isSetup) {
    console.log('user is already setup');
    return res.status(400).json({
      success: false,
      message: 'user is already setup'
    });
  }

  if (!name || !cityString) {
    return res.status(409).json({
      success: false,
      message: 'Missing parameters'
    });
  }

  let city = await City.findOne({ cityString });
  let allUsers = await User.find();

  /* Ensures already existing name */
  /* Also taken care of in User model */
  if (allUsers.find(name => allUsers.name)) {
    console.log('name already exists');
    return res.status(400).json({
      success: false,
      message: 'name already exists'
    });
  }

  setupPlayer(user, name, city);

  res.status(200).json({
    success: true,
    message: `user: ${name} created`
  });
});

function setupPlayer(user, name, city) {
  user.name = name;
  user.playerStats.city = city;
  user.account.isSetup = true;
  user.save();
}

/* 
GET
PRIVATE
RETRIVES USER INFORMATION
*/
router.get('/my-profile', isLoggedIn, async (req, res, next) => {
  let userId = req.user._id;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: 'user loaded',
      user
    });
  } catch (err) {
    next(err);
  }
});

/* 
GET
PRIVATE
RETRIVES ALL USERS
*/
router.get('/ladder', isLoggedIn, async (req, res, next) => {
  console.log('you are now in ladder route');
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: 'users loaded',
      users
    });
  } catch (err) {
    next(err);
  }
});

/* 
POST
PRIVATE
UPGRADES THE STATS OF THE USER
*/

router.post('/upgradeStats', isLoggedIn, async (req, res, next) => {
  console.log('you are now upgrading stats');
  let userId = req.user._id;
  let user = await User.findById(userId);
  console.log(req.body, 'req.body');
  let { statPoint } = req.body;
  //let statPoint = Object.keys(req.body);
  console.log(statPoint, typeof statPoint, 'statpoint');

  if (user.playerStats.statPoints <= 0) {
    return res.status(400).json({
      message: 'no more statpoints'
    });
  }

  user.playerStats.statPoints -= 1;
  switch (statPoint) {
    case 'firewall':
      console.log('firewall improved');
      user.playerStats.maxFirewall += 5;
      user.playerStats.currentFirewall += 5;
      break;
    case 'cpu':
      console.log('cpu improved');
      user.hackSkill.cpu += 1;
      break;
    case 'antivirus':
      console.log('anticirus improved');
      user.hackSkill.antivirus += 1;
      break;
    case 'encryption':
      console.log('encryption improved');
      user.hackSkill.encryption += 1;
      break;
    default:
      console.log("you tried to improve something that doesn't exist");
  }
  user.save();
  return res.status(200).json({
    message: `${statPoint.toUpperCase()} upgraded`,
    success: true
  });
});

module.exports = router;
