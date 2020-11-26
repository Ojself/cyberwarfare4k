const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Alliance = require('../models/Alliance');
const {
  checkCreateAllianceCriteria,
  findAllianceStats,
} = require('../middlewares/middleAlliance');
const { saveAndUpdateUser } = require('./helper');

// TODO SEEDS ARE NOT WORKING. alliances do not have members in it

// @GET
// PRIVATE
// Retrives all alliances

router.get('/', async (req, res) => {
  const alliances = await Alliance.find();
  res.status(200).json({
    success: true,
    message: 'Alliances loaded..',
    alliances,
  });
});

// @GET
// PRIVATE
// Retrives all alliances with stats

router.get('/ladder', async (req, res) => {
  const populateValues = [
    'hackSkill',
    'crimeSkill',
    'currencies',
    'fightInformation',
    'playerStats',
    'name',
  ];
  const alliances = await Alliance.find()
    .populate('boss', populateValues)
    .populate('cto', populateValues)
    .populate('analyst', populateValues)
    .populate('firstLead', populateValues)
    .populate('secondLead', populateValues)
    .populate('firstMonkeys', populateValues)
    .populate('secondMonkeys', populateValues);
  const totStats = findAllianceStats(alliances);
  res.status(200).json({
    success: true,
    message: 'alliances ladder loaded..',
    totStats,
  });
});

// creating an alliance
router.post('/', async (req, res) => {
  const userId = req.user._id;
  const { allianceId } = req.body;

  const createCost = 1000000;

  const alliance = await Alliance.findById(allianceId);
  const user = await User.findById(userId);

  const disallowed = checkCreateAllianceCriteria(user, alliance, createCost);

  if (disallowed) {
    return res.status(403).json({
      success: false,
      message: disallowed,
    });
  }
  alliance.boss = user._id;
  alliance.active = true;
  user.createAlliance(createCost, alliance._id);
  await alliance.save();
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${alliance.name} has been created!`,
    user: updatedUser,
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

// router.get('/invitation/:allianceName', async (req, res) => {
// const userId = req.user._id;
// const { allianceName } = req.params;
//
// const user = await User.findById(userId);
// });
//
// router.delete('/invitation/:allianceName', async (req, res) => {
// const userId = req.user._id;
// const { allianceName } = req.params;
//
// const user = await User.findById(userId);
// });
//

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

// @GET
// PRIVATE
// Retrives one alliance

router.get('/:id', async (req, res) => {
  const nameAndAvatar = ['name', 'account.avatar'];
  const alliance = await Alliance.findById(req.params.id)
    .populate('boss', nameAndAvatar)
    .populate('cto', nameAndAvatar)
    .populate('analyst', nameAndAvatar)
    .populate('firstLead', nameAndAvatar)
    .populate('secondLead', nameAndAvatar)
    .populate('firstMonkeys', nameAndAvatar)
    .populate('secondMonkeys', nameAndAvatar);

  res.status(200).json({
    success: true,
    message: 'Alliance loaded..',
    alliance,
  });
});

router.patch('/leave', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  // todo criterias
  // todo send notification
  const alliance = await Alliance.findById(user.alliance);
  alliance.leaveAlliance(req.user._id, user.allianceRole);
  user.leaveAlliance();
  alliance.leaveAlliance(userId);
  await alliance.save();
  const updatedUser = await saveAndUpdateUser(user);
  res.status(200).json({
    success: true,
    message: `You left ${alliance.name}..`,
    user: updatedUser,
  });
});

module.exports = router;
