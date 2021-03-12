const express = require('express');
const {
  getOnlineUsers,
  saveAndUpdateUser,
  generateNotification,
} = require('../logic/_helpers');

const router = express.Router();

const { pettyCrime, pettyHackRouteCriterias } = require('../logic/pettyHack');
const { crimeRouteCriterias, fightCrime } = require('../logic/crime');
const {
  fraudHacker,
  fraudRouteCriteria,
  attackRouteCriterias,
  fightHacker,
} = require('../logic/hack');

const getHackFeedback = (finalResult, opponentName) => {
  const currentCityName = finalResult.user.playerStats.city.name;
  const cityNameMessage = `in ${currentCityName}`;
  let message;
  let notification;
  if (finalResult.bodyguardKilled) {
    message = `You attacked ${opponentName} and killed a bodyguard! ${cityNameMessage}`;
    notification = `${finalResult.user.name} attacked you and killed a bodyguard ${cityNameMessage}!`;
  } else if (finalResult.bodyguardAttacked) {
    message = `You attacked ${opponentName} and damaged a bodyguard! ${cityNameMessage}`;
    notification = `${finalResult.user.name} attacked you and wounded your bodyguard ${cityNameMessage}`;
  } else if (!finalResult.bodyguardAttacked && !finalResult.bodyguardKilled) {
    message = `You attacked ${opponentName} and dealt ${finalResult.damageDealt} damage ${cityNameMessage}`;
    notification = `${finalResult.user.name} attacked you and dealt ${finalResult.damageDealt} damage ${cityNameMessage}!`;
  }
  if (finalResult.opponent.playerStats.currentFirewall <= 0) {
    message = `SHUTDOWN! ${opponentName} is dead`;
    notification = `You were shutdown by ${finalResult.user.name}`;
  }

  if (finalResult.playerGains.exp) {
    message += `-- ${finalResult.playerGains.exp} XP! `;
  }
  return { message, notification };
};

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

  const batteryCost = 1;
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
    const crimes = await Crime.find({ gracePeriod: { $lte: now } }).sort({
      crimeType: 1,
      difficulty: 1,
    });
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

const generateUserFeedback = (result) => {
  let message;
  if (result.won) {
    message = `SUCCESS: You gained ${result.playerGains.bitCoins} bitcoins and ${result.playerGains.exp} xp!`;
  } else {
    message = 'You failed..';
  }
  return message;
};

// @POST
// PRIVATE
// Commit crime route.

router.post('/crimes', async (req, res) => {
  const userId = req.user._id;
  const { crimeId } = req.body;
  const batteryCost = 3;
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
  const crimes = await Crime.find({ gracePeriod: { $lte: now } })
    .sort({ crimeType: 1, difficulty: 1 })
    .lean();

  const userFeedback = generateUserFeedback(finalResult);

  return res.status(200).json({
    success: true,
    message: userFeedback,
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

  const disallowed = await fraudRouteCriteria(user, opponent, batteryCost, now);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  const finalResult = await fraudHacker(user, opponent, batteryCost, now);
  const updatedUser = await saveAndUpdateUser(finalResult.user);

  await finalResult.opponent.save();

  const notificationMessage = `${finalResult.user.name} stole ${finalResult.playerGains.bitCoinStolen} from you!`;
  await generateNotification(finalResult.opponent._id, notificationMessage);
  finalResult.user = null;
  finalResult.opponent = null;
  finalResult.now = null;

  const message = `You stole ${finalResult.playerGains.bitCoinStolen} from ${opponent.name}`;
  await generateNotification(
    user._id,
    `${message} in ${updatedUser.playerStats.city.name}`,
    'Logs',
    true,
  );
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

  const disallowed = await attackRouteCriterias(
    user,
    opponent,
    batteryCost,
    now,
  );

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  const opponentName = opponent.name.slice();

  const finalResult = await fightHacker(
    user,
    opponent,
    batteryCost,
    now,
    userIsOnline,
  );

  const updatedUser = await saveAndUpdateUser(finalResult.user);

  const feedback = getHackFeedback(finalResult, opponentName);
  await generateNotification(finalResult.opponent._id, feedback.notification);
  await generateNotification(
    finalResult.user._id,
    feedback.message,
    'Logs',
    true,
  );
  await finalResult.opponent.save();

  finalResult.user = null;
  finalResult.now = null;
  finalResult.opponent = null;

  return res.status(200).json({
    success: true,
    message: feedback.message,
    finalResult,
    user: updatedUser,
  });
});

module.exports = router;
