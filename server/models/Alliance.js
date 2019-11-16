const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allianceSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Black", "White", "Red", "Grey", "Brown"]
  },

  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  invitedMembers: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

allianceSchema.methods.kickMember = function(player) {
  console.log("allianceSchema kickMember triggered", player);
  // player.sendNotication
  this.members.pop(player._id);
  this.save();
};

allianceSchema.methods.inviteMember = function(player) {
  console.log("allianceSchema inviteMember triggered", player);
  // player.sendNotication

  if (!this.members.includes(player._id)) {
    this.members.push(player._id);
  }
  this.save();
};

allianceSchema.methods.leaveAlliance = function(player) {
  console.log("allianceSchema leaveAlliance triggered", player);
  // player.sendNotication to boss
  // also in userschema
  this.members.pop(player._id);
  this.save();
};

module.exports = mongoose.model("Alliance", allianceSchema);
