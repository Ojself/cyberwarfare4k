const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const {
  purchaseDataCenterCriterias,
  purchaseDataCenter,
  attackDataCenterCriterias,
  attackDataCenter
} = require('../middlewares/middleDataCenter');
const router = express.Router();
const DataCenter = require('../models/DataCenter');
const User = require('../models/User');

/* todo, one of the special weapons allows anonymousiy */
/* todo several feedback messages for res.json? */
/* todo see if models follow same structure on schema.type.objectid and arrays around or nested */
/* todo see if checkroutescriterias follow the same pattern */

// @GET
// PRIVATE
// Retrieve all datacenters and populate which stash is required to hack them and which city they belong to

// todo, allow alliance member to heal eachother datacenter?

router.get('/', async (req, res, next) => {
  const userId = req.user._id;
  let dataCenters = await DataCenter.find()
    .populate('requiredStash', ['name', 'price'])
    .populate('city', ['name', 'residents']);

  // filter out the datacenters that don't belong to the city the user is in
  dataCenters = dataCenters.filter(el => {
    const stringifiedObjectId = JSON.stringify(el.city.residents);
    return stringifiedObjectId.includes(userId.toString());
  });

  res.status(200).json({
    dataCenters,
    message: 'datacenters loaded..',
    success: true
  });
});

// @POST
// PRIVATE
// User purchase a datacenter

router.post('/purchase', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCenterName } = req.body;

  const dataCenter = await DataCenter.findOne({ name: dataCenterName });

  const batteryCost = 0;

  let message = purchaseDataCenterCriterias(user, dataCenter, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  purchaseDataCenter(user, dataCenter, batteryCost);

  res.status(200).json({
    success: true,
    message: `You purchased ${dataCenter.name} for ${dataCenter.price}`
  });
});

// @POST
// PRIVATE
// User can attack and lower the health of a datacenter he doesnt owe in order to overtake it

router.post('/attack', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCenterName } = req.body;
  const dataCenter = await DataCenter.findOne({ name: dataCenterName });

  const dataCenterOwnerId = dataCenter.owner;
  const dataCenterOwner = await User.findById(dataCenterOwnerId);

  const batteryCost = 5;

  let message = attackDataCenterCriterias(user, dataCenter, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  let finalResult = await attackDataCenter(
    user,
    dataCenter,
    dataCenterOwner,
    batteryCost
  );

  res.status(200).json({
    success: true,
    message: `You attacked ${dataCenter.name} for ${batteryCost} battery and dealt ${finalResult.damageDealt} damage`,
    finalResult
  });
});

module.exports = router;
