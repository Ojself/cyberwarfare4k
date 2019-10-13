const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const OrgCrimeSchema = new Schema({
  name: String,
  difficulty: Number,
  batteryCost: Number,
  encryption: Number,
  currentFirewall: Number,
  readyUsers: { type: [Schema.types.ObjectId], ref: 'User' },
  available: { type: Boolean, default: true }
});

OrgCrimeSchema.methods.handleOrgCrime = async function (user) {
  console.log('OrgCrimeSchema handleCrime triggered');
  this.readyUsers.push(user._id)

  if (this.readyUsers.length >= 3) {
    console.log('all users here, init orgcrime..');
    this.available = false;
  }

  /* make it unavialble for a bit
calculate gains
do whatever */
  this.save();
};

module.exports = mongoose.model('OrgCrime', OrgCrimeSchema);

/*
Hack adobe
Hack Sony
Hack Equifax
Hack adult friend finder
Marriott hotels
Yahoo!
JP Morgan
Home Depot
VISA
MasterCard
 */
