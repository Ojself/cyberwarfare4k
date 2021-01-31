const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Funeral = require('../models/Funeral');

const { saveAndUpdateUser } = require('../logic/_helpers');

// @GET
// PRIVATE
// Retrives all funerals

router.get('/', async (req, res) => {
  const funerals = await Funeral.find()
    .populate('alliance', 'name')
    .lean();

  res.status(200).json({
    success: true,
    message: 'funerals loaded..',
    funerals,
  });
});

// @GET
// PRIVATE
// Retrives specific funeral

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const funeralMember = await Funeral.findById(id)
    .populate('alliance', 'name')
    .populate('comments.creator', 'name')
    .lean();

  return res.status(200).json({
    success: true,
    message: `Funeral for ${funeralMember.name} loaded..`,
    funeralMember,
  });
});

// @POST
// PRIVATE
// Post funeral comment to specific id

const postFuneralCommentCriteria = (user, funeralMember, comment, flowerCost) => {
  if (!user || !funeralMember) {
    return 'Something went wrong..';
  }
  if (!comment) {
    return 'Missing input';
  }
  if (comment.length > 250) {
    return 'Comment too long';
  }
  if (user.playerStats.bitCoins < flowerCost) {
    return 'Insuccifcent funds';
  }
  if (comment.includes('<script')) {
    return 'No need for your script tag here';
  }
  return null;
};

router.post('/:id', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { id } = req.params;
  const { comment, flower } = req.body;
  const funeralMember = await Funeral.findById(id);
  const flowerCosts = {
    1: 50,
    2: 1000,
    3: 75000,
    4: 250000,
    5: 1000000,
  };

  const flowerCost = flowerCosts[flower];
  const disallowed = postFuneralCommentCriteria(user, funeralMember, comment, flowerCost);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  user.bitCoinDrain(flowerCost);
  const updatedUser = await saveAndUpdateUser(user);

  funeralMember.postComment(user._id, comment, flower);

  const savedFuneralMember = await funeralMember.save();
  const populatedMember = await savedFuneralMember
    .populate('alliance', 'name')
    .populate('comments.creator', 'name')
    .execPopulate();

  return res.status(200).json({
    success: true,
    message: `Condolence left for ${populatedMember.name}`,
    user: updatedUser,
    funeralMember: populatedMember,
  });
});

module.exports = router;
