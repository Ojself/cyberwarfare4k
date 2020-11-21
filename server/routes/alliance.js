const express = require("express");

const router = express.Router();
const User = require("../models/User");
const Alliance = require("../models/Alliance");
const {
  checkCreateAllianceCriteria,
  findAllianceStats,
} = require("../middlewares/middleAlliance");

// TODO SEEDS ARE NOT WORKING. alliances do not have members in it

// @GET
// PRIVATE
// Retrives all alliances with stats

router.get("/", async (req, res) => {
  const alliances = await Alliance.find();
  res.status(200).json({
    success: true,
    message: "Alliances loaded..",
    alliances,
  });
});
// @GET
// PRIVATE
// Retrives all alliances with stats

router.get("/ladder", async (req, res) => {
  const alliances = await Alliance.find().populate("members", [
    "hackSkill",
    "crimeSkill",
    "currencies",
    "fightInformation",
    "playerStats",
    "name",
  ]);
  const totStats = findAllianceStats(alliances);
  res.status(200).json({
    success: true,
    message: "alliances ladder loaded..",
    totStats,
  });
});

// creating an alliance
router.post("/", async (req, res) => {
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
  user.alliance = alliance._id;
  user.bitcoinDrain(createCost);
  await alliance.save();
  await user.save();

  return res.status(200).json({
    success: true,
    message: `${alliance.name} has been created!`,
  });
});

router.post("/invite", async (req, res) => {
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

router.get("/test", async (req, res) => {
  // const userId = req.user._id;
  // const user = await User.findById(userId);

  const alliances = await Alliance.find({});

  alliances[0].kickMember();
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

router.get("/:allianceId", async (req, res) => {
  const { allianceId } = req.params;
  const alliance = await Alliance.findById(allianceId);

  res.status(200).json({
    success: true,
    message: `${alliance.name} loaded....`,
    alliance,
  });
});

module.exports = router;
