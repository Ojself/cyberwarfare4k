const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @POST
// PRIVATE
// reads all messages

router.post("/readAll", async (req, res, next) => {
    const {communication} = req.body 
    const userId = req.user._id;
    const user = await User.findById(userId);
    console.log(user,'user')
    
    await user.readAllmessages(communication)
    const readCommuncation = user.account[communication]


    return res.status(200).json({
      success: true,
      message: 'messages read',
      readCommuncation
    });
    
  })

module.exports = router;