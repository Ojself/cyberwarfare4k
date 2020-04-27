const mongoose = require('mongoose');

const { Schema } = mongoose;


const forumThreadSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  description: String,
  locked: Boolean,
  allianceThread: Boolean,
  alliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});


module.exports = mongoose.model('ForumThread', forumThreadSchema);
