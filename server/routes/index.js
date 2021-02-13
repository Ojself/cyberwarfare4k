const express = require('express');
const { isLoggedIn } = require('../logic/auth');
const {
  calculateNetworth,
  getOpponentInformation,
  saveAndUpdateUser,
} = require('../logic/_helpers');

const router = express.Router();

const User = require('../models/User');
const City = require('../models/City');
const Currency = require('../models/Currency');
const Message = require('../models/Message');
const Notification = require('../models/Notification');

/**
 * Sets values to null
 * @param {Object} object - object of what should be nullified
 * @param {[string]} except - array of strings that should be kept
 */

const nullifyValues = (object, except) => {
  if (!Array.isArray(except)) {
    throw TypeError;
  }
  const objectKeys = Object.keys(object);
  objectKeys.forEach((key) => {
    if (!except.includes(key)) {
      object[key] = null;
    }
  });
};

// might be written wrongly TODO
const setupPlayer = async (user, name, city, avatar) => {
  user.playerStats.currentFirewall = 100;
  user.account.isSetup = true;
  user.name = name;
  user.playerStats.city = city._id;
  user.account.avatar = avatar;
  await user.save();
  city.arrival(user._id);
  await city.save();
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
    .populate('marketPlaceItems.Encryption')
    .populate('alliance', 'name')
    .populate('playerStats.city', ['name', 'stashPriceMultiplier']);

  const unreadMessageExist = await Message.exists({ to: userId, read: false });
  const unreadNotificationExist = await Notification.exists({
    to: userId,
    read: false,
  });

  const now = Date.now();
  const userIsGracedMoreThanFiveMinuts = isGraced(user, now + 1000 * 60 * 5);
  if (userIsGracedMoreThanFiveMinuts) {
    // Sets the graceperiod to 5 minutes because the user logged on
    user.setGracePeriod(now + 1000 * 60 * 5);
    await user.save();
  }
  res.status(200).json({
    success: true,
    message: 'user loaded..',
    user,
    unreadMessageExist,
    unreadNotificationExist,
  });
});

// @GET
// PRIVATE
// Retrives hackers

router.get('/opponents/', async (req, res) => {
  let users;
  try {
    users = await User.find({ 'account.isSetup': true }).select('name');
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
    .populate('alliance', 'name')
    .lean();
  const opponentInformation = await getOpponentInformation(
    JSON.stringify(opponentId),
    allUsers,
  );

  /* Surely there's a nicer way to do this. */
  nullifyValues(opponentInformation.opponent.account, ['avatar']);
  opponentInformation.opponent.hackSkill = null;
  opponentInformation.opponent.crimeSkill = null;
  opponentInformation.opponent.currencies = null;
  nullifyValues(opponentInformation.opponent.playerStats, [
    'bounty',
    'bountyDonors',
    'rank',
    'rankName',
  ]);
  opponentInformation.opponent.marketPlaceItems = null;
  opponentInformation.opponent.stash = null;
  nullifyValues(opponentInformation.opponent.fightInformation, ['shutdowns']);
  opponentInformation.opponent.earnBattery = null;

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
  const dbSelectOptions = 'name alliance currencies playerStats.rankName playerStats.rank playerStats.bitCoins playerStats.ledger fightInformation.shutdowns fightInformation.crimesInitiated ';
  let users;
  try {
    users = await User.find({ 'account.isSetup': true })
      .select(dbSelectOptions)
      .populate('alliance', 'name')
      .lean();
  } catch (err) {
    console.error('Ladder error:', err);
    return res.status(400).json({
      success: false,
      message: JSON.stringify(err),
    });
  }
  const databaseCurrencies = await Currency.find({}).select('name price').lean();
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

const upgradeStatsCriteria = (user, statPoint) => {
  if (!user || !statPoint) {
    return 'Something went wrong';
  }
  const crimeSkills = [
    'Technical',
    'Forensics',
    'Social Engineering',
    'Cryptography',
  ];
  const hackSkills = ['CPU', 'AntiVirus', 'Encryption'];
  const miscSkills = ['exp', 'Firewall'];

  const possibleStatPoints = miscSkills.concat(hackSkills, crimeSkills);

  if (user.playerStats.statPoints <= 0) {
    return 'Insufficent statpoints';
  }
  if (!possibleStatPoints.includes(statPoint)) {
    return 'Invalid statpoint';
  }

  if (crimeSkills.includes(statPoint)) {
    if (user.crimeSkill[statPoint] > 200) {
      return `You can't upgrade ${statPoint} any further`;
    }
  }

  if (hackSkills.includes(statPoint)) {
    const itemBonus = user.marketPlaceItems[statPoint]
      ? user.marketPlaceItems[statPoint].bonus
      : 0;
    if (user.hackSkill[statPoint] - itemBonus > 100) {
      return `You can't upgrade ${statPoint} any further`;
    }
  }

  return null;
};

router.post('/upgradeStats', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const { statPoint } = req.body;

  /* todo, criteria route */
  const user = await User.findById(userId)
    .populate('marketPlaceItems.CPU')
    .populate('marketPlaceItems.Firewall')
    .populate('marketPlaceItems.AntiVirus')
    .populate('marketPlaceItems.Encryption');

  const disallowed = upgradeStatsCriteria(user, statPoint);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  await user.handleNewStatpoint(statPoint);

  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${statPoint} skill upgraded..`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Lets user change weapon

router.post('/changeWeapon', isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const { weapon } = req.body;

  const allowedWeapons = ['CPU', 'AntiVirus', 'Encryption'];
  if (!allowedWeapons.includes(weapon)) {
    return res.status(400).json({
      success: false,
      message: 'Illegal input',
    });
  }

  const user = await User.findById(userId);

  if (user.fightInformation.equipedWeapon === weapon) {
    return res.status(400).json({
      success: false,
      message: `You already have ${weapon} equipped`,
    });
  }

  await user.changeWeapon(weapon);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `You equipped ${weapon}..`,
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
  const user = await User.findById(req.user._id).lean();
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

/* router.post('/kill/', async (req, res) => {
  const { opponentId } = req.body;
  const opponent = await User.findById(opponentId);
  console.log('start');
  try {
    await opponent.die();
  } catch (err) {
    console.err('error', err);
  }
  console.log('end');
  const newOpponent = await opponent.save();
  console.log('saved');

  res.status(200).json({
    success: true,
    message: 'hacker killed..',
    newOpponent,
  });
}); */

module.exports = router;
