const express = require('express');
const { getOnlineUsers, saveAndUpdateUser } = require('./helper');

const router = express.Router();

const {
  pettyCrime,
  pettyHackRouteCriterias,
} = require('../middlewares/middlePettyHack');
const {
  crimeRouteCriterias,
  fightCrime,
} = require('../middlewares/middleCrime');
const {
  fraudHacker,
  fraudRouteCriteria,
  attackRouteCriterias,
  fightHacker,
} = require('../middlewares/middleAttack');

const User = require('../models/User');
const Crime = require('../models/Crime');

// @POST
// PRIVATE
// User starts interval that calls this route every x sec and commit petty crime

router.post('/pettyCrime', async (req, res) => {
  const userId = req.user._id;
  let user;
  try {
    user = await User.findById(userId).populate('playerStats.city', 'name');
  } catch (e) {
    console.error('error: ', e);
    res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }

  const batteryCost = 2;
  const disallowed = pettyHackRouteCriterias(user, batteryCost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  const results = await pettyCrime(user, batteryCost);

  return res.status(200).json({
    success: true,
    message: 'pettyCrime commited',
    results: results.pettyResult,
    user: results.updatedUser,
  });
});

// @GET
// PRIVATE
// Retrieves all crimes that are available

router.get('/crimes', async (req, res) => {
  try {
    const now = Date.now();
    const crimes = await Crime.find({ gracePeriod: { $lte: now } }).sort({ crimeType: 1, difficulty: 1 });
    return res.status(200).json({
      success: true,
      message: 'Crimes loaded..',
      crimes,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.toString(),
    });
  }
});

// @POST
// PRIVATE
// Commit crime route.

router.post('/crimes', async (req, res) => {
  const userId = req.user._id;
  const { crimeId } = req.body;
  const batteryCost = 5;
  const now = Date.now();
  const user = await User.findById(userId);
  const crime = await Crime.findById(crimeId);

  const disallowed = crimeRouteCriterias(crime, user, batteryCost, now);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  // commits crime and returns result object
  const finalResult = await fightCrime(user, crime, batteryCost, now);
  const crimes = await Crime.find({ gracePeriod: { $lte: now } }).sort({ crimeType: 1, difficulty: 1 });

  return res.status(200).json({
    success: true,
    message: 'Crime commited..',
    finalResult,
    user: finalResult.user,
    crimes,
  });
});

// @POST
// PRIVATE
// User can steal from other players.
router.post('/fraud/:opponentId', async (req, res) => {
  const userId = req.user._id;
  const { opponentId } = req.params;
  const batteryCost = 4;

  const user = await User.findById(userId);
  const opponent = await User.findById(opponentId);
  const now = Date.now();

  const userIsOnline = await getOnlineUsers(opponent._id.toString());

  const disallowed = await fraudRouteCriteria(user, opponent, batteryCost, now, userIsOnline);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  const finalResult = await fraudHacker(user, opponent, batteryCost, now);

  const updatedUser = await saveAndUpdateUser(finalResult.user);
  await finalResult.opponent.save();
  finalResult.user = null;
  finalResult.opponent = null;
  finalResult.now = null;

  const message = `You stole ${finalResult.playerGains.bitCoinStolen} from ${opponent.name}`;
  const success = !!finalResult.playerGains.bitCoinStolen;
  return res.status(200).json({
    success,
    message,
    finalResult,
    user: updatedUser,

  });
});

// @POST
// PRIVATE
// User can hack another plater.
// /opponentId/attack
router.post('/:opponentId', async (req, res) => {
  const userId = req.user._id;
  const { opponentId } = req.params;
  const batteryCost = 6;

  const user = await User.findById(userId);
  const opponent = await User.findById(opponentId);
  const now = Date.now();

  const userIsOnline = await getOnlineUsers(opponent._id.toString());

  const disallowed = await attackRouteCriterias(user, opponent, batteryCost, now, userIsOnline);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  const finalResult = await fightHacker(user, opponent, batteryCost, now, userIsOnline);

  const updatedUser = await saveAndUpdateUser(finalResult.user);

  await finalResult.opponent.save();
  finalResult.user = null;
  finalResult.now = null;
  let message;
  if (finalResult.bodyguardKilled) {
    message = `You attacked ${opponent.name} and killed a bodyguard!`;
  } else if (finalResult.bodyguardAttacked) {
    message = `You attacked ${opponent.name} and damaged a bodyguard!`;
  } else if (!finalResult.bodyguardAttacked && !finalResult.bodyguardKilled) {
    message = `You attacked ${opponent.name} and dealt ${finalResult.damageDealt} damage`;
  }
  if (finalResult.opponent.playerStats.currentFirewall <= 0) {
    message = 'SHUTDOWN! Target is dead';
  }
  finalResult.opponent = null;

  return res.status(200).json({
    success: true,
    message,
    finalResult,
    user: updatedUser,

  });
});

module.exports = router;
