const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/User');

const forumSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  date: Date
});

userSchema.methods.editPost = function(comment) {
  console.log('forumpost editPost triggered', comment);

  this.comment = `ÈDITED: ${comment}`;
  this.save();
};

module.exports = mongoose.model('Forum', forumSchema);
