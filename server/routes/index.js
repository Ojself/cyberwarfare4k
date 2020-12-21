const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const {
  calculateNetworth, getInbox, getOpponentInformation, saveAndUpdateUser,
} = require('./helper');

const router = express.Router();

const User = require('../models/User');
const City = require('../models/City');
const Currency = require('../models/Currency');

// might be written wrongly TODO
const setupPlayer = async (user, name, city, avatar) => {
  const updatedUser = user;
  const updatedCity = city;
  updatedUser.playerStats.currentFirewall = 100;
  updatedUser.account.isSetup = true;
  updatedUser.name = name;
  updatedUser.playerStats.city = city._id;
  updatedUser.account.avatar = avatar;
  await updatedUser.save();
  updatedCity.residents.push(user._id);
  await updatedCity.save();
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

router.post('/createUser', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { name, cityString, avatar } = req.body;
  // todo craete criteria route
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

  const city = await City.findOne({ name: cityString });
  const allUsers = await User.find();

  if (
    name.toLowerCase().startsWith('npc')
    || name.toLowerCase().startsWith('unconfirmed')
    || name.toLowerCase().startsWith('admin')
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

const isGraced = (user, now) => user.fightInformation.gracePeriod > now;
// @GET
// PRIVATE
// Retrives player profile
router.get('/profile', isLoggedIn, async (req, res) => {
  if (!req.user) {
    return;
  }
  const userId = req.user._id;

  const user = await User.findById(userId)
    .populate('marketPlaceItems.CPU')
    .populate('marketPlaceItems.Firewall')
    .populate('marketPlaceItems.AntiVirus')
  // .populate('marketPlaceItems.Encryption')
    .populate('alliance', 'name')
    .populate('playerStats.city', ['name', 'stashPriceMultiplier']);
  const messages = await getInbox(userId);

  const now = Date.now();
  const userIsGracedMoreThanFiveMinuts = isGraced(user, (now + (1000 * 60 * 5)));
  if (userIsGracedMoreThanFiveMinuts) {
    // Sets the graceperiod to 5 minutes because the user logged on
    user.setGracePeriod(now + (1000 * 60 * 5));
    await user.save();
  }
  res.status(200).json({
    success: true,
    message: 'user loaded..',
    user,
    messages,
  });
});

// @GET
// PRIVATE
// Retrives hackers

router.get('/opponents/', async (req, res) => {
  let users;
  try {
    users = await User.find({ 'account.isSetup': true }).select({ name: '1' });
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
  const allUsers = await User.find({ 'account.isSetup': true })
    .sort({ 'playerStats.exp': -1 })
    .populate('alliance', 'name');
  const opponentInformation = await getOpponentInformation(
    JSON.stringify(opponentId),
    allUsers,
  );

  // stop hackers
  opponentInformation.opponent.account.notifications = null;
  opponentInformation.opponent.account.password = null;
  opponentInformation.opponent.hackSkill = null;
  opponentInformation.opponent.crimeSkill = null;
  opponentInformation.opponent.currencies = null;
  opponentInformation.opponent.playerStats.bodyguards = null;
  opponentInformation.opponent.playerStats.currentFirewall = null;
  opponentInformation.opponent.playerStats.maxFirewall = null;
  opponentInformation.opponent.playerStats.bitCoins = null;
  opponentInformation.opponent.playerStats.city = null;

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
    currencies: '1',
    'playerStats.rankName': '1',
    'playerStats.rank': '1',
    'playerStats.bitCoins': '1',
    'playerStats.ledger': '1',
    'fightInformation.shutdowns': '1',
    'fightInformation.crimesInitiated': '1',
  };
  let users;
  try {
    users = await User.find({ 'account.isSetup': true })
      .select(dbSelectOptions)
      .populate('alliance', 'name');
  } catch (e) {
    return res.status(400).json({
      success: true,
      message: JSON.stringify(e),
    });
  }
  const databaseCurrencies = await Currency.find({}).select({ name: 1, price: 1 });
  users.map((user) => {
    user.playerStats.bitCoins = calculateNetworth(user, databaseCurrencies);
    user.playerStats.ledger = null;
    return user;
  });

  users.sort((b, a) => a.playerStats.bitCoins - b.playerStats.bitCoins);

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
  const { statPoint } = req.body;
  const possibleStatPoints = ['Technical', 'Forensics', 'Social Engineering', 'Cryptography', 'CPU', 'AntiVirus', 'exp', 'Firewall']; // 'Encryption',
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
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${statPoint} skill upgraded..`,
    user: updatedUser,
  });
});

// @GET
// PUBLIC
// See if the user is loggedin and setup to redirect the user
router.get('/user-setup-status', async (req, res) => {
  const status = {
    userInstance: false,
    isSetup: false,
    playerIsDead: false,
  };
  if (!req.user) {
    return res.json({
      status,
    });
  }
  const user = await User.findById(req.user._id);
  status.playerIsDead = user.playerStats.currentFirewall <= 0;

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
