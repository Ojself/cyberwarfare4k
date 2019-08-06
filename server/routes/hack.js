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

// this route is being ran on a interval of 4sec
router.post('/pettyCrime', isLoggedIn, async (req, res, next) => {
  console.log('hack/pettyCrime route');
  let userId = req.user._id;
  let user = await User.findById(userId);

  let batteryCost = 5;

  // checks if everything is in order to perform petty hack
  let message = pettyHackRouteCriterias(user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }
  // calculates if user gets exp, bitcoins, stash, crimeskills etc
  const results = await pettyCrime(user);

  res.status(200).json({
    success: true,
    message: 'pettyCrime commited',
    results
  });
});

router.get('/crimes', async (req, res, next) => {
  console.log('hack/crimes route');

  const crimes = await Crime.find();
  res.status(200).json({
    success: true,
    message: 'Crimes loaded',
    crimes
  });
});

router.post('/crimes', async (req, res, next) => {
  console.log('hack/crimes route ID');
  const userId = req.user._id;
  const { crimeId } = req.body;
  const crime = await Crime.findById(crimeId);
  const user = await User.findById(userId);

  //todo set variables to const
  const batteryCost = 7;

  // Checks if everything is ok in order to commit crime
  let message = crimeRouteCriterias(crime, user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  // commits crime and returns result
  let finalResult = await fightCrime(user, crime, batteryCost);

  res.status(200).json({
    success: true,
    message: 'Crime commited',
    finalResult
  });
});

router.get('/hackPlayer', async (req, res, next) => {
  let users = await User.find();
  if (!users) {
    res.status(400).json({
      success: false,
      message: 'no hackers found, try again later'
    });
    return null;
    res.status(200).json({
      success: true,
      message: 'users loaded',
      users
    });
  }
});

router.get('/hack/hack-player/:id', async (req, res, next) => {
  let userId = req.user._id;
  let slicedId = req.params.id.slice(1);
  let userInformation = await User.findById(req.user._id);
  let opponentInformation = User.findById(slicedId);

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
