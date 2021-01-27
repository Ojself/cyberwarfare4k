const mongoose = require('mongoose');

const { Schema } = mongoose;

const crimeSchema = new Schema({
  name: String,
  descrjption: String,
  gracePeriod: { type: Date, default: Date.now() },
  crimeType: {
    type: String,
    enum: ['Technical', 'Social Engineering', 'Forensics', 'Cryptography'],
  },
  description: String,
  difficulty: {
    type: Number,
    enum: [30, 50, 70, 90, 150],
  },
  currentFirewall: Number,
  maxFirewall: Number,
  difficultyString: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'challenging', 'impossible'],
  },
  defeatedBy: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
});

crimeSchema.methods.handleCrime = function (finalResult) {
  this.gracePeriod = finalResult.now + (1000 * this.difficulty);
  if (finalResult.won) {
    this.defeatedBy.push(finalResult.user._id);
  }
};

module.exports = mongoose.model('Crime', crimeSchema);
