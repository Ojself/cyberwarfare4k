const express = require('express');

const router = express.Router();
const User = require('../models/User');
const OrgCrime = require('../models/OrgCrime');
const Alliance = require('../models/Alliance');

const { saveAndUpdateUser } = require('./helper'); // move to middleware?

const findAndCatgeorizeOrgCrimes = async () => {
  const now = Date.now();
  const allOrgCrimes = await OrgCrime.find({ gracePeriod: { $lte: now } })
    .populate('owner', 'name')
    .populate('ownerAlliance', 'name')
    .populate('TN.owner', 'name')
    .populate('SE.owner', 'name')
    .populate('FE.owner', 'name')
    .populate('CG.owner', 'name');
  console.log(allOrgCrimes[0].Technical.owner);
  const orgCrimes = allOrgCrimes.filter((crime) => !crime.ownerAlliance);
  const claimedOwnOrgCrimes = allOrgCrimes.filter((crime) => crime.ownerAlliance);

  return { orgCrimes, claimedOwnOrgCrimes };
};

// @GET
// PRIVATE
// Retrives all organized crimes

router.get('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select({ alliance: 1 }).lean();
  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  /* IF active until is expired, clean it */

  return res.status(200).json({
    success: true,
    message: 'Organized Crime loaded..',
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
  });
});

// @PUT
// PRIVATE
// Claims the organized crime
router.put('/', async (req, res) => {
  const now = Date.now();
  const userId = req.user._id;
  const { crimeId } = req.body;
  console.log(req.body, 'reqbody');
  const user = await User.findById(userId).select({ alliance: 1 }).lean();
  const orgCrime = await OrgCrime.findById(crimeId);
  orgCrime.claimOwner(user._id, user.alliance, now);
  await orgCrime.save();

  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  return res.status(200).json({
    success: true,
    message: 'Organized Crime claimed..',
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
  });
});

// @PATCH
// PRIVATE
// Claims the organized crime role
router.patch('/', async (req, res) => {
  const userId = req.user._id;
  const { crimeId, role } = req.body;
  const user = await User.findById(userId).select({ alliance: 1 }).lean();
  const orgCrime = await OrgCrime.findById(crimeId);
  orgCrime.claimRole(user._id, role);
  await orgCrime.save();

  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  return res.status(200).json({
    success: true,
    message: `${orgCrime.name} role ${role} claimed..`,
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
  });
});

// @PATCH
// PRIVATE
// Carries out organized crime
router.post('/', async (req, res) => {
  // const userId = req.user._id;
  const { crimeId, userId } = req.body;
  const orgCrime = await OrgCrime.findById(crimeId);
  // const users = await User.findById(userId).select({ alliance: 1 }).lean();
  /* orgCrime.commit(user._id);
  await orgCrime.save();
 */
  const orgCrimes = await findAndCatgeorizeOrgCrimes();

  return res.status(200).json({
    success: true,
    message: `Organized crime ${orgCrime.name} commited..`,
    orgCrimes,
  });
});

module.exports = router;
