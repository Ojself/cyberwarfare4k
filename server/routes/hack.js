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

// TODO
// move out the attackroute criterias
// add params for attack
// create user method in model

router.post('/attack', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { opponentId } = req.body;
  // findname?
  const opponent = await User.findById(opponentId);

  const batteryCost = 10;

  let message = attackRouteCriterias(user, opponent, batteryCost);

  Promise.all([userInformation, opponentInformation]).then(result => {
    if (result[0].name === result[1].name) {
      res.status(400).json({
        success: false,
        message: "you can't hack yourself"
      });
      return null;
    }
    if (result[0].battery < 7) {
      res.status(400).json({
        success: false,
        message: 'Insufficent battery'
      });
      return null;
    }
    if (result[0].currentFirewall <= 0) {
      res.status(400).json({
        success: false,
        message: 'You need a firewall to be able to hack other players!'
      });
      return null;
    }
    if (result[1].gracePeriod) {
      res.status(400).json({
        success: false,
        message:
          'The person is under the influence of graceperiod (which last for up to 2 hours)'
      });
      return null;
    }
    if (result[1].currentFirewall <= 0) {
      res.status(400).json({
        success: false,
        message: "You can't kill what's already dead!"
      });
      return null;
    }
    let resultHack = result[0].hackPlayer(result[1]);
    res.status(200).json({
      success: true,
      message: 'hack success',
      result: JSON.stringify(resultHack)
    });
  });
});
module.exports = router;
