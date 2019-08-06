const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crimeSchema = new Schema({
  name: String,
  descrjption: String,
  available: { type: Boolean, default: true },
  crimeType: {
    type: String,
    enum: ['technical', 'socialEngineering', 'forensics', 'cryptography']
  },
  // difficulty according to playerstats
  // easy 30, moderate 50, medium 70, hard 90, impossible 100
  difficulty: {
    type: Number,
    enum: [30, 50, 70, 110, 150]
  },
  currentFirewall: Number,
  maxFirewall: Number
});

module.exports = mongoose.model('Crime', crimeSchema);

// very easy, easy, moderate, medium, hard, impossible
// 6

// type technical, socialEngineering, forensics, cryptography
