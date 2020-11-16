const express = require('express');

const axios = require('axios');

const router = express.Router();
const User = require('../models/User');

const generateQueryString = (game) => {
  const lexi = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let query = '';
  for (let i = 0; i < 6; i += 1) {
    query += lexi[Math.floor(Math.random() * lexi.length)];
  }
  if (game === 'chessathor') {
    query = `#${query}`;
  }
  return query;
};

const validateGithubUserName = async (username, user) => {
  if (user.earnEnergy.githubUserName) {
    return `You already have a github username: ${user.earnEnergy.githubUserName}`;
  }
  const userWithSameUserName = await User.findOne({ 'earnEnergy.githubUserName': username }).lean();
  if (userWithSameUserName) {
    return `${username} is already taken`;
  }
  try {
    await axios.get(`https://api.github.com/users/${username}`);
  } catch (e) {
    return `${username} was not found at github`;
  }
  return null;
};

const validateGame = (game, user, now) => {
  if (!['chessathor', 'megarpg'].includes(game)) {
    return 'Invalid input';
  }
  if (user.earnEnergy[game].code) {
    return `You already have an active code ${user.earnEnergy[game].code}`;
  }

  if (user.earnEnergy[game].expires > now) {
    return 'You can only do this once a day';
  }

  return null;
};

const BATTERYGAIN = {
  chessathor: 15,
  megarpg: 10,
};

// @GET
// PRIVATE
// probably not used

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  return res.status(200).json({
    success: true,
    message: 'user loaded..',
    user,
  });
});

// this is being called from outside
router.post('/redeem', async (req, res) => {
  // todo. ensure useragent and other creds is coming from heroku chessathor or megarpg
  const { code } = req.body;
  const userAgent = req.headers['user-agent'];
  console.log(userAgent, 'ua');
  console.log(req.body, 'reqbody');


  if (!code) {
    return res.status(403).json({
      success: false,
      message: 'Missing input',
    });
  }

  const user = await User.findOne({ $or: [{ 'earnEnergy.megarpg.code': code }, { 'earnEnergy.chessathor.code': code }] });

  if (!user) {
    return res.status(403).json({
      success: false,
      message: 'Invalid input',
    });
  }

  const game = code.startsWith('#') ? 'chessathor' : 'megarpg';
  user.batteryGain(BATTERYGAIN[game]);
  user.earnEnergy[game].code = '';
  await user.save();

  return res.status(200).json({
    success: true,
    message: '00110100 00110010', // 42
    user: user.name,
  });
});


// generates new string
router.post('/', async (req, res) => {
  const { userId } = req.body;// req.user._id
  const { game, githubUserName } = req.body;
  const now = Date.now();
  const user = await User.findById(userId);

  if (!game && !githubUserName) {
    return res.status(403).json({
      success: false,
      message: 'Invalid input',
    });
  }

  if (githubUserName) {
    const disAllowed = await validateGithubUserName(githubUserName, user);
    if (disAllowed) {
      return res.status(403).json({
        success: false,
        message: disAllowed,
      });
    }
    user.earnEnergy.githubUserName = githubUserName;
  }

  if (game) {
    const disAllowed = validateGame(game, user, now);
    if (disAllowed) {
      return res.status(403).json({
        success: false,
        message: disAllowed,
      });
    }
    const code = generateQueryString(game);
    user.earnEnergy[game].code = code;
    user.earnEnergy[game].expires = now + (1000 * 60 * 60 * 24);
  }


  const updatedUser = await user.save();

  return res.status(200).json({
    success: true,
    message: 'Code generated',
    user: updatedUser,
  });
});

module.exports = router;
