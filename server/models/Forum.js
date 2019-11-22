const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('../models/User');

const forumSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  date: Date,
  AlliancePost: { type: Schema.Types.ObjectId, ref: 'Alliance' },
});

forumSchema.methods.editPost = function (comment) {
  console.log('forumpost editPost triggered', comment);

  this.comment = `EDITED: ${comment}`;
  this.save();
};

module.exports = mongoose.model('Forum', forumSchema);
