const express = require("express");

const router = express.Router();
const User = require("../models/User");
const Alliance = require("../models/Alliance");

// @GET
// PRIVATE
// Retrives all alliances

router.get("/", async (req, res) => {
  const alliances = await Alliance.find();

  return res.status(200).json({
    success: true,
    message: "alliances loaded..",
    alliances
  });
});

// todo lean() on mongoose

router.post("/create", async (req, res) => {
  const userId = req.user_id;
  console.log(req.user);
  const { allianceChoise } = req.body;

  const user = await User.findById(userId);
  const alliance = await Alliance.findOne({ name: allianceChoise });

  const message = checkCreateAllianceCriteria(user, alliance);

  if (message) {
    return res.status(403).json({
      success: false,
      message
    });
  }

  const newAlliance = new Alliance({
    name: allianceChoise,
    members: [userId]
  });
  newAlliance.save();

  return res.status(200).json({
    success: true,
    message: `${allianceChoise} hats created`
  });
});

router.post("/invite", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { invitedPlayer } = req.body;
  const player = await User.findById(invitedPlayer);
  const allianceName = user.alliance;

  const invitationText = `<p>${user.name} has invited you to join ${allianceName} hats.<a href="alliance/accept/${allianceName}">Accept</a> or <a href="alliance/decline/${allianceName}">decline</a></p>`;

  res.status(200).json({
    success: true,
    message: `invitation sent to ${player.name}`
  });
});

router.delete("/unInvite", async (req, res) => {
  const userId = req.user._id;
  const { invitedPlayer } = req.body;

  const user = await User.findById(userId);

  /* if you are not boss, consig ub, or cpt */
});

router.get("/accept/:allianceName", async (req, res) => {
  const userId = req.user._id;
  const { allianceName } = req.params;

  const user = await User.findById(userId);
});

router.delete("/decline/:allianceName", async (req, res) => {
  const userId = req.user._id;
  const { allianceName } = req.params;

  const user = await User.findById(userId);
});

router.post("/leave", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  // send notification to boss
});

router.post("/kick", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { playerId, newRole } = req.body;
  const player = await User.findById(playerId);
});

router.put("/change-position", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { playerId, newRole } = req.body;
  const player = await User.findById(playerId);

  // if check user is boss,ub,consig
  // everyone
});

router.delete("/dissolve", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (user.allianceRole !== "Boss") {
    return res.status(403).json({
      success: false,
      message: "Only the boss can do this"
    });
  }
  const alliance = await Alliance.findOneAndDelete(user.alliance);

  dissolveAlliance();

  res.status(200).json({
    success: true,
    message: `${alliance.name} has ceased to exist..`
  });
});

router.get("/:allianceId", async (req, res) => {
  const { allianceId } = req.params;
  const alliance = await Alliance.findById(allianceId);

  res.status(200).json({
    success: true,
    message: `${alliance.name} loaded....`,
    alliance
  });
});

function dissolveAlliance() {
  User.find().then(user => {
    user.map(user => {
      user.allianceRole = "";
      user.alliance = "";
      user.save();
    });
  });
}

function checkCreateAllianceCriteria(user, alliance) {
  if (!existingValue(user)) {
    return "ùser not found";
  }
  if (!existingValue(alliance)) {
    return "user already exist";
  }
  // if user doesn't have 1000000
  // if user doesn't have level 5

  return null;
}

module.exports = router;
