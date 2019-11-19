const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { tranfserCriteria } = require("../middlewares/middleLedger.js");
const { getAllUsers } = require("./helper"); // move to middleware?

// @GET
// PRIVATE
// Retrives all users

router.get("/", async (req, res, next) => {
  const ledgerFilter = [
    "account",
    "hackSkill",
    "crimeSkill",
    "marketPlaceItems",
    "specialWeapons",
    "fightInformation",
    "stash",
    "currencies",
    "playerStats",
    "email"
  ];
  const users = await getAllUsers(null, true);
  if (!users) {
    return res.status(400).json({
      success: false,
      message: "no hackers found, try again later.."
    });
  }

  res.status(200).json({
    success: true,
    message: "hackers loaded..",
    users
  });
});

// @POST
// PRIVATE
// Adds bounty to a user

router.post("/deposit", async (req, res, next) => {
  const { name, bounty } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const opponent = await User.findOne({ name });

  const message = addBountyCriteria(user, opponent, bounty);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }
  user.bitcoinDrain(bounty);
  opponent.addBounty(user, bounty);

  return res.status(200).json({
    success: true,
    message: `${bounty} added to ${opponent.name}s bounty`
  });
});

// @POST
// PRIVATE
// Adds bounty to a user

router.post("/withdraw", async (req, res, next) => {
  const { name, bounty } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const opponent = await User.findOne({ name });

  const message = addBountyCriteria(user, opponent, bounty);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }
  user.bitcoinDrain(bounty);
  opponent.addBounty(user, bounty);

  return res.status(200).json({
    success: true,
    message: `${bounty} added to ${opponent.name}s bounty`
  });
});

// @POST
// PRIVATE
// Transfer money from hacker x to hacker y

router.post("/transfer/:id", async (req, res, next) => {
  const { receiverId } = req.body;
  const fee = 1.05;
  const transferAmount = req.body.transferAmount * fee;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const receiver = await User.findById(receiverId);

  const message = tranfserCriteria(user, receiver, transferAmount * fee);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  user.ledgerDrain(transferAmount * fee);
  receiver.ledgerGain(transferAmount);

  return res.status(200).json({
    success: true,
    message: `${transferAmount} was sent to ${receiver.name}`
  });
});

module.exports = router;
