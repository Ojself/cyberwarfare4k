const mongoose = require('mongoose');

const { Schema } = mongoose;

const forumSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  locked: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
    enum: ['administration', 'general', 'offtopic', 'allianceChair'],
  },
  allianceForum: {
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

forumSchema.methods.toggleLocked = function () {
  this.locked = !this.locked;
  this.save();
};

module.exports = mongoose.model('Forum', forumSchema);
