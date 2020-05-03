const mongoose = require('mongoose');

const { Schema } = mongoose;

const forumCommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },

  forumThread: { type: Schema.Types.ObjectId, ref: 'ForumThread', required: true },
  edited: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],

}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

forumCommentSchema.methods.editComment = function (comment) {
  console.log('forumpost editPost triggered', comment);
  this.comment = comment;
  this.edited = true;
  this.save();
};

forumCommentSchema.methods.deleteComment = function () {
  console.log('forumpost delete triggered');
  this.deleted = true;
  this.save();
};

forumCommentSchema.methods.addRemoveLike = function (userId) {
  console.log(addRemoveLike, 'addRemoveLike');
  const index = this.likes.indexOf(userId);
  if (index !== -1) {
    this.likes.splice(index, 1);
  } else {
    this.likes.push(userId);
  }
  this.save();
};


module.exports = mongoose.model('ForumComment', forumCommentSchema);
