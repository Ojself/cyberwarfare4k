const express = require('express');

const router = express.Router();
const User = require('../models/User');
const City = require('../models/City');
const {
  changeCityRouteCriterias,
  getCityRouteCriterias,
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

router.get('/locals', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const userCityId = user.playerStats.city;

  const populateOb = {
    path: 'residents',
    populate: {
      path: 'alliance',
      select: 'name',
    },
    select: 'name playerStats.rankName',
  };
  const cityLocals = await City.findById(userCityId).populate(populateOb);

  const onlineUsers = await getOnlineUsers();
  // gets online users in current city
  const localOnlineUsers = cityLocals.residents.filter((resident) => onlineUsers.includes(resident._id.toString()));
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

  const batteryCost = 4;

  const message = changeCityRouteCriterias(user, newCity, oldCity, batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  await newCity.arrival(user._id);
  await user.changeCity(newCity, batteryCost);
  await oldCity.departure(user._id);

  const updatedUser = await user.save().then((u) => u.populate('playerStats.city', 'name').execPopulate());

  console.log(updatedUser, '?');

  return res.status(200).json({
    success: true,
    message: `You changed your VPN from ${oldCity.name} to ${newCity.name}`,
    user: updatedUser,
  });
});

module.exports = router;
