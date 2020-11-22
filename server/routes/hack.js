const express = require("express");

const router = express.Router();

const {
  pettyCrime,
  pettyHackRouteCriterias,
} = require("../middlewares/middlePettyHack");
const {
  crimeRouteCriterias,
  fightCrime,
} = require("../middlewares/middleCrime");
const {
  attackRouteCriterias,
  fightHacker,
} = require("../middlewares/middleAttack");

const User = require("../models/User");
const Crime = require("../models/Crime");

// @POST
// PRIVATE
// User starts interval that calls this route every x sec and commit petty crime

router.post("/pettyCrime", async (req, res) => {
  const userId = req.user._id;
  let user;
  try {
    user = await User.findById(userId).populate("playerStats.city", "name");
  } catch (e) {
    console.error("error: ", e);
    res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }

  const batteryCost = 5;
  const disallowed = pettyHackRouteCriterias(user, batteryCost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  const results = await pettyCrime(user);

  /* Todo send back user? */
  return res.status(200).json({
    success: true,
    message: "pettyCrime commited",
    results: results.pettyResult,
    user: results.updatedUser,
  });
});

// @GET
// PRIVATE
// Retrieves all crimes that are available

router.get("/crimes", async (req, res) => {
  try {
    const crimes = await Crime.find({ available: true });
    return res.status(200).json({
      success: true,
      message: "Crimes loaded..",
      crimes,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.toString(),
    });
  }
});

// @POST
// PRIVATE
// Commit crime route.

router.post("/crimes", async (req, res) => {
  console.log("crime");
  const userId = req.user._id;
  const { crimeId } = req.body;
  const batteryCost = 5;

  const user = await User.findById(userId);
  const crime = await Crime.findById(crimeId);

  const disallowed = crimeRouteCriterias(crime, user, batteryCost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  // commits crime and returns result object
  const finalResult = await fightCrime(user, crime, batteryCost);
  const crimes = await Crime.find({ available: true });

  return res.status(200).json({
    success: true,
    message: "Crime commited..",
    finalResult,
    user: finalResult.user,
    crimes,
  });
});

// @POST
// PRIVATE
// User can hack another plater.
// /opponentId/attack
router.post("/:opponentId", async (req, res) => {
  // const userId = req.user._id
  const { userId } = req.body; // remove this. only for testing purposes
  const { opponentId } = req.params;
  const batteryCost = 10;
  // todo try catch

  const user = await User.findById(userId);
  const opponent = await User.findById(opponentId);
  const message = attackRouteCriterias(user, opponent, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  const finalResult = await fightHacker(user, opponent, batteryCost);
  // finalresult.user = null

  return res.status(200).json({
    success: true,
    message: `You attacked ${opponent._name}`,
    finalResult,
  });
});
module.exports = router;
