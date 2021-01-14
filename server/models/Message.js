const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: String,
  read: Boolean,
  text: String,
  genre: { type: String, enum: ['Message', 'Notification', 'SpyReport'], default: 'Message' },
  allianceInvitation: { type: Schema.Types.ObjectId, ref: 'Alliance' },
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

messageSchema.methods.readMe = function () {
  this.read = true;
  this.save();
};

/* messageSchema.methods.giveAnswer = function (answer, allianceName) {
  this.read = true;
  this.allianceInvitation = null;
  this.text = `You ${answer ? 'accepted' : 'declined'} The answer from ${allianceName}`;
}; */

module.exports = mongoose.model('Message', messageSchema);
