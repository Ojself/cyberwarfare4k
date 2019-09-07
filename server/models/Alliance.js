const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const allianceSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Black', 'White', 'Red', 'Grey']
  },
  role: {
    type: String,
    enum: ['Boss', 'Underboss', 'Consigliere', 'Captain', 'Soldier'],
    required: true,
    default: 'Soldier'
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  invitedMembers: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  }
});

module.exports = mongoose.model('Alliance', allianceSchema);
