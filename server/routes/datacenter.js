const express = require("express");

const {
  purchaseDataCenterCriterias,
  purchaseDataCenter,
  attackDataCenterCriterias,
  attackDataCenter,
} = require("../middlewares/middleDataCenter");

const saveAndUpdateUser = async (user) => {
  const savedUser = await user.save();
  const populatedUser = await savedUser
    .populate("playerStats.city", "name")
    .populate("alliance", "name")
    .execPopulate();
  return populatedUser;
};

const router = express.Router();
const DataCenter = require("../models/DataCenter");
const User = require("../models/User");

// @GET
// PRIVATE
// Retrieve all datacenters and populate which stash is required
// to hack them and which city they belong to

// todo, allow alliance member to heal eachother datacenter?

router.get("/", async (req, res) => {
  const userId = req.user._id;
  let dataCenters = await DataCenter.find()
    .populate("requiredStash", ["name", "price"])
    .populate("city", ["name", "residents"])
    .populate("owner", ["name"]);

  // filter out the datacenters that don't belong to the city the user is in
  dataCenters = dataCenters.filter((el) => {
    const stringifiedObjectId = JSON.stringify(el.city.residents);
    return stringifiedObjectId.includes(userId.toString());
  });

  res.status(200).json({
    dataCenters,
    message: "datacenters loaded....",
    success: true,
  });
});

// @POST
// PRIVATE
// User purchase a datacenter

router.post("/purchase", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCenterName } = req.body;
  const dataCenter = await DataCenter.findOne({ name: dataCenterName });
  const batteryCost = 0;
  const message = purchaseDataCenterCriterias(user, dataCenter, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  purchaseDataCenter(user, dataCenter, batteryCost);

  return res.status(200).json({
    success: true,
    message: `You purchased ${dataCenter.name} for ${dataCenter.price}`,
  });
});

// @POST
// PRIVATE
// User can attack and lower the health of a datacenter he doesnt owe in order to overtake it

router.post("/attack", async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCenterName } = req.body;
  const dataCenter = await DataCenter.findOne({
    name: dataCenterName,
  }).populate("requiredStash", ["name", "price"]);
  const dataCenterOwnerId = dataCenter.owner;
  const dataCenterOwner = await User.findById(dataCenterOwnerId);

  const batteryCost = 5;

  const disallowed = attackDataCenterCriterias(user, dataCenter, batteryCost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  const attack = await attackDataCenter(
    user,
    dataCenter,
    dataCenterOwner,
    batteryCost
  );

  const updatedUser = await saveAndUpdateUser(attack.user);
  let dataCenters = await DataCenter.find({
    city: updatedUser.playerStats.city._id,
  })
    .populate("requiredStash", ["name", "price"])
    .populate("city", ["name", "residents"])
    .populate("owner", ["name"]);

  let message = attack.result.destroyed
    ? `You destroyed ${dataCenter.name}`
    : attack.result.won
    ? `You attacked ${dataCenter.name} and dealt ${attack.result.damageDealt} damage`
    : `You failed to attack ${dataCenter.name}`;
  console.log("too late");

  return res.status(200).json({
    success: attack.result.won,
    message,
    finalResult: attack.result,
    user: updatedUser,
    dataCenters,
  });
});

module.exports = router;
