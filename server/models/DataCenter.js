const mongoose = require('mongoose');

const { Schema } = mongoose;
const Stash = require('./Stash');

const getNewStash = async (amount = 3) => {
  const stash = await Stash.find();
  const requiredStash = [];
  for (let i = 0; i < amount; i += 1) {
    requiredStash.push(stash[Math.floor(Math.random() * stash.length)]._id);
  }
  return requiredStash;
};

const dataCenterSchema = new Schema({
  name: String,
  status: { type: String, default: '' }, /* Empty by design */
  price: Number,
  requiredStash: [{ type: Schema.Types.ObjectId, ref: 'Stash' }],
  difficulty: Number,
  currentFirewall: {
    type: Number,
    default: 100,
  },
  maxFirewall: {
    type: Number,
    default: 100,
  },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  attacker: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  minutlyrevenue: { type: Number, default: 0 },
  gracePeriod: { type: Date, default: Date.now() },
});

dataCenterSchema.methods.handlePurchase = function (userId) {
  this.owner = userId;
  this.attacker = null;
};

dataCenterSchema.methods.handleAttack = async function (attackerId, result, now) {
  this.currentFirewall -= result.damageDealt;
  if (this.currentFirewall <= 0) {
    return this.handleDestroyed(now);
  }
  // graces the datacenter for a minute so the user can't attack too quick

  this.attacker = attackerId;
  this.requiredStash = await getNewStash();
  this.gracePeriod = now + (1000 * 60);
};

dataCenterSchema.methods.handleDestroyed = async function (now = Date.now()) {
  this.gracePeriod = now + (1000 * 60 * 30 * Math.random());
  this.requiredStash = [];
  this.owner = null;
  this.currentFirewall = this.maxFirewall;
  this.requiredStash = await getNewStash();
};

dataCenterSchema.methods.heal = async function () {
  this.currentFirewall = this.maxFirewall;
};

module.exports = mongoose.model('DataCenter', dataCenterSchema);
