const express = require('express');

const router = express.Router();
const User = require('../models/User');
const City = require('../models/City');
const {
  changeCityRouteCriterias,
  getCityRouteCriterias,
  changeCity,
} = require('../middlewares/middleCity.js');

// @GET
// PRIVATE
// Retrives all cities

router.get('/', async (req, res) => {
  const cities = await City.find();

  const message = getCityRouteCriterias(cities);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  return res.status(200).json({
    success: true,
    message: 'cities loaded..',
    cities,
  });
});

// @POST
// PRIVATE
// Changes the user city

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { cityName } = req.body;
  const newCity = await City.findOne({ name: cityName });

  const oldCityId = user.playerStats.city;
  const oldCity = await City.findById(oldCityId);

  const batteryCost = 5;

  const message = changeCityRouteCriterias(user, newCity, oldCity, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  changeCity(user, newCity, oldCity, batteryCost);

  return res.status(200).json({
    success: true,
    message: `You changed your VPN from ${oldCity.name} to ${newCity.name}`,
  });
});

module.exports = router;
