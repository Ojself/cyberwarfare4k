const express = require('express');
const { isLoggedIn } = require('../middlewares/middleAuth');
const {
  purchaseDataCentreCriterias,
  purchaseDataCentre,
  attackDataCentreCriterias,
  attackDataCentre
} = require('../middlewares/middleDataCentre');
const router = express.Router();
const DataCentre = require('../models/DataCenter');
const User = require('../models/User');

/* todo, allow alliance member to heal eachother datacentre or grace it?*/

router.get('/', async (req, res, next) => {
  const dataCentres = await Datacentre.find();
  res.status(200).json({
    dataCentres,
    message: 'dataceners loaded..',
    success: true
  });
});

router.post('/purchase', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCentreName } = req.body;
  const dataCentre = await DataCentre.findOne({ name: dataCentreName });

  const batteryCost = 0;

  let message = purchaseDataCentreCriterias(user, dataCentre, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  purchaseDataCentre(user, dataCentre, batteryCost);

  res.status(200).json({
    success: true,
    message: `You purchased ${dataCentre.name} for ${dataCentre.price}`
  });
});

router.post('/attack', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { dataCentreName } = req.body;
  const dataCentre = await DataCentre.findOne({ name: dataCentreName });

  const dataCentreOwnerId = dataCentre.owner;
  const dataCentreOwner = await User.findById(dataCentreOwnerId);

  const batteryCost = 5;

  let message = attackDataCentreCriterias(user, dataCentre, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  let finalResult = await attackDataCentre(
    user,
    dataCentre,
    dataCentreOwner,
    batteryCost
  );

  res.status(200).json({
    success: true,
    message: `You attacked ${
      dataCentre.name
    } for ${batteryCost} battery and dealt ${finalResult.damageDealt} damage`,
    finalResult
  });
});

/* todo, one of the special weapons allows anonymousiy */
/* todo several feedback messages for res.json? */
/* todo see if models follow same structure on schema.type.objectid and arrays around or nested */
/* todo see if checkroutescriterias follow the same pattern */
module.exports = router;
