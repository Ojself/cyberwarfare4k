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
  try {
    const items = await Item.find();
    res.status(200).json({
      success: true,
      message: "items loaded"
      items});
  } catch (err) {
    next(err);
  }
});

/* 
GET
PRIVATE
LETS USER BUY NEW ITEM -- see usermodel for addItem() 
*/

router.post("/:id", async (req, res) => {
  let userId = req.user._id
  let itemId = req.params.id
  let item = await Item.findById(itemId)
  let user = await User.findById(userId)
  if (user.bitcoins < item.price){
    res.status(400).json({
      success: false,
      message: 'Insufficent funds'
    })
    return null;
  }

  if (user.items.name === item.name){
    res.status(400).json({
      success: false,
      message: 'you already own this item'
    })
    return null;
  }
      user.bitCoins -= item.price;
      return user.addItem(item);
    
});
