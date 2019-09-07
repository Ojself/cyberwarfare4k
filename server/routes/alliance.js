/* todo
-create alliance
-leave alliance
-create model for alliance

boss
undesboss
consigliere
cpt1
cpt2
soldier1
soldier2

captains can:
post forum
invite players

consig can:
delete post:

underboss can:
set position of people
kick people

boss can:
shutdown people and kick

 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Alliance = require('../models/Alliance');

// @GET
// PRIVATE
// Retrives all alliances

router.get('/', async (req, res, next) => {
  const alliances = await alliance.find();

  res.status(200).json({
    success: true,
    message: `alliances loaded`,
    alliances
  });
});

router.post('/create', async (req, res, next) => {});

router.post('/join', async (req, res, next) => {});

router.post('/leave', async (req, res, next) => {
  // everyone
});

router.post('/kick', async (req, res, next) => {});

router.put('/change-position', async (req, res, next) => {
  // everyone
});

router.delete('/dissolve', async (req, res, next) => {
  // only boss
});

module.exports = router;
