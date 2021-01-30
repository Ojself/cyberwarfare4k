const express = require('express');

const {
  purchaseDataCenterCriterias,
  purchaseDataCenter,
  attackDataCenterCriterias,
  healDataCenterCriterias,
  attackDataCenter,
  findDataCenters,
} = require('../logic/dataCenter');

const { saveAndUpdateUser } = require('../logic/_helpers');

const router = express.Router();
const DataCenter = require('../models/DataCenter');
const User = require('../models/User');

// @GET
// PRIVATE
// Retrieve all datacenters and populate which stash is required
// to hack them and which city they belong to

// todo, allow alliance member to heal eachother datacenter?

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const { owner } = req.query;

  let params = {};
  if (req.query && req.query.owner) {
    if (req.user._id.toString() === owner) {
      params = { owner: userId };
    } else {
      const allianceUsers = await User.find({ alliance: owner }).select('_id');
      params = { owner: allianceUsers };
    }
  }
  const dataCenters = await findDataCenters(params, req.query.owner, userId);

  res.status(200).json({
    dataCenters,
    message: 'datacenters loaded...',
    success: true,
  });
});

// @PATCH
// PRIVATE
// Heals datacenter

router.patch('/:dataCenterId', async (req, res) => {
  const { dataCenterId } = req.params;
  const userId = req.user._id;

  const params = { owner: userId };

  const user = await User.findById(userId);
  const dataCenter = await DataCenter.findById(dataCenterId);
  const healCost = (dataCenter.maxFirewall - dataCenter.currentFirewall) * 100;
  const disallow = healDataCenterCriterias(user, dataCenter);

  if (disallow) {
    return res.status(400).json({
      success: false,
      message: disallow,
    });
  }

  // criterias diasllowed
  dataCenter.heal();
  await dataCenter.save();

  user.bitCoinDrain(healCost);
  const updatedUser = await saveAndUpdateUser(user);

  const dataCenters = await findDataCenters(params, null, userId);

  /* let dataCenters = await DataCenter.find(params)
    .populate('requiredStash', ['name', 'price'])
    .populate('city', ['name', 'residents'])
    .populate('owner', ['name']);
  // filter out the datacenters that don't belong to the city the user is in
  dataCenters = dataCenters.filter((dc) => {
    const stringifiedObjectId = JSON.stringify(dc.city.residents);
    return stringifiedObjectId.includes(userId.toString());
  }); */

  res.status(200).json({
    dataCenters,
    message: `You spent ${healCost} to heal ${dataCenter.name}`,
    success: true,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// User purchase a datacenter

router.post('/purchase', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCenterName } = req.body;
  const dataCenter = await DataCenter.findOne({ name: dataCenterName });
  const now = Date.now();
  const disallow = purchaseDataCenterCriterias(user, dataCenter, now);

  if (disallow) {
    return res.status(400).json({
      success: false,
      message: disallow,
    });
  }

  await purchaseDataCenter(user, dataCenter);

  const dataCenters = await findDataCenters({ city: user.playerStats.city._id }, null, userId);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `You purchased ${dataCenter.name} for ${dataCenter.price}`,
    dataCenters,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// User can attack and lower the health of a datacenter he doesnt owe in order to overtake it

router.post('/attack', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCenterName } = req.body;
  const dataCenter = await DataCenter.findOne({
    name: dataCenterName,
  }).populate('requiredStash', ['name', 'price']);
  const dataCenterOwnerId = dataCenter.owner;
  const dataCenterOwner = await User.findById(dataCenterOwnerId);

  const batteryCost = 4;
  const now = Date.now();

  const disallowed = attackDataCenterCriterias(user, dataCenter, batteryCost, now);

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
    batteryCost,
  );

  const updatedUser = await saveAndUpdateUser(attack.user);
  const dataCenters = await findDataCenters({ }, null, userId);

  const message = attack.result.destroyed
    ? `You destroyed ${dataCenter.name}`
    : attack.result.won
      ? `You attacked ${dataCenter.name} and dealt ${attack.result.damageDealt} damage`
      : `You failed to attack ${dataCenter.name}`;

  return res.status(200).json({
    success: attack.result.won,
    message,
    finalResult: attack.result,
    user: updatedUser,
    dataCenters,
  });
});

module.exports = router;
