const express = require("express");
// const Country = require("../models/Country");
const User = require("../models/User");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("you are now in country route");
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => next(err));
});

// Route to add a country
router.post("/", (req, res, next) => {
  let { name, capitals, area, description } = req.body;
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err));
});

/* HERE COMES THE ROUTES BABY */

module.exports = router;
