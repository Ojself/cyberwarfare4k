const express = require('express');
const { marketPlaceCriterias } = require('../middlewares/middleMarketPlace');
const { saveAndUpdateUser } = require('./helper');

const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

// @GET
// PRIVATE
// Retrived all items from marketplace

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.status(200).json({
    success: true,
    message: 'items loaded..',
    items,
  });
});

// @POST
// PRIVATE
// User purchase item from marketplace

// todo check same value is not working

router.post('/buy', async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.body;

  const item = await Item.findById(itemId);
  const user = await User.findById(userId);

  const disallowed = marketPlaceCriterias(user, item);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  user.handleItemPurchase(item);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `You successfuly purchased ${item.name} for ${item.price}`,
    user: updatedUser,
  });
});
// todo check if if messages actually return the res.json
module.exports = router;
