const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allianceSchema = new Schema({
  name: String,
  hideoutStrength: Number,
  members: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Alliance', allianceSchema);
