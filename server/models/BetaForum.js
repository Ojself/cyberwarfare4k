const mongoose = require('mongoose');

const { Schema } = mongoose;

const betaForumSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
  allianceForum: { type: Boolean },
  alliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },

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

betaForumSchema.methods.editComment = function (newComment) {
  this.comment = newComment;
  this.edited = true;
  this.save();
};

betaForumSchema.methods.deleteComment = function () {
  this.deleted = true;
  this.save();
};

betaForumSchema.methods.addRemoveLike = function (userId) {
  const index = this.likes.indexOf(userId);
  if (index !== -1) {
    this.likes.splice(index, 1);
  } else {
    this.likes.push(userId);
  }
};

module.exports = mongoose.model('BetaForum', betaForumSchema);
