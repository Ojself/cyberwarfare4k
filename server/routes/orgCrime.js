const express = require('express');

const router = express.Router();
const User = require('../models/User');
const OrgCrime = require('../models/OrgCrime');

const { saveAndUpdateUser } = require('../logic/_helpers');
const { commitOrginaziedCrime } = require('../logic/orgCrime');

const findAndCatgeorizeOrgCrimes = async () => {
  const now = Date.now();
  const allOrgCrimes = await OrgCrime.find({ gracePeriod: { $lte: now } }).lean()
    .populate('owner', 'name')
    .populate('ownerAlliance', 'name')
    .populate('roles.owner', 'name');

  const orgCrimes = allOrgCrimes.filter((crime) => !crime.ownerAlliance);
  const claimedOwnOrgCrimes = allOrgCrimes.filter((crime) => crime.ownerAlliance);

  return { orgCrimes, claimedOwnOrgCrimes };
};

// @GET
// PRIVATE
// Retrives all organized crimes

router.get('/', async (req, res) => {
  /* const userId = req.user._id;
  const user = await User.findById(userId).select('alliance').lean(); */
  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  /* IF active until is expired, clean it */

  return res.status(200).json({
    success: true,
    message: 'Organized Crime loaded..',
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
  });
});

const claimOrgCrimeCriterias = (user, orgCrime, batteryCost, now, allCrimes) => {
  if (!user || !orgCrime) {
    return 'Something went wrong';
  }
  if (orgCrime.gracePeriod > now) {
    return 'This crime is currently unavailable';
  }
  if (!user.alliance) {
    return 'You need to be in an alliance to do organized crimes';
  }

  const allianceAlreadyClaimedCrime = allCrimes.find((crime) => {
    if (!crime.ownerAlliance || !user.alliance) return false;
    return crime.ownerAlliance.toString() === user.alliance.toString();
  });

  if (allianceAlreadyClaimedCrime) {
    return `Your alliance already claimed ${allianceAlreadyClaimedCrime.name}`;
  }

  if (orgCrime.owner) {
    return 'This crime is already claimed by someone';
  }
  if (user.playerStats.battery < batteryCost) {
    return 'Insufficent battery';
  }

  return null;
};

// @PUT
// PRIVATE
// Claims the organized crime
router.put('/', async (req, res) => {
  const now = Date.now();
  const userId = req.user._id;
  const { crimeId } = req.body;
  const user = await User.findById(userId);
  const orgCrimes = await OrgCrime.find();
  const orgCrime = orgCrimes.find((crime) => crime._id.toString() === crimeId);

  const batteryCost = 15;

  const disallowed = claimOrgCrimeCriterias(user, orgCrime, batteryCost, now, orgCrimes);

  if (disallowed) {
    return res.status(403).json({
      success: false,
      message: disallowed,
    });
  }

  orgCrime.claimOwner(user._id, user.alliance, now);
  await orgCrime.save();

  user.batteryDrain(batteryCost);
  const updatedUser = await saveAndUpdateUser(user);
  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  return res.status(200).json({
    success: true,
    message: 'Organized Crime claimed..',
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
    user: updatedUser,
  });
});

const claimOrgCrimeRoleCriterias = (user, orgCrime, batteryCost, now, roleName) => {
  if (!user || !orgCrime) {
    return 'Something went wrong';
  }
  if (orgCrime.gracePeriod > now) {
    return 'This crime is currently unavailable';
  }
  if (!user.alliance) {
    return 'You need to be in an alliance to do organized crimes';
  }
  if (user.alliance.toString() !== orgCrime.ownerAlliance.toString()) {
    return 'This crime is claimed by another alliance';
  }
  const role = orgCrime.roles.find((r) => r.roleName === roleName);
  if (role.owner) {
    return 'This role is already claimed';
  }
  if (user.playerStats.batteryCost < batteryCost) {
    return 'Insufficent battery';
  }
};

// @PATCH
// PRIVATE
// Claims the organized crime role
router.patch('/', async (req, res) => {
  const userId = req.user._id;
  const { crimeId, roleName } = req.body;
  const user = await User.findById(userId);
  const orgCrime = await OrgCrime.findById(crimeId);
  const now = Date.now();

  const userAlreadyInCrime = orgCrime.roles.some((role) => JSON.stringify(role.owner) === JSON.stringify(userId));

  const batteryCost = userAlreadyInCrime ? 0 : 5;
  const disallowed = claimOrgCrimeRoleCriterias(user, orgCrime, batteryCost, now, roleName);

  if (disallowed) {
    return res.status(403).json({
      success: false,
      message: disallowed,
    });
  }

  orgCrime.claimRole(user._id, roleName);
  await orgCrime.save();

  const updatedUser = await saveAndUpdateUser(user);
  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  return res.status(200).json({
    success: true,
    message: `${orgCrime.name} role ${roleName} claimed..`,
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
    user: updatedUser,
  });
});

const commitCrimeCriterias = (user, orgCrime) => {
  if (!user || !orgCrime || !user.alliance) {
    return 'something went wrong';
  }

  const userIsInSameAlliance = orgCrime.ownerAlliance.toString() === user.alliance.toString()
  if (!userIsInSameAlliance){
    return "This crime is claimed by another alliance"
  }

  const amountMembersInCrime = orgCrime.roles.filter(role=> !!role.owner).length
  const allRolesAreFilled = amountMembersInCrime === orgCrime.roles.length
  const userIsOwner = orgCrime.owner.toString() === user._id.toString()

  if (!allRolesAreFilled && !userIsOwner){
    return "Only the owner can carry out this crime"
  }
  return null;
};

// @PATCH
// PRIVATE
// Carries out organized crime
router.post('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).lean()
  const { crimeId } = req.body;
  const orgCrime = await OrgCrime.findById(crimeId).populate('roles.owner');

  const disallowed = commitCrimeCriterias(user, orgCrime);

  if (disallowed) {
    return res.status(403).json({
      success: false,
      message: disallowed,
    });
  }

  await commitOrginaziedCrime(orgCrime);
  orgCrime.cleanCrime();
  await orgCrime.save();

  const allOrgCrimes = await findAndCatgeorizeOrgCrimes();

  return res.status(200).json({
    success: true,
    message: `Organized crime ${orgCrime.name} commited..`,
    orgCrimes: allOrgCrimes.orgCrimes,
    claimedOwnOrgCrimes: allOrgCrimes.claimedOwnOrgCrimes,
  });
});

module.exports = router;
