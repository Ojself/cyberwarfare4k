const express = require('express');

const router = express.Router();
const User = require('../models/User');

const { saveAndUpdateUser } = require('../logic/_helpers');
const {
  depositCriteria, handleSpy, sendSpyCriteria, cancelSpyCriteria, attachRemainingTimeToSpiesAndFilter,
} = require('../logic/vault');

// @GET
// PRIVATE
// Get opponents and active spies

// TODO sanitize route
router.get('/', async (req, res) => {
  const userId = req.user._id;
  const opponents = await User.find({ 'account.isSetup': true }).select('name').lean();
  const user = await User.findById(userId)
    .select('fightInformation.activeSpies')
    .populate('fightInformation.activeSpies.target', 'name')
    .sort({ name: 1 })
    .lean();

  const { activeSpies } = user.fightInformation;
  const now = Date.now();
  const updatedSpies = attachRemainingTimeToSpiesAndFilter(activeSpies, now);

  return res.status(200).json({
    success: true,
    message: 'Vault loaded..',
    activeSpies: updatedSpies,
    opponents,
  });
});

// @POST
// PRIVATE
// Deposit money from hand to vault
router.post('/deposit', async (req, res) => {
  // const fee = 1.05;
  const { depositAmount } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  const disallowed = depositCriteria(user, depositAmount);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  user.depositVault(depositAmount);
  const updatedUser = await saveAndUpdateUser(user);

  return res.status(200).json({
    success: true,
    message: `${depositAmount} was deposited to your vault`,
    user: updatedUser,
  });
});

// @POST
// PRIVATE
// Sends spy

router.post('/', async (req, res) => {
  const { opponentId, bitCoinSpent } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  const opponent = await User.findById(opponentId).lean();

  const disallowed = sendSpyCriteria(user, opponent, bitCoinSpent);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }
  const now = Date.now();
  const spyDelay = 1000 * 100; // 100 sec
  user.cleanSpies(now);
  const id = user.sendSpy(bitCoinSpent, opponentId, now + spyDelay);
  const savedUser = await saveAndUpdateUser(user);
  const updatedUser = await savedUser
    .populate('fightInformation.activeSpies.target', 'name')
    .execPopulate();

  const { activeSpies } = updatedUser.fightInformation;
  const updatedSpies = attachRemainingTimeToSpiesAndFilter(activeSpies, now);
  setTimeout(() => {
    handleSpy(userId, opponentId, id);
  }, spyDelay);

  return res.status(200).json({
    success: true,
    message: `A spy is heading towards ${opponent.name}`,
    user,
    activeSpies: updatedSpies,
  });
});

// @DELETE
// PRIVATE
// Withdraws money from ledger to hand

router.delete('/:id', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { id } = req.params;
  const now = Date.now();
  const disallowed = cancelSpyCriteria(user, id, now);

  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  user.deleteSpy(id);
  const savedUser = await saveAndUpdateUser(user);
  const updatedUser = await savedUser
    .populate('fightInformation.activeSpies.target', 'name');

  const { activeSpies } = updatedUser.fightInformation;
  const updatedSpies = attachRemainingTimeToSpiesAndFilter(activeSpies, now);

  return res.status(200).json({
    success: true,
    message: 'Spy canceled',
    user: updatedUser,
    activeSpies: updatedSpies,
  });
});

module.exports = router;
