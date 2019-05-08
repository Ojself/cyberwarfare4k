const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const User = require("../models/User");

/* 
GET
PRIVATE+
ADMIN SITE
*/
router.get("/secret", isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});

/* 
GET
PRIVATE
RETRIVES USER INFORMATION
*/
router.get("/my-profile", (req, res, next) => {
  let id = req.user._id;
  User.findById(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
});

module.exports = router;
