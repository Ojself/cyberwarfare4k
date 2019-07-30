const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgCrimeSchema = new Schema({
  name: String,
  difficulty: Number,
  batteryCost: Number,
  encryption: Number,
  currentFirewall: Number,
  maxFirewall: Number,
  readyUsers: [Schema.types.ObjectId]
});

module.exports = mongoose.model('OrgCrime', OrgCrimeSchema);
