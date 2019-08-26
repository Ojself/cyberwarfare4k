const express = require('express');
const { isLoggedIn } = require('../middlewaresAuth');
const router = express.Router();
const User = require('../models/User');
const Item = require('../models/Item');

/* 
GET
PRIVATE
RETRIVES ALL ITEMS
*/

router.get('/', isLoggedin, async (req, res, next) => {
  console.log('you are now in marketplace route');

  const items = await Item.find();
  res.status(200).json({
    success: true,
    message: 'items loaded',
    items
  });
});

/* 
POST
PRIVATE
LETS USER BUY NEW ITEM 
*/

router.post('/buy', async (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.body;
  const item = await Item.findById(itemId);
  const user = await User.findById(userId);

  let message = marketPlaceCriteria(item, user);

  if (messge) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  user.handleItemPurchase(item);

  res.status(200).json({
    success: true,
    message: `You successfuly purchased ${item.name} for ${item.price}`
  });
});
// todo check if if messages actually return the res.json
module.exports = router;
