const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Alliance = require('../models/Alliance');
const {
  checkCreateAllianceCriteria,
  findAllianceStats,
} = require('../middlewares/middleAlliance');

// TODO SEEDS ARE NOT WORKING. alliances do not have members in it

// @GET
// PRIVATE
// Retrives all alliances with stats

/* **********UNUSED?? */

/* router.get('/', async (req, res) => {
  const alliances = await Alliance.find().populate('members');
  console.log(alliances);

  const totStats = findAllianceStats(alliances);
  stats = getShuffledArr(stats);
  res.status(200).json({
    success: true,
    message: 'alliances loaded..',
    totStats,
  });
});

 */
// @GET
// PRIVATE
// Retrives all alliances with stats

router.get('/ladder', async (req, res) => {
  let alliances;
  try {
    alliances = await Alliance.find().populate('members', [
      'hackSkill',
      'crimeSkill',
      'currencies',
      'fightInformation',
      'playerStats',
      'name',
    ]);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }
  const totStats = findAllianceStats(alliances);
  res.status(200).json({
    success: true,
    message: 'alliances ladder loaded..',
    totStats,
  });
});

router.post('/create', async (req, res) => {
  const userId = req.user_id;
  const { allianceChoise } = req.body;

  const user = await User.findById(userId);
  const alliance = await Alliance.findOne({ name: allianceChoise });

  const message = checkCreateAllianceCriteria(user, alliance);

  if (message) {
    return res.status(403).json({
      success: false,
      message,
    });
  }

  const newAlliance = new Alliance({
    name: allianceChoise,
    members: [userId],
  });
  newAlliance.save();

  return res.status(200).json({
    success: true,
    message: `${allianceChoise} hats created`,
  });
});

router.post('/invite', async (req, res) => {
  // const userId = req.user._id;
  // const user = await User.findById(userId);

  const { invitedPlayer } = req.body;
  const player = await User.findById(invitedPlayer);
  // const allianceName = user.alliance;

  //  const invitationText = `<p>${user.name} has invited you to join
  // ${allianceName} hats.<a href="alliance/accept/${allianceName}">Accept</a> or
  // <a href="alliance/decline/${allianceName}">decline</a></p>`;

  res.status(200).json({
    success: true,
    message: `invitation sent to ${player.name}`,
  });
});

// router.delete('/unInvite', async (req, res) => {
//   const userId = req.user._id;
//   const { invitedPlayer } = req.body;

//   const user = await User.findById(userId);

//   /* if you are not boss, consig ub, or cpt */
// })

// router.get('/accept/:allianceName', async (req, res) => {
// const userId = req.user._id;
// const { allianceName } = req.params;
//
// const user = await User.findById(userId);
// });
//
// router.delete('/decline/:allianceName', async (req, res) => {
// const userId = req.user._id;
// const { allianceName } = req.params;
//
// const user = await User.findById(userId);
// });
//
// router.post('/leave', async (req, res) => {
// const userId = req.user._id;
// const user = await User.findById(userId);
// // send notification to boss
// });
//
// router.post('/kick', async (req, res) => {
// const userId = req.user._id;
// const user = await User.findById(userId);
//
// const { playerId, newRole } = req.body;
// const player = await User.findById(playerId);
// });
//
// router.put('/change-position', async (req, res) => {
// const userId = req.user._id;
// const user = await User.findById(userId);
//
// const { playerId, newRole } = req.body;
// const player = await User.findById(playerId);
//
//  if check user is boss,ub,consig
// everyone
// });
//
// router.delete('/dissolve', async (req, res) => {
// const userId = req.user._id;
// const user = await User.findById(userId);
//
// if (user.allianceRole !== 'Boss') {
// return res.status(403).json({
//      success: false,
//      message: 'Only the boss can do this',
// });
// }
// const alliance = await Alliance.findOneAndDelete(user.alliance);
//
// dissolveAlliance();
//
// res.status(200).json({
// success: true,
// message: `${alliance.name} has ceased to exist..`,
// });
// });

router.get('/:allianceId', async (req, res) => {
  const { allianceId } = req.params;
  const alliance = await Alliance.findById(allianceId);

  res.status(200).json({
    success: true,
    message: `${alliance.name} loaded....`,
    alliance,
  });
});


module.exports = router;
