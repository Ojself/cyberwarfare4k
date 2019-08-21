const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const crimeSchema = new Schema({
  name: String,
  descrjption: String,
  available: { type: Boolean, default: true },
  crimeType: {
    type: String,
    enum: ['Technical', 'Social Engineering', 'Forensics', 'Cryptography']
  },
  description: String,
  difficulty: {
    type: Number,
    enum: [30, 50, 70, 110, 150]
  },
  currentFirewall: Number,
  maxFirewall: Number,
  defeatedBy: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
});

crimeSchema.methods.handleCrime = function(finalResult) {
  console.log('crimeSchema handleCrime triggered', finalResult);

  this.available = false;

  // makes the crime unavailable for a short period < 3 minutes
  setTimeout(() => {
    this.available = true;
    console.log(100 * this.difficulty, 'save()');
    this.save();
  }, 1000 * this.difficulty);

  if (finalResult.won) {
    this.defeatedBy.push(finalResult.user._id);
  }

  this.save();
};

module.exports = mongoose.model('Crime', crimeSchema);
