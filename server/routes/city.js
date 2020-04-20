const express = require('express');

const router = express.Router();
const User = require('../models/User');
const City = require('../models/City');
const {
  changeCityRouteCriterias,
  getCityRouteCriterias,
  changeCity,
} = require('../middlewares/middleCity.js');

const { getOnlineUsers } = require('./helper');

// @GET
// PRIVATE
// Retrives all cities

router.get('/', async (req, res) => {
  let cities;
  const dbSelectOptions = {
    price: '1',
    name: '1',
  };
  try {
    cities = await City.find().select(dbSelectOptions);
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: JSON.stringify(e),
    });
  }

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


// @GET
// PRIVATE
// Retrives local players and reviels online status

router.get('/local', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const userCityId = user.playerStats.city;

  const cityLocals = await City.findById(userCityId).populate('residents', ['name', 'playerStats', 'alliance']);

  const onlineUsers = await getOnlineUsers();
  // gets online users in current city
  const localOnlineUsers = cityLocals.residents.filter((r) => onlineUsers.includes(r._id.toString()));
  return res.status(200).json({
    success: true,
    message: 'locals loaded..',
    cityLocals,
    localOnlineUsers,
  });
});


// @POST
// PRIVATE
// Changes the user city

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);


  const { cityId } = req.body;

  const newCity = await City.findById(cityId);


  const oldCityId = user.playerStats.city;
  const oldCity = await City.findById(oldCityId);
  console.log(oldCity, 'oldCity');

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
