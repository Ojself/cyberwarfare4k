const express = require('express');
const axios = require('axios');

const router = express.Router();
const { saveAndUpdateUser } = require('./helper');
const User = require('../models/User');

const handleGithubEvent = async (payload) => {
  const parsed = JSON.parse(payload);
  const { action } = parsed;
  const { login } = parsed.sender;

  const githubUser = await User.findOne({ 'earnBattery.githubUserName': { $regex: new RegExp(login, 'i') } });

  if (githubUser && ['created', 'deleted'].includes(action)) {
    const star = action === 'created';
    githubUser.earnBattery.githubStar = star;
    return githubUser.save();
  }
};

const validategithubUserName = async (username, user) => {
  if (user.earnBattery.githubUserName) {
    return `You already have a github username: ${user.earnBattery.githubUserName}`;
  }
  const userWithSameUserName = await User.findOne({ 'earnBattery.githubUserName': username }).lean();
  if (userWithSameUserName) {
    return `${username} is already taken`;
  }
  try {
    await axios.get(`https://api.github.com/users/${username}`);
  } catch (e) {
    console.error(err);
    return `${username} was not found at github`;
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
    message: 'user loaded...',
    user,
  });
});

// this is being called from outside
router.post('/redeem', async (req, res) => {
  const { code } = req.body;
  console.info(req.body, '/redeem ')
  if (req.body.payload) {
    // check headers
    return handleGithubEvent(req.body.payload);
  }
  if (!code) {
    res.status(403).json({
      success: false,
      message: 'Missing input',
    });
  }
  const formattedCode = new RegExp(code, 'i');
  const user = await User.findOne({ $or: [{ 'earnBattery.megarpg': { $regex: formattedCode } }, { 'earnBattery.chessathor': { $regex: formattedCode } }] });

  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Invalid input',
    });
  }

  const game = code.startsWith('#') ? 'chessathor' : 'megarpg';
  user.batteryGain(BATTERYGAIN[game]);
  user.earnBattery[game] = '';
  await user.save();

  return res.status(200).json({
    success: true,
    message: '00110100 00110010', // 42
    name: user.name,
  });
});

// saves github username
router.post('/', async (req, res) => {
  const userId = req.user._id;
  const { githubUserName } = req.body;
  const user = await User.findById(userId);
  if (!githubUserName) {
    return res.status(403).json({
      success: false,
      message: 'Invalid input',
    });
  }

  const disAllowed = await validategithubUserName(githubUserName, user);
  if (disAllowed) {
    return res.status(403).json({
      success: false,
      message: disAllowed,
    });
  }
  user.earnBattery.githubUserName = githubUserName;

  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: 'Username saved...',
    user: updatedUser,
  });
});

module.exports = router;
