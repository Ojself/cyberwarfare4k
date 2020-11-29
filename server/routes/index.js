const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const { getInbox, getOpponentInformation } = require('./helper');

const router = express.Router();

const User = require('../models/User');
const City = require('../models/City');

// might be written wrongly TODO
const setupPlayer = async (user, name, city, avatar) => {
  const updatedUser = user;
  const updatedCity = city;

  updatedUser.account.isSetup = true;
  updatedUser.name = name;
  updatedUser.playerStats.city = city._id;
  updatedUser.account.avatar = avatar;
  await updatedUser.save();
  updatedCity.residents.push(user._id);
  await updatedCity.save();
};

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
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { name, cityString, avatar } = req.body;

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
  if (allUsers.find((name) => allUsers.name)) {
    // todo, probably wrong
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

// @GET
// PRIVATE
// Retrives player profile

router.get('/profile', isLoggedIn, async (req, res) => {
  if (!req.user) {
    return;
  }
  const userId = req.user._id;

  try {
    const user = await User.findById(userId)
      .populate('marketPlaceItems.CPU')
      .populate('marketPlaceItems.Firewall')
      .populate('marketPlaceItems.AntiVirus')
      .populate('marketPlaceItems.Encryption')
      .populate('alliance', 'name')
      .populate('playerStats.city', 'name');
    const messages = await getInbox(userId);
    res.status(200).json({
      success: true,
      message: 'user loaded..',
      user,
      messages,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(err)}`,
    });
  }
});

// @GET
// PRIVATE
// Retrives hackers

router.get('/opponents/', async (req, res) => {
  let users;
  try {
    users = await User.find().select({ name: '1' });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `error: ${JSON.stringify(e)}`,
    });
  }
  res.status(200).json({
    success: true,
    message: 'hackers loaded..',
    users,
  });
});

// @GET
// PRIVATE
// Retrives hacker profile

router.get('/opponents/:id', async (req, res) => {
  const opponentId = req.params.id;
  const allUsers = await User.find()
    .sort({ 'playerStats.exp': -1 })
    .populate('alliance', 'name');
  const opponentInformation = await getOpponentInformation(
    JSON.stringify(opponentId),
    allUsers,
  );

  res.status(200).json({
    success: true,
    message: 'opponent loaded..',
    opponentRanking: opponentInformation.ranking,
    opponent: opponentInformation.opponent,
  });
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
    'playerStats.bitCoins': '1',
    'playerStats.ledger': '1',
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
  const filteredUsers = users.filter((user) => !user.name.startsWith('unconfirmedplayer'));

  return res.status(200).json({
    success: true,
    message: 'users loaded..',
    users: filteredUsers,
  });
});

// @POST
// PRIVATE
// Lets user upgrade his own stats whenever he levels up

// extract route criterias and functionality

router.post('/upgradeStats', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const { statPoint } = req.body;
  const possibleStatPoints = ['Technical', 'Forensics', 'Social Engineering', 'Cryptography', 'CPU', 'AntiVirus', 'Encryption', 'exp', 'Firewall'];
  if (!possibleStatPoints.includes(statPoint)) {
    return res.status(400).json({
      success: false,
      message: 'Illegal upgrade',
    });
  }
  /* todo, criteria route */
  const user = await User.findById(userId)
    .populate('marketPlaceItems.CPU')
    .populate('marketPlaceItems.Firewall')
    .populate('marketPlaceItems.AntiVirus')
    .populate('marketPlaceItems.Encryption');

  if (user.playerStats.statPoints <= 0) {
    return res.status(400).json({
      success: false,
      message: 'no more statpoints',
    });
  }

  await user.handleNewStatpoint(statPoint);

  /* todo nullify user info */
  const updatedUser = await user.save();

  return res.status(200).json({
    message: `${statPoint} skill upgraded..`,
    user: updatedUser,
    success: true,
  });
});

// @GET
// PUBLIC
// See if the user is loggedin and setup to redirect the user
router.get('/user-setup-status', async (req, res) => {
  const status = {
    userInstance: false,
    isSetup: false,
  };
  if (!req.user) {
    return res.json({
      status,
    });
  }
  const user = await User.findById(req.user._id);

  if (!user.account.isSetup) {
    status.userInstance = true;
    return res.status(200).json({
      success: true,
      status,
    });
  }

  status.userInstance = true;
  status.isSetup = true;

  return res.status(200).json({
    success: true,
    status,
  });
});

module.exports = router;
