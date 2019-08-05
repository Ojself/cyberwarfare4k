const City = require('../models/User');

router.get('/', async (req, res, next) => {
  let cities = await City.find({});

  // check everthing criteria
  let message = '';

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
  let userId = req.user._id;
  let user = await User.findById(userId);

  let { cityName } = req.body;
  let newCity = await City.findOne({ cityName });

  let oldCityId = user.playerStats.city;
  let oldCity = await City.findById({ oldCityId });

  let batteryCost = 5

  // check everthing criteria
  /*
  - battery
  - not already in city you're traveling to
  - enough money
  */

  let message = changeCityRouteCriterias(user,newCity,oldCity,batteryCost);

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  changeCity(user, newCity, oldCity, batteryCost);

  res.status(200).json({
    success: true,
    message: ``
  });
});

function changeCity(user, newCity, oldCity, batteryCost) {
  newCity.arrival(user);
  user.changeCity(newCity, batteryCost);
  oldCity.departure(user);
}
