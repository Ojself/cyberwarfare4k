const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const { pettyCrime } = require('../middlewares/middlePettyHack');
const { batteryCheck, existingValue } = require('../middlewares/middleHelpers');
const router = express.Router();
const User = require('../models/User');
const Crime = require('../models/Crime');

/* User can click and this will run every 3-4 second until user stops it */
router.post('/pettyCrime', isLoggedIn, async (req, res, next) => {
  console.log('hack/pettyCrime route');
  let userId = req.user._id;
  let user = await User.findById(userId);

  let batteryCost = 5
// todo, create criteria 
  let message = ''

  if (!batteryCheck(user, batteryCost)) {
    return res.status(400).json({
      success: false,
      message: 'insufficent battery'
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

  if (!batteryCheck(user, 7)) {
    return res.status(400).json({
      success: false,
      message: 'insufficent battery'
    });
  }

  if (!existingValue(crime)) {
    return res.status(400).json({
      success: false,
      message: 'no such crime'
    });
  }

  fightCrime(user, crime);

  function fightCrime(user, crime) {
    console.log('fighting crime');
    //user.batteryDrain(5);

    let result = {
      roundResult: [],
      currentHp: [],
      maxHp: opponent.maxFireWall,
      won: false,
      newRank: false,
      gains: {}
    };

    const finalResult = fightBattle(user, crime, result);
  }

  const fightBattle = (user, opponent, result) => {
    // battle over, lost
    // if user has been blocked (encryption) 4 times, battle is over
    if (checkOccuranceLimit(result.roundResult, 'encryption', 4)) {
      console.log('you lost');
      //user.batteryDrain(5);
      result.gains[batteryDrained] = -10;
      return result;
    }

    // battle over, won
    if (opponent.currentFirewall <= 0) {
      console.log('you won');
      result.won = true;
      // function calculate reward
      result.gains = calculateReward(result, opponent.difficulty);
      user.giveMoney(result.gains.bitCoins);
      user.giveExp(result.gains.exp);
      return result;
    }

    // fight blocked by opponent, battle not over
    if (encryptionOccurance >= 1 + this.crimeSkill[opponent.crimeType] / 100) {
      console.log('encryption too high, blocked');
      result.roundResult.push('encryption');
    } else {
      // fight won, battle not over
      results.rounds.push('hit');
    }

    result.currentHp.push(opponent.currentFirewall);
    // recursive
    return fightBattle(user, opponent, result);
  };

  // checks for number of occurance is over
  function checkOccuranceLimit(array, value, x) {
    const result = array.filter(el => el === value);
    return result.length >= x;
  }

  function calculateReward(result, difficulty, multiplier = 1) {
    // Write some amth random stuff here
    result.gains[exp] = 10;
    result.gains[bitCoins] = 10;
  }
  return result.gains;
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
