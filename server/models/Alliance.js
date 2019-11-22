const mongoose = require('mongoose');

const { Schema } = mongoose;

const allianceSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Black', 'White', 'Red', 'Grey', 'Brown'],
  },

  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  invitedMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

allianceSchema.methods.kickMember = function (player) {
  // player.sendNotication
  this.members.pop(player._id);
  this.save();
};

allianceSchema.methods.inviteMember = function (player) {
  // player.sendNotication
  if (!this.members.includes(player._id)) {
    this.members.push(player._id);
  }
  this.save();
};

allianceSchema.methods.leaveAlliance = function (player) {
  // player.sendNotication to boss
  // also in userschema
  this.members.pop(player._id);
  this.save();
};

module.exports = mongoose.model('Alliance', allianceSchema);
