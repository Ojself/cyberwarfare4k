const mongoose = require("mongoose");

const { Schema } = mongoose;

const allianceSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["Black", "White", "Red", "Grey", "Brown"],
  },
  active: { type: Boolean, default: false },
  invitedMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  boss: { type: Schema.Types.ObjectId, ref: "User" },
  cto: { type: Schema.Types.ObjectId, ref: "User" },
  analyst: { type: Schema.Types.ObjectId, ref: "User" },
  firstLead: { type: Schema.Types.ObjectId, ref: "User" },
  secondLead: { type: Schema.Types.ObjectId, ref: "User" },
  firstMonkeys: [{ type: Schema.Types.ObjectId, ref: "User" }],
  secondMonkeys: [{ type: Schema.Types.ObjectId, ref: "User" }],

  organizePermission: [{ type: Schema.Types.ObjectId, ref: "User" }],
  forumModeratorPermission: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

allianceSchema.methods.leaveAlliance = function (playerId) {
  // player.sendNotication

  // splices
  const playerIndex = this.members.indexOf(playerId);
  this.members.splice(playerIndex, 1);

  [
    "firstMonkeys",
    "secondMonkeys",
    "organizePermission",
    "forumModeratorPermission",
  ].forEach((r) => {
    const playerRoleIndex = this[r].indexOf(playerId);
    if (playerRoleIndex !== -1) {
      this[r].splice(playerRoleIndex, 1);
    }
  });

  ["cto", "analyst", "firstLead", "secondLead"].forEach((r) => {
    if (this[r] === playerId) {
      this[r] = null;
    }
  });

  this.save();
};

allianceSchema.methods.inviteMember = function (playerId) {
  // player.sendNotication

  this.invitedMembers.push(playerId);
  this.save();
};

allianceSchema.methods.withdrawInvitation = function (playerId) {
  // player.sendNotication
  const playerIndex = this.invitedMembers.indexOf(playerId);
  this.invitedMembers.splice(playerIndex, 1);
  this.save();
};

allianceSchema.methods.acceptInvitation = function (playerId) {
  // player.sendNotication

  const invitedPlayerIndex = this.invitedMembers.indexOf(playerId);
  this.invitedMembers.splice(invitedPlayerIndex, 1);

  this.members.push(playerId);
  const randomBool = Math.random() > 0.5;
  if (randomBool) {
    this.firstMonkeys.push(playerId);
  } else {
    this.secondMonkeys.push(playerId);
  }

  this.save();
};

allianceSchema.methods.toggleOrganizePermission = function (playerId) {
  // player.sendNotication
  const playerIndex = this.organizePermission.indexOf(playerId);
  if (playerIndex !== -1) {
    this.organizePermission.splice(playerIndex, 1);
  } else {
    this.organizePermission.push(playerIndex);
  }

  this.save();
};

allianceSchema.methods.toggleForumModeratorPermission = function (playerId) {
  // player.sendNotication
  const playerIndex = this.forumModeratorPermission.indexOf(playerId);
  if (playerIndex !== -1) {
    this.forumModeratorPermission.splice(playerIndex, 1);
  } else {
    this.forumModeratorPermission.push(playerIndex);
  }
  this.save();
};

allianceSchema.methods.changeAllianceRole = function (playerId, newPosition) {
  // player.sendNotication
  if (
    ["boss", "cto", "analyst", "firstLead", "secondLead"].includes(newPosition)
  ) {
    // sees if there is an existing player in the newposition and demotes this user to codemonkeys
    if (this[newPosition]) {
      const randomBool = Math.random() > 0.5;
      if (randomBool) {
        this.firstMonkeys.push(this[newPosition]);
      } else {
        this.secondMonkeys.push(this[newPosition]);
      }
    }
    this[newPosition] = playerId;
  }
  if (["firstMonkeys", "secondMonkeys"].includes(newPosition)) {
    this[newPosition].push(playerId);
  }
  this.save();
};

allianceSchema.methods.members = function () {
  return [
    this.boss,
    this.cto,
    this.analyst,
    this.firstLead,
    this.secondLead,
    ...this.firstMonkeys,
    ...this.secondMonkeys,
  ].filter(Boolean);
};

module.exports = mongoose.model("Alliance", allianceSchema);
