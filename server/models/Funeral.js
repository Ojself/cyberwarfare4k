const mongoose = require('mongoose');

const { Schema } = mongoose;

const funeralSchema = new Schema({
  name: String,
  avatar: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  alliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
  bounty: Number,
  comments: [{
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: String, required: true },
    flower: { type: String, required: true },
  }],

}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

funeralSchema.methods.postComment = function (userId, comment, flower) {
  const newComment = {
    creator: userId,
    comment,
    flower,
  };
  const oldArray = this.comments;
  oldArray.unshift(newComment);
  this.comments = oldArray;
};

module.exports = mongoose.model('Funeral', funeralSchema);
