const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Alliance = require('../models/Alliance');
const Message = require('../models/Message');
const {
  checkCreateAllianceCriteria,
  findAllianceStats,
} = require('../middlewares/middleAlliance');
const { saveAndUpdateUser } = require('./helper');

// @GET
// PRIVATE
// Retrives all alliances

router.get('/', async (req, res) => {
  const alliances = await Alliance.find();
  res.status(200).json({
    success: true,
    message: 'Alliances loaded...',
    alliances,
  });
});

// @GET
// PRIVATE
// Retrives dashboard information

router.get('/dashboard', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const populateValues = [
    'name',
  ];
  const alliance = await Alliance.findById(user.alliance)
    .populate('boss', populateValues)
    .populate('cto', populateValues)
    .populate('analyst', populateValues)
    .populate('firstLead', populateValues)
    .populate('secondLead', populateValues)
    .populate('firstMonkeys', populateValues)
    .populate('secondMonkeys', populateValues)
    .populate('invitedMembers', populateValues)
    .populate('organizePermission', populateValues)
    .populate('forumModeratorPermission', populateValues);

  const users = await User.find({ 'account.isSetup': true })
    .select({ name: 1, alliance: 1 })
    .sort({ name: 1 });

  res.status(200).json({
    success: true,
    message: 'Dashboard loaded...',
    alliance,
    users,

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
  const alliances = await Alliance.find({ active: true })
    .populate('boss', populateValues)
    .populate('cto', populateValues)
    .populate('analyst', populateValues)
    .populate('firstLead', populateValues)
    .populate('secondLead', populateValues)
    .populate('firstMonkeys', populateValues)
    .populate('secondMonkeys', populateValues);
  const totStats = await findAllianceStats(alliances);
  res.status(200).json({
    success: true,
    message: 'alliances ladder loaded...',
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

router.post('/invitation', async (req, res) => {
  const userId = req.user._id;
  const { id } = req.body;

  const user = await User.findById(userId);
  const alliance = await Alliance.findById(user.alliance);
  const invitedUser = await User.findById(id);

  // disallow, already alliance, not exist, already invited,

  const now = new Date(Date.now()).toString().slice(0, 21);
  alliance.inviteMember(now, invitedUser);

  // const allianceName = user.alliance;

  //  const invitationText = `<p>${user.name} has invited you to join
  // ${allianceName} hats.<a href="alliance/accept/${allianceName}">Accept</a> or
  // <a href="alliance/decline/${allianceName}">decline</a></p>`;

  res.status(200).json({
    success: true,
    message: `invitation sent to ${invitedUser.name}`,
  });
});

// invited player declines or accepts invitation
router.patch('/invitation', async (req, res) => {
  console.log(req.body, 'req.body');
  const userId = req.user._id;
  const { id, answer } = req.body;

  const user = await User.findById(userId);
  const alliance = await Alliance.findById(id);
  let message;

  // accepts
  if (answer) {
    const role = Math.random() > 0.5 ? 'firstMonkeys' : 'secondMonkeys';
    alliance.acceptInvitation(userId, role);
    user.alliance = id;
    user.allianceRole = role;
    message = `You have joined ${alliance.name} alliance`;
  } else {
    alliance.declineInvitation(userId);
    message = `You declined ${alliance.name} alliance`;
  }

  await alliance.save();
  await user.save();
  await Message.deleteOne({ allianceInvitation: id, to: userId });

  res.status(200).json({
    success: true,
    message,
    alliance,
  });
});

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
    message: 'Alliance loaded...',
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
    message: `You left ${alliance.name}...`,
    user: updatedUser,
  });
});

module.exports = router;
