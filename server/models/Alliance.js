/* eslint-disable func-names */
const mongoose = require('mongoose');
const { generateMessage } = require('../logic/_helpers');

const City = require('./City');

const { Schema } = mongoose;

const allianceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Black', 'White', 'Red', 'Grey', 'Brown'],
  },
  safe: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  invitedMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  boss: { type: Schema.Types.ObjectId, ref: 'User' },
  cto: { type: Schema.Types.ObjectId, ref: 'User' },
  analyst: { type: Schema.Types.ObjectId, ref: 'User' },
  firstLead: { type: Schema.Types.ObjectId, ref: 'User' },
  secondLead: { type: Schema.Types.ObjectId, ref: 'User' },
  firstMonkeys: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  secondMonkeys: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  organizePermission: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  forumModeratorPermission: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

allianceSchema.methods.depositSafe = async function (bitCoins) {
  this.safe += parseInt(bitCoins, 10);
};

allianceSchema.methods.withdrawSafe = async function (bitCoins) {
  this.safe -= parseInt(bitCoins, 10);
};

allianceSchema.methods.claimAlliance = async function (userId) {
  this.active = true;
  this.boss = userId;
};

allianceSchema.methods.leaveAlliance = function (playerId) {
  const playerIdString = playerId.toString();
  // player.sendNotication
  [
    'firstMonkeys',
    'secondMonkeys',
    'invitedMembers',
    'organizePermission',
    'forumModeratorPermission',
  ].forEach((r) => {
    // todo. string vs object?
    const playerRoleIndex = this[r].indexOf(playerIdString);
    if (playerRoleIndex !== -1) {
      this[r].splice(playerRoleIndex, 1);
    }
  });

  ['boss', 'cto', 'analyst', 'firstLead', 'secondLead'].forEach((r) => {
    if (this[r] && this[r].toString() === playerIdString) {
      this[r] = null;
    }
  });

  this.replaceBoss();
};

allianceSchema.methods.replaceBoss = function () {
  if (this.boss) return;
  let replacer;
  switch (true) {
    case !!this.analyst:
      replacer = this.analyst;
      this.analyst = null;
      break;
    case !!this.cto:
      replacer = this.cto;
      this.cto = null;
      break;
    case !!this.firstLead:
      replacer = this.firstLead;
      this.firstLead = null;
      break;
    case !!this.secondLead:
      replacer = this.secondLead;
      this.secondLead = null;
      break;
    case !!this.firstMonkeys.length:
      [replacer] = this.firstMonkeys;
      this.firstMonkeys.shift();
      break;
    case !!this.secondMonkeys.length:
      [replacer] = this.secondMonkeys;
      this.secondMonkeys.shift();
      break;
    default:
      this.abandonAlliance();
  }
  this.boss = replacer;
};

allianceSchema.methods.abandonAlliance = async function () {
  this.active = false;
  this.boss = null;
  this.analyst = null;
  this.cto = null;
  this.firstLead = null;
  this.secondLead = null;
  this.firstMonkeys = [];
  this.secondMonkeys = [];

  const city = await City.findOne({ allianceOwner: this._id });
  city.setNewOwner(null);
  await city.save();
};

allianceSchema.methods.inviteMember = async function (playerId) {
  const text = `You have been invited to join the alliance ${this.name}`;
  this.invitedMembers.push(playerId);
  await generateMessage(this.boss, playerId, text, this._id);
};

allianceSchema.methods.declineInvitation = function (playerId) {
  const playerIdString = playerId.toString();
  const oldArray = this.invitedMembers.filter((memberId) => memberId.toString() !== playerIdString);
  this.invitedMembers = oldArray;
};

allianceSchema.methods.acceptInvitation = function (playerId, role) {
  // player.sendNotication

  const invitedPlayerIndex = this.invitedMembers.indexOf(playerId);
  this.invitedMembers.splice(invitedPlayerIndex, 1);

  this[role].push(playerId);
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

allianceSchema.methods.changeAllianceRole = async function (playerId, newPosition, oldTitle) {
  // Checks if previous role is Array (code monkeys)
  if (Array.isArray(this[oldTitle])) {
    const playerIndex = this[oldTitle].indexOf(playerId);
    if (playerIndex > -1) {
      this[oldTitle].splice(playerIndex, 1);
    }
    // checks if old title is officer title
  } else {
    this[oldTitle] = null;
  }

  if (Array.isArray(this[newPosition])) {
    this[newPosition].push(playerId);
  } else {
    // sees if there is an existing player in the newposition and demotes this user to codemonkeys
    if (this[newPosition]) {
      this.firstMonkeys.push(this[newPosition]);
    }
    this[newPosition] = playerId;
  }
};

allianceSchema.methods.members = function (length = false) {
  const members = [
    this.boss,
    this.cto,
    this.analyst,
    this.firstLead,
    this.secondLead,
    ...this.firstMonkeys,
    ...this.secondMonkeys,
  ].filter(Boolean);
  return length ? members.length : members;
};

module.exports = mongoose.model('Alliance', allianceSchema);
