/*

For future. Divide account credentials and user

const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  email: String,
  password: String,
  ip: [String],
  confirmationCode: { type: String, default: `${Math.random()}` },
  isSetup: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  subscription: {
    type: String,
    enum: ['', 'Bronze', 'Silver', 'Gold', 'Platinum'],
  },
  banned: {
    type: Boolean,
    default: false,
  },
  bannedReason: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Account', accountSchema);
 */
