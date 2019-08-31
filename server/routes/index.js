const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const { nullifyValues } = require('../middlewares/middleHelpers');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');
const City = require('../models/City');

// might be written wrongly TODO
// Ensures that email confirmation is been made
function ensureIsSetup(req, res, next) {
  if (req.user.account.status === 'Active') {
    return next();
  } else {
    res.redirect('/');
  }
}

//isSetup === true?
function ensureIsSetup(req, res, next) {
  if (req.user.isSetup()) {
    return next();
  } else {
    res.redirect('/');
  }
}

// @POST
// PRIVATE
// User setup. User is being sent here in order to put in name, set stats and city

// todo
// create default names, city and alliance
// force user here if !user.isSetup
// create route criterias

router.post('/createUser', isLoggedIn, async (req, res, next) => {
  console.log('you are now in the create user route');

  let userId = req.user._id;
  let user = await User.findById(userId);
  let { name, cityString } = req.body;

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

  if (allUsers.find(name => allUsers.name)) {
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

// todo extract this to somewhere else
function setupPlayer(user, name, city) {
  user.name = name;
  user.playerStats.city = city;
  user.account.isSetup = true;
  user.save();
}

// @GET
// PRIVATE
// Retrives player profile

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

// @GET
// PRIVATE
// Gets all user

// todo add query to sort differently. by income, rank, kills etc
router.get('/ladder', isLoggedIn, async (req, res, next) => {
  console.log('you are now in ladder route');

  let users = await User.find();

  users = users.map(user =>
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
    message: 'users loaded',
    users
  });
});

// @POST
// PRIVATE
// Lets user upgrade his own stats whenever he levels up

// extract route criterias and functionality

router.post('/upgradeStats', isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { statPoint } = req.body;

  if (user.playerStats.statPoints <= 0) {
    return res.status(400).json({
      message: 'no more statpoints'
    });
  }

  user.playerStats.statPoints -= 1;
  switch (statPoint) {
    case 'firewall':
      user.playerStats.maxFirewall += 5;
      user.playerStats.currentFirewall += 5;
      break;
    case 'cpu':
      user.hackSkill.cpu += 1;
      break;
    case 'antivirus':
      user.hackSkill.antivirus += 1;
      break;
    case 'encryption':
      user.hackSkill.encryption += 1;
      break;
    default:
      // gives back statpoints if something went wrong
      user.playerStats.statPoints += 1;
  }
  user.save();
  return res.status(200).json({
    message: `${statPoint.toUpperCase()} upgraded`,
    success: true
  });
});

// @GET
// PRIVATE
// Same as my profile. being used in the navbar for stats
router.get('/get-nav-user', async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).populate(
      'playerStats.city',
      'name'
    );
    res.status(200).json({
      success: true,
      message: 'nav user loaded',
      user
    });
  } catch (err) {
    next(err);
  }
  /* todo, too much information is being passsed */
  // use nullify values to null out some info
});

// @GET
// PRIVATE
// Gets profile for other user
router.get('/profile/:profileId', async (req, res, next) => {
  const { profileId } = req.params;
  const user = await User.findById(profileId);
  res.status(200).json({
    success: true,
    message: 'nav user loaded',
    user
  });
});

module.exports = router;
