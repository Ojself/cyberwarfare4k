const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const { getAllUsers } = require('./helper');

const router = express.Router();
const User = require('../models/User');

const City = require('../models/City');

// might be written wrongly TODO
// Ensures that email confirmation is been made

function setupPlayer(user, name, city, avatar) {
  user.account.isSetup = true;
  user.name = name;
  user.playerStats.city = city._id;
  user.account.avatar = avatar;
  user.save();
  city.residents.push(user._id);
  city.save();
}

const getShuffledArr = (arr) => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i !== rand))];
};

/* function ensureIsSetup(req, res, next) {
  if (req.user.account.status === 'Active') {
    return next();
  }
  return res.redirect('/');
} */

// isSetup === true?
/* function ensureIsSetup(req, res, next) {
  if (req.user.isSetup()) {
    return next();
  } else {
    res.redirect("/");
  }
} */

// @POST
// PRIVATE
// User setup. User is being sent here in order to put in name, set stats and city

// todo
// create default names, city and alliance
// force user here if !user.isSetup
// create route criterias

router.post('/createUser', isLoggedIn, async (req, res) => {
  console.log('you are now in the create user route');

  const userId = req.user._id;
  const user = await User.findById(userId);
  const { name, cityString, avatar } = req.body;
  console.log(name, 'name', cityString, 'cs', avatar, 'avatar');

  if (user.account.isSetup) {
    return res.status(400).json({
      success: false,
      message: 'user is already setup',
    });
  }

  if (!name || !cityString || !avatar) {
    return res.status(409).json({
      success: false,
      message: 'Missing parameters..',
    });
  }
  // todo, addtoset city resident
  // todo, send through criteria route
  const city = await City.findOne({ name: cityString });
  const allUsers = await User.find();

  if (
    name.toLowerCase().startsWith('npc')
    || name.toLowerCase().startsWith('unconfirmed')
  ) {
    return res.status(409).json({
      success: false,
      message: `${name} is not allowed`,
    });
  }
  if (allUsers.find((name) => allUsers.name)) { // todo, probably wrong
    return res.status(409).json({
      success: false,
      message: 'name already exists..',
    });
  }

  const setupUser = await setupPlayer(user, name, city, avatar);

  return res.status(200).json({
    success: true,
    message: `user: ${name} created`,
    user: setupUser,
  });
});

// todo extract this to somewhere else

// @GET
// PRIVATE
// Same as my profile. being used in the navbar for stats
router.get('/get-nav-user', async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId)
      .populate('playerStats.city', 'name')
      .populate('alliance', 'name');

    res.status(200).json({
      success: true,
      message: 'nav user loaded..',
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err.toString(),
    });
  }
  /* todo, too much information is being passsed */
});

// @GET
// PRIVATE
// Retrives player profile

router.get('/my-profile', isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId)
      .populate('marketPlaceItems.CPU')
      .populate('marketPlaceItems.Firewall')
      .populate('marketPlaceItems.AntiVirus')
      .populate('marketPlaceItems.Encryption')
      .populate('alliance');

    console.log(user, 'user');
    res.status(200).json({
      success: true,
      message: 'user loaded..',
      user,
    });
  } catch (err) {
    next(err);
  }
});

// @GET
// PRIVATE
// Retrives hackers

router.get('/opponent/', async (req, res) => {
  const users = await getAllUsers(false, { name: '1' });
  res.status(200).json({
    success: true,
    message: 'all hackers loaded..',
    users,
  });
});

// @GET
// PRIVATE
// Retrives hacker profile

router.get('/opponent/:id', async (req, res) => {
  const opponentId = req.params.id;
  try {
    const opponent = await User.findById(opponentId);
    res.status(200).json({
      success: true,
      message: 'opponent loaded..',
      opponent,
    });
  } catch (err) {
    console.log('err', err);
  }
});

// @GET
// PRIVATE
// Gets all users for the 'Top Hackers' page'

router.get('/ladder', async (req, res) => {
  const dbSelectOptions = {
    name: '1',
    alliance: '1',
    'playerStats.rankName': '1',
    'playerStats.rank': '1',
    'playerStats.networth': '1',
    'fightInformation.shutdowns': '1',
    'fightInformation.crimesInitiated': '1',
  };
  let users;
  try {
    users = await User.find()
      .select(dbSelectOptions)
      .populate('alliance', 'name');
  } catch (e) {
    return res.status(400).json({
      success: true,
      message: JSON.stringify(e),
    });
  }
  users = getShuffledArr(users);

  return res.status(200).json({
    success: true,
    message: 'users loaded..',
    users,
  });
});

// @POST
// PRIVATE
// Lets user upgrade his own stats whenever he levels up

// extract route criterias and functionality

router.post('/upgradeStats', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { statPoint } = req.body;

  if (user.playerStats.statPoints <= 0) {
    return res.status(400).json({
      message: 'no more statpoints',
    });
  }

  await user.handleNewStatpoint(statPoint);

  /* todo nullify user info */
  const updatedUser = await User.findById(userId).exec();

  return res.status(200).json({
    message: `${statPoint.toUpperCase()} upgraded`,
    updatedUser,
    success: true,
  });
});

module.exports = router;
