const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrgCrimeSchema = new Schema({
  name: String,
  description: String,
  batteryCost: Number,
  image: String,
  activeUntil: { type: Date, default: Date.now() },
  gracePeriod: { type: Date, default: Date.now() },
  owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  ownerAlliance: { type: Schema.Types.ObjectId, ref: 'Alliance', default: null },
  roles: [{
    roleName: String,
    description: String,
    difficulty: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  }],

});

OrgCrimeSchema.methods.claimOwner = function (userId, allianceId, now) {
  const twentyMinutes = 1000 * 60 * 20;
  this.owner = userId;
  this.ownerAlliance = allianceId;
  this.activeUntil = now + twentyMinutes;
  this.roles[0].owner = userId;
};

OrgCrimeSchema.methods.claimRole = function (userId, roleName) {
  const oldRoleIndex = this.roles.findIndex((r) => JSON.stringify(r.owner) === JSON.stringify(userId));
  if (oldRoleIndex >= 0) {
    this.roles[oldRoleIndex].owner = null;
  }
  const newRoleIndex = this.roles.findIndex((r) => r.roleName === roleName);
  if (newRoleIndex >= 0) {
    this.roles[newRoleIndex].owner = userId;
  }
};

OrgCrimeSchema.methods.cleanCrime = function () {
  this.roles.forEach((r) => {
    r.owner = null;
  });
  this.owner = null;
  this.ownerAlliance = null;
};

module.exports = mongoose.model('OrgCrime', OrgCrimeSchema);
