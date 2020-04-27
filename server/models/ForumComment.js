const mongoose = require('mongoose');

const { Schema } = mongoose;

const forumCommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  forumThread: { type: Schema.Types.ObjectId, ref: 'ForumThread' },
  edited: Boolean,

}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

forumCommentSchema.methods.editPost = function (comment) {
  console.log('forumpost editPost triggered', comment);
  this.comment = comment;
  this.edited = true;
  this.save();
};

module.exports = mongoose.model('ForumComment', forumCommentSchema);
