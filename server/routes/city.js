const express = require('express');
const router = express.Router();
const User = require('../models/User');
const City = require('../models/City');
const {
  changeCityRouteCriterias,
  getCityRouteCriterias
} = require('../middlewares/middleCity.js');

router.get('/', async (req, res, next) => {
  const cities = await City.find();

  // check everthing criteria
  let message = getCityRouteCriterias(cities);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  res.status(200).json({
    success: true,
    message: `cities loaded`,
    cities
  });
});

router.post('/', async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { cityName } = req.body;
  const newCity = await City.findOne({ name: cityName });

  const oldCityId = user.playerStats.city;
  const oldCity = await City.findById(oldCityId);

  const batteryCost = 5;

  let message = changeCityRouteCriterias(user, newCity, oldCity, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  changeCity(user, newCity, oldCity, batteryCost);

  res.status(200).json({
    success: true,
    message: `You changed your VPN from ${oldCity.name} to ${newCity.name}`
  });
});

function changeCity(user, newCity, oldCity, batteryCost) {
  newCity.arrival(user._id);
  user.changeCity(newCity, batteryCost);
  oldCity.departure(user._id);
}

module.exports = router;
