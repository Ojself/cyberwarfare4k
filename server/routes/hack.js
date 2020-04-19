const express = require('express');

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
    user = await User.findById(userId);
  } catch (e) {
    console.error('error: ', e);
    res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }

  const batteryCost = 5;
  const message = pettyHackRouteCriterias(user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const results = await pettyCrime(user);

  /* Todo send back user? */
  return res.status(200).json({
    success: true,
    message: 'pettyCrime commited',
    results,
  });
});

// @GET
// PRIVATE
// Retrieves all crimes that are available

router.get('/crimes', async (req, res) => {
  try {
    const crimes = await Crime.find({ available: true });
    return res.status(200).json({
      success: true,
      message: 'Crimes loaded..',
      crimes,
    });
  } catch (err) {
    console.log('err', err);
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
  const batteryCost = 7;
  // const { userId } = req.body; // remove this. only for testing purposes

  const user = await User.findById(userId);
  const crime = await Crime.findById(crimeId);

  const message = crimeRouteCriterias(crime, user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // commits crime and returns result object
  const finalResult = await fightCrime(user, crime, batteryCost);
  finalResult.user = null;

  return res.status(200).json({
    success: true,
    message: 'Crime commited..',
    finalResult,
  });
});

// @POST
// PRIVATE
// User can hack another plater.
// /opponentId/attack
router.post('/:opponentId', async (req, res) => {
  // const userId = req.user._id
  const { userId } = req.body; // remove this. only for testing purposes
  const { opponentId } = req.params;
  const batteryCost = 10;
  // todo try catch

  const user = await User.findById(userId);
  const opponent = await User.findById(opponentId);
  const message = attackRouteCriterias(user, opponent, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const finalResult = await fightHacker(user, opponent, batteryCost);
  // finalresult.user = null

  return res.status(200).json({
    success: true,
    message: `You attacked ${opponent._name}`,
    finalResult,
  });
});
module.exports = router;
