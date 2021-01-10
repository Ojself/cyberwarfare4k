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
  TN: { // Technical
    name: String,
    description: String,
    difficulty: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  SE: { // Social Engineering
    name: String,
    description: String,
    difficulty: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  FE: { // Forensics
    name: String,
    description: String,
    difficulty: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  CG: { // Cryptography
    name: String,
    description: String,
    difficulty: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },

});

OrgCrimeSchema.methods.claimOwner = function (userId, allianceId, now) {
  const twentyMinutes = 1000 * 60 * 20;
  this.owner = userId;
  this.ownerAlliance = allianceId;
  this.activeUntil = now + twentyMinutes;
};

OrgCrimeSchema.methods.claimRole = function (userId, role) {
  console.log(userId, role);
  ['Technical', 'Social Engineering', 'Forensics', 'Cryptography'].forEach((roleType) => {
    if (JSON.stringify(this[roleType].owner) === JSON.stringify(userId)) {
      this[roleType].owner = null;
    }
  });
  this[role].owner = userId;
};

OrgCrimeSchema.methods.cleanCrime = function () {
  ['Technical', 'Social Engineering', 'Forensics', 'Cryptography'].forEach((type) => {
    this[type].owner = null;
  });
  this.owner = null;
  this.ownerAlliance = null;
};

module.exports = mongoose.model('OrgCrime', OrgCrimeSchema);

/*
Hack adobe
Hack Sony
Hack Equifax
Hack adult friend finder
Yahoo!
JP Morgan
Home Depot
VISA
MasterCard
 */
