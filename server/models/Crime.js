const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crimeSchema = new Schema({
  name: String,
  descrjption: String,
  available: Number,
  crimeType: {
    type: String,
    enum: ['technical', 'socialEngineering', 'forensics', 'cryptography']
  },
  difficulty: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  encryption: Number,
  currentFirewall: Number,
  maxFirewall: Number
});

module.exports = mongoose.model('Crime', crimeSchema);

// very easy, easy, moderate, medium, hard, impossible
// 6

// type technical, socialEngineering, forensics, cryptography
