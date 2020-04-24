
const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: String,
  read: Boolean,
  text: String,

},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

messageSchema.methods.readMe = function () {
  console.log('hello');
  this.read = true;
  this.save();
};

module.exports = mongoose.model('Message', messageSchema);
