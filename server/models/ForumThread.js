const mongoose = require('mongoose');

const { Schema } = mongoose;

const forumThreadSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  forum: { type: Schema.Types.ObjectId, ref: 'Forum', required: true },
  locked: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  allianceThread: {
    type: Boolean,
    default: false,
  },
  alliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

forumThreadSchema.methods.toggleLocked = function () {
  console.log('toggleLocked  triggered');
  this.locked = !this.locked;
  this.save();
};

forumThreadSchema.methods.toggleSticky = function () {
  console.log('toggleSticky  triggered');
  this.sticky = !this.sticky;
  this.save();
};


module.exports = mongoose.model('ForumThread', forumThreadSchema);
