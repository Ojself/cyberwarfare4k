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
  const userId = req.body.body; // remove this. only for testing purposes

  const user = await User.findById(userId).populate("playerStats.city", "name");

  const batteryCost = 5;

  const message = pettyHackRouteCriterias(user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

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
    const crimes = await Crime.find().sort({ available: true });
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
  const userId = req.user;
  const { crimeId } = req.body;

  const crime = await Crime.findById(crimeId);
  const user = await User.findById(userId);

  const batteryCost = 7;

  const message = crimeRouteCriterias(crime, user, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  // commits crime and returns result object
  let finalResult = await fightCrime(user, crime, batteryCost);

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
  console.log("attack route", req.body);
  // const userId = req.user._id;
  const userId = req.body.pmuser;
  const user = await User.findById(userId);

  const { opponentId } = req.params;
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
