const express = require("express");
const { isLoggedIn } = require("../middlewares/middleAuth");
const {
  pettyCrime,
  pettyHackRouteCriterias
} = require("../middlewares/middlePettyHack");
const {
  crimeRouteCriterias,
  fightCrime
} = require("../middlewares/middleCrime");
const {
  attackRouteCriterias,
  fightHacker
} = require("../middlewares/middleAttack");
const router = express.Router();
const User = require("../models/User");
const Crime = require("../models/Crime");

// @POST
// PRIVATE
// User starts interval that calls this route every 4 sec and commit petty crime

router.post("/pettyCrime", async (req, res, next) => {
  // const userId = req.user._id
  const { userId } = req.body; // remove this. only for testing purposes
  console.log(userId);
  let user;
  try {
    user = await User.findById(userId); //.populate("playerStats.city", "name");
  } catch (err) {
    res.status(400).json({
      // todo check critera function. double code
      success: false,
      message: err.toString()
    });
  }

  const batteryCost = 5;
  const message = pettyHackRouteCriterias(user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }
  console.log(user.playerStats.battery);

  const results = await pettyCrime(user);

  res.status(200).json({
    success: true,
    message: "pettyCrime commited",
    results
  });
});

// @GET
// PRIVATE
// Retrieves all crimes that are available

// todo add try catch

router.get("/crimes", async (req, res, next) => {
  try {
    const crimes = await Crime.find({ available: true });
    res.status(200).json({
      success: true,
      message: "Crimes loaded",
      crimes
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.toString()
    });
  }
});

// @POST
// PRIVATE
// Commit crime route.

router.post("/crimes", async (req, res, next) => {
  const userId = req.user._id;
  const { crimeId } = req.body;
  //const { userId } = req.body; // remove this. only for testing purposes
  console.log(crimeId, "crimeId");
  let crime;
  let user;
  try {
    // reformat todo
    try {
      user = await User.findById(userId);
    } finally {
      crime = await Crime.findById(crimeId);
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.toString()
    });
  }

  const batteryCost = 7;
  const message = crimeRouteCriterias(crime, user, batteryCost);
  if (message) {
    console.log(message, "crimeRouteCriterias message");
    return res.status(400).json({
      success: false,
      message
    });
  }

  // commits crime and returns result object
  const finalResult = await fightCrime(user, crime, batteryCost);
  finalResult.user = null;

  return res.status(200).json({
    success: true,
    message: "Crime commited",
    finalResult
  });
});

// @POST
// PRIVATE
// User can hack another plater.
// /opponentId/attack
router.post("/:opponentId", async (req, res, next) => {
  // const userId = req.user._id
  const { userId } = req.body; // remove this. only for testing purposes
  const { opponentId } = req.params;

  // todo try catch
  const user = await User.findById(userId);
  const opponent = await User.findById(opponentId);

  const batteryCost = 10;

  const message = attackRouteCriterias(user, opponent, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  const finalResult = await fightHacker(user, opponent, batteryCost);

  res.status(200).json({
    success: true,
    message: `You attacked ${opponent._name}`,
    finalResult
  });
});
module.exports = router;
