const express = require("express");
const { isLoggedIn } = require("../middlewares/middleAuth");
const { nullifyValues } = require("../middlewares/middleHelpers");
const { getAllUsers } = require("./helper");
const router = express.Router();
const User = require("../models/User");
const Item = require("../models/Item");
const City = require("../models/City");
const Session = require("../models/Session");

// might be written wrongly TODO
// Ensures that email confirmation is been made
function ensureIsSetup(req, res, next) {
  if (req.user.account.status === "Active") {
    return next();
  } else {
    res.redirect("/");
  }
}

//isSetup === true?
/* function ensureIsSetup(req, res, next) {
  if (req.user.isSetup()) {
    return next();
  } else {
    res.redirect("/");
  }
} */

// @POST
// PRIVATE
// User setup. User is being sent here in order to put in name, set stats and city

// todo
// create default names, city and alliance
// force user here if !user.isSetup
// create route criterias

router.post("/createUser", isLoggedIn, async (req, res, next) => {
  console.log("you are now in the create user route");

  const userId = req.user._id;
  const user = await User.findById(userId);
  const { name, cityString } = req.body;

  if (user.account.isSetup) {
    console.log("user is already setup");
    return res.status(400).json({
      success: false,
      message: "user is already setup"
    });
  }

  if (!name || !cityString) {
    return res.status(409).json({
      success: false,
      message: "Missing parameters.."
    });
  }
  // todo, addtoset city resident
  // todo, send through criteria route
  const city = await City.findOne({ name: cityString });
  const allUsers = await User.find();

  if (
    name.toLowerCase().startsWith("npc") ||
    name.toLowerCase().startsWith("unconfirmed")
  ) {
    return res.status(409).json({
      success: false,
      message: `${name} is not allowed`
    });
  }
  if (allUsers.find(name => allUsers.name)) {
    return res.status(409).json({
      success: false,
      message: "name already exists.."
    });
  }

  setupPlayer(user, name, city);

  res.status(200).json({
    success: true,
    message: `user: ${name} created`
  });
});

// todo extract this to somewhere else
function setupPlayer(user, name, city) {
  user.name = name;
  user.playerStats.city = city._id;
  user.account.isSetup = true;
  user.save();
  city.residents.push(user._id);
  city.save();
}

// @GET
// PRIVATE
// Same as my profile. being used in the navbar for stats
router.get("/get-nav-user", async (req, res, next) => {
  console.log("get nav user");
  const userId = req.user._id;
  try {
    const user = await User.findById(userId)
      .populate("playerStats.city", "name")
      .populate("alliance", "name");

    res.status(200).json({
      success: true,
      message: "nav user loaded..",
      user
    });
  } catch (err) {
    res.status(400).json({
      success: true,
      message: err.toString()
    });
  }
  /* todo, too much information is being passsed */
});

// @GET
// PRIVATE
// Retrives player profile

router.get("/my-profile", isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).populate("alliance", "name");
    res.status(200).json({
      success: true,
      message: "user loaded..",
      user
    });
  } catch (err) {
    next(err);
  }
});

// @GET
// PRIVATE
// Retrives hackers

router.get("/opponent/", async (req, res, next) => {
  const users = await getAllUsers(false, true);
  res.status(200).json({
    success: true,
    message: "all hackers loaded..",
    users
  });
});

// @GET
// PRIVATE
// Retrives hacker profile

router.get("/opponent/:id", async (req, res, next) => {
  const opponentId = req.params.id;
  try {
    const opponent = await User.findById(opponentId);
    res.status(200).json({
      success: true,
      message: "opponent loaded..",
      opponent
    });
  } catch (err) {
    console.log("err", err);
  }
});

// @GET
// PRIVATE
// Gets all user

// todo add query to sort differently. by income, rank, kills etc
router.get("/ladder", async (req, res, next) => {
  let users = await User.find().populate("alliance", "name");

  users = users
    .filter(u => /^(?!unconfirmed).*/.test(u.name))
    .map(user =>
      nullifyValues(user, [
        "account",
        "hackSkill",
        "crimeSkill",
        "marketPlaceItems",
        "specialWeapons",
        "stash",
        "currencies",
        "email"
      ])
    );
  users = getShuffledArr(users);

  res.status(200).json({
    success: true,
    message: "users loaded..",
    users
  });
});

// @POST
// PRIVATE
// Lets user upgrade his own stats whenever he levels up

// extract route criterias and functionality

router.post("/upgradeStats", isLoggedIn, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { statPoint } = req.body;

  if (user.playerStats.statPoints <= 0) {
    return res.status(400).json({
      message: "no more statpoints"
    });
  }

  user.playerStats.statPoints -= 1;
  switch (statPoint) {
    case "firewall":
      user.playerStats.maxFirewall += 5;
      user.playerStats.currentFirewall += 5;
      break;
    case "cpu":
      user.hackSkill.cpu += 1;
      break;
    case "antivirus":
      user.hackSkill.antivirus += 1;
      break;
    case "encryption":
      user.hackSkill.encryption += 1;
      break;
    default:
      // gives back statpoints if something went wrong
      user.playerStats.statPoints += 1;
  }
  user.save();
  return res.status(200).json({
    message: `${statPoint.toUpperCase()} upgraded`,
    success: true
  });
});

// @POST
// PRIVATE
// Allows money transfer between players rank > 2
router.post("/transfer/:receiverId", async (req, res, next) => {
  const { receiverId } = req.params;
  const { amount } = req.body;
  const userId = req.user._id;

  const receiver = await User.findById(profileId);
  const user = await User.findById(userId);

  const message = checkTransferCriteria();

  if (message) {
    res.status(400).json({
      success: false,
      message
    });
  }

  function checkTransferCriteria(user, receiver, amount) {
    if (receiver.playerStats.bitcoins < amount) {
      return "Insufficent funds..";
    }
    if (user.playerStats.rank < 2) {
      return "You need a higher rank in order to transfer moeny..";
    }
    if (receiver.playerStats.rank < 2) {
      return "Receiver rank is too low..";
    }
    return null;
  }

  doTransferHere();
  function doTransferHere() {
    user.minusMoney();
    receiver.gainMoney();
  }

  res.status(200).json({
    success: true,
    message: `You transfered ${amount} to ${receiver.name}..`
  });
});

// @GET
// PRIVATE
// Gets all online users

router.get("/online", async (req, res, next) => {
  // Default expire for session
  const twoWeeks = 1000 * 60 * 60 * 24 * 7 * 2;
  // only those who have activity from last five minutes
  const fiveMin = 1000 * 60 * 5;
  // this exact date
  const now = Date.now();
  // above variables put together
  const limitTime = new Date(now + twoWeeks - fiveMin);
  console.log(limitTime, "limitTime");
  let onlineIds;

  await Session.find().then(result => {
    console.log(result[0].expires, result[0].expires > limitTime, "result");
    const filteredIds = result
      .filter(x => x.expires > limitTime)
      .map(y => y.session.match(/[a-f\d]{24}/g, ""))
      .filter(el => el != null);
    onlineIds = [].concat(...filteredIds);
  });
  console.log(onlineIds, "onlineids");
  const onlinePlayers = await User.find({ _id: { $in: onlineIds } });

  return res.status(200).json({
    success: true,
    message: "Online players loaded..",
    onlinePlayers
  });
});

const getShuffledArr = arr => {
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i != rand))];
};

module.exports = router;
