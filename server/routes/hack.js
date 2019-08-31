const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const {
  pettyCrime,
  pettyHackRouteCriterias
} = require('../middlewares/middlePettyHack');
const {
  crimeRouteCriterias,
  fightCrime
} = require('../middlewares/middleCrime');
const router = express.Router();
const User = require('../models/User');
const Crime = require('../models/Crime');

// @POST
// PRIVATE
// User starts interval that calls this route every 4 sec and commit petty crime

router.post('/pettyCrime', isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const batteryCost = 5;

  let message = pettyHackRouteCriterias(user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  const results = await pettyCrime(user);

  res.status(200).json({
    success: true,
    message: 'pettyCrime commited',
    results
  });
});

// @GET
// PRIVATE
// Retrieves all crimes that are available

// todo, filter out the unavialble crimes

router.get('/crimes', async (req, res, next) => {
  const crimes = await Crime.find();
  res.status(200).json({
    success: true,
    message: 'Crimes loaded',
    crimes
  });
});

// @POST
// PRIVATE
// Commit crime route.

router.post('/crimes', async (req, res, next) => {
  const userId = req.user;
  const { crimeId } = req.body;

  const crime = await Crime.findById(crimeId);
  const user = await User.findById(userId);

  const batteryCost = 7;

  let message = crimeRouteCriterias(crime, user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  // commits crime and returns result object
  let finalResult = await fightCrime(user, crime, batteryCost);

  return res.status(200).json({
    success: true,
    message: 'Crime commited',
    finalResult
  });
});

// @POST
// PRIVATE
// User can hack another plater.

router.post('/profile/:opponentId/attack', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { opponentId } = req.params;
  const opponent = await User.findById(opponentId);

  const batteryCost = 10;

  let message = attackRouteCriterias(user, opponent, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  const finalResult = await fightHacker(user, opponent, batteryCost);

  res.status(200).json({
    success: true,
    // message: `You did something`,
    finalResult
  });
});
module.exports = router;
