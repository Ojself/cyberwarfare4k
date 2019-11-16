const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Alliance = require("../models/Alliance");

// @GET
// PRIVATE
// Retrives all alliances

router.get("/ladder", async (req, res, next) => {
  let alliances = await Alliance.find().populate("members", [
    "hackSkill",
    "crimeSkill",
    "currencies",
    "fightInformation",
    "playerStats",
    "name"
  ]);

  let stats = findAllianceStats(alliances);
  stats = getShuffledArr(stats);
  res.status(200).json({
    success: true,
    message: "alliances loaded..",
    stats
  });
});

router.post("/create", async (req, res) => {
  const userId = req.user_id;
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
  /* this destroys everyone */
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
    return "alliance already exist";
  }
  // if user doesn't have 1000000
  // if user doesn't have level 5

  return null;
}

const getShuffledArr = arr => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i != rand))];
};

// forgive me for this function
function findAllianceStats(alliances) {
  const result = [];
  for (let i = 0; i < alliances.length; i++) {
    const allianceStats = {
      name: alliances[i].name,
      members: alliances[i].members.length,
      _id: alliances[i]._id,
      totHackSkill: 0,
      totCrimeSkill: 0,
      totCurrencies: 0,
      totWealth: 0,
      totBounty: 0,
      totRank: 0,
      totShutdowns: 0,
      totAttacksInitiated: 0,
      totAttacksVictim: 0,
      totCrimesInitiated: 0,
      totVpnChanges: 0,
      totCurrencyPurchases: 0
    };

    for (let j = 0; j < alliances[i].members.length; j++) {
      allianceStats.totWealth = Object.values(
        alliances[i].members[j].hackSkill
      ).reduce((t, n) => t + n);

      allianceStats.totHackSkill = Object.values(
        alliances[i].members[j].hackSkill
      ).reduce((t, n) => t + n);

      allianceStats.totCrimeSkill = Object.values(
        alliances[i].members[j].crimeSkill
      ).reduce((t, n) => t + n);

      allianceStats.totCurrencies = Object.values(
        alliances[i].members[j].currencies
      ).reduce((t, n) => t + n);

      allianceStats.totWealth += alliances[i].members[j].playerStats.bitCoins;

      allianceStats.totBounty += alliances[i].members[j].playerStats.bounty;

      allianceStats.totRank += alliances[i].members[j].playerStats.rank;

      allianceStats.totShutdowns +=
        alliances[i].members[j].fightInformation.shutdowns;

      allianceStats.totAttacksInitiated +=
        alliances[i].members[j].fightInformation.attacksInitiated;

      allianceStats.totAttacksVictim +=
        alliances[i].members[j].fightInformation.attacksVictim;

      allianceStats.totCrimesInitiated +=
        alliances[i].members[j].fightInformation.crimesInitiated;

      allianceStats.totVpnChanges +=
        alliances[i].members[j].fightInformation.vpnChanges;

      allianceStats.totCurrencyPurchases +=
        alliances[i].members[j].fightInformation.currencyPurchases;
    }
    result.push(allianceStats);
  }
  return result;
}

module.exports = router;
