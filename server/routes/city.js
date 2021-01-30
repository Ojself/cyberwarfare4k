const express = require('express');

const router = express.Router();
const User = require('../models/User');
const City = require('../models/City');
const {
  changeCityRouteCriterias,
  getCityRouteCriterias,
} = require('../logic/city.js');

const { getOnlineUsers, saveAndUpdateUser } = require('../logic/_helpers');

// @GET
// PRIVATE
// Retrives all cities

router.get('/', async (req, res) => {
  const cities = await City.find().select('price name');

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

  const batteryCost = 3;

  const disallowed = changeCityRouteCriterias(user, newCity, oldCity, batteryCost);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  newCity.arrival(user._id);
  await newCity.save();
  await user.changeCity(newCity, batteryCost);
  oldCity.departure(user._id);
  await oldCity.save();

  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `You changed your VPN from ${oldCity.name} to ${newCity.name}`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Change city fee

const changeCityFeeCriterias = (user, city, fee) => {
  if (!user || !city) {
    return 'Something went wrong';
  }
  if (user.alliance.toString() !== city.allianceOwner.toString()) {
    return 'You can\t change the fee of this city';
  }
  if (!fee) {
    return 'Missing input';
  }
  if (fee > 1) {
    return 'Fee is too high';
  }
  if (fee < 0) {
    return 'Fee is too low';
  }
  return null;
};

router.post('/fee', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);

  const { fee } = req.body;

  const city = await City.find({ allianceOwner: user.alliance });

  const disallowed = changeCityFeeCriterias(user, city, fee);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  city.setFee(fee);
  const updatedCity = await city.save();

  return res.status(200).json({
    success: true,
    message: `You changed your VPN from ${oldCity.name} to ${newCity.name}`,
    city: updatedCity,
  });
});

module.exports = router;
