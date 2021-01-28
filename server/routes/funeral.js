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
    .populate('comments.creator')
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

const postFuneralCommentCriteria = (user, funeralMember, comment, flower) => null;

router.post('/:id', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { id } = req.params;
  const { comment, flower } = req.body;
  const funeralMember = await Funeral.findById(id);

  const disallowed = postFuneralCommentCriteria(user, funeralMember, comment, flower);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  const flowerCost = 10;
  user.bitCoinDrain(flowerCost);

  const updatedUser = await saveAndUpdateUser(user);

  funeralMember.postComment(user._id, comment, flower);
  const updatedFuneralMember = await funeralMember.save();

  return res.status(200).json({
    success: true,
    message: 'comment posted for ',
    user: updatedUser,
    funeralMember: updatedFuneralMember,
  });
});

module.exports = router;
