const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crimeSchema = new Schema({
  name: String,
  type: String,
  batteryCost: Number,
  difficulty: Number,
  encryption: Number,
  currentFirewall: Number,
  maxFirewall: Number
});

module.exports = mongoose.model('Crime', crimeSchema);

// very easy, easy, moderate, medium, hard, impossible
// 6

// type technical, socialEngineering, forensics, cryptography
