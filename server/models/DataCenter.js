const mongoose = require("mongoose");

const { Schema } = mongoose;
const Stash = require("./Stash");

const dataCenterSchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ["Available", "Malfunctioning", "Resetting", "Owned"],
    default: "Available",
  },
  price: {
    type: Number,
    default: 1000000,
  },
  requiredStash: [{ type: Schema.Types.ObjectId, ref: "Stash" }],
  difficulty: Number,
  currentFirewall: {
    type: Number,
    default: 100,
  },
  maxFirewall: {
    type: Number,
    default: 100,
  },
  city: { type: Schema.Types.ObjectId, ref: "City" },
  attacker: { type: Schema.Types.ObjectId, ref: "User" },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  ownerAlliance: { type: Schema.Types.ObjectId, ref: "Alliance" },
  minutlyrevenue: Number,
  timeToAvailable: Number,
  gracePeriod: {
    type: Boolean,
    default: false,
  },
});

dataCenterSchema.methods.handlePurchase = function (user) {
  console.log("handlePurchase method triggered");
  this.owner = user._id;
  this.status = "Owned";
  this.attacker = null;

  // might not work because only allows objectId. maybe set to same as owner
  // gracePeriod for x minutes to let user enjoy some revenue?

  this.save();
};

dataCenterSchema.methods.handleAttack = async function (attackerId, result) {
  console.log("handleAttack method triggered");
  this.currentFirewall -= result.damageDealt;
  if (this.currentFirewall <= 0) {
    return this.handleDestroyed();
  }
  this.gracePeriod = true;
  // graces the datacenter for a minute so the user can't attack too quick

  console.log(this.requiredStash, "requiredStash", "done");
  this.attacker = attackerId;

  this.requiredStash = await getNewStash();
  console.log(this.requiredStash, "===????");
  setTimeout(async () => {
    console.log("timeout1");
    this.gracePeriod = false;
    this.save();
  }, 1000 * 10);
};

const getNewStash = async (amount = 3) => {
  const stash = await Stash.find();
  let requiredStash = [];
  console.log(stash, "stashes?xw");
  for (let i = 0; i < amount; i += 1) {
    requiredStash.push(stash[Math.floor(Math.random() * stash.length)]._id);
  }
  return requiredStash;
};

// Makes it unavaiable for attack or purchase for between 15-18 minutes
// First 'malfunction' and then 'resetting'
// resets required stash and removes owner and attacker id
// heals up the datacenter
dataCenterSchema.methods.handleDestroyed = async function () {
  console.log("handleDataCenterAttack triggered");
  this.gracePeriod = true;
  this.requiredStash = [];
  this.owner = null;
  this.status = "Malfunctioning";

  const randomNumber = Math.ceil(Math.random() * 3);

  setTimeout(() => {
    this.currentFirewall = this.maxFirewall;
    this.status = "Resetting";
    this.save();
  }, 1000 * 60 * 15);

  setTimeout(async () => {
    this.status = "Available";
    this.gracePeriod = false;
    this.attacker = null;
    this.currentFirewall = this.maxFirewall;
    this.requiredStash = await getNewStash();
    this.save();
  }, 1000 * 60 * 15 + randomNumber);
};

module.exports = mongoose.model("DataCenter", dataCenterSchema);
