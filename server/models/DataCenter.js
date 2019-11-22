const mongoose = require('mongoose');

const { Schema } = mongoose;

const Stash = require('./Stash');

const dataCenterSchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ['Available', 'Malfunctioning', 'Resetting', 'Owned'],
    default: 'Available',
  },
  price: {
    type: Number,
    default: 1000000,
  },
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
  ownerAlliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
  minutlyrevenue: Number,
  timeToAvailable: Number,
  gracePeriod: {
    type: Boolean,
    default: false,
  },
});

dataCenterSchema.methods.handlePurchase = function (user) {
  console.log('handlePurchase method triggered');
  this.owner = user._id;
  this.status = 'Owned';
  this.attacker = null;

  // might not work because only allows objectId. maybe set to same as owner
  // gracePeriod for x minutes to let user enjoy some revenue?

  this.save();
};

dataCenterSchema.methods.handleAttack = async function (
  attackerId,
  dataCenterOwner,
  result,
) {
  console.log('handleAttack method triggered');
  this.gracePeriod = true;
  // graces the datacenter for a minute so the user can't attack too quick
  const gracePeriodTimeOut = setTimeout(() => {
    this.gracePeriod = false;
    this.save();
  }, 1000 * 60);
  if (result.won) {
    this.currentFirewall -= result.damageDealt;
    // resets the required stash
    // todo repeating, write function
    this.requiredStash = [];
    const stashes = await Stash.find();
    for (let i = 0; i < 3; i += 1) {
      this.requiredStash.push(
        stashes[Math.floor(Math.random() * stashes.length)]._id,
      );
    }
  }
  this.attacker = attackerId;
  this.save();
};

// Makes it unavaiable for attack or purchase for between 15-18 minutes
// First 'malfunction' and then 'resetting'
// resets required stash and removes owner and attacker id
// heals up the datacenter
dataCenterSchema.methods.handleDestroyed = async function (dataCenter, result) {
  console.log('handleDataCenterAttack triggered');
  this.gracePeriod = true;
  this.requiredStash = [];
  this.owner = null;
  this.status = 'Malfunctioning';
  this.currentFirewall = this.maxFirewall;

  const randomNumber = Math.ceil(Math.random() * 3);
  const stashes = await Stash.find();

  setTimeout(() => {
    this.status = 'Resetting';
    this.save();
  }, 1000 * 60 * 15);

  setTimeout(() => {
    this.status = 'Available';
    this.gracePeriod = false;
    this.attacker = null;
    this.currentFirewall = this.maxFirewall;

    for (let i = 0; i < 3; i += 1) {
      this.requiredStash.push(
        stashes[Math.floor(Math.random() * stashes.length)]._id,
      );
    }
    this.save();
  }, 1000 * 60 * 15 + randomNumber);

  this.save();
};

module.exports = mongoose.model('DataCenter', dataCenterSchema);
