const mongoose = require('mongoose');

const { Schema } = mongoose;

const notificationSchema = new Schema({
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: String,
  read: Boolean,
  text: [String],
  genre: {
    type: String,
    enum: ['General', 'Organized Crime', 'Spy Report', 'Logs'],
    default: 'General',
  },
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

notificationSchema.methods.readMe = function () {
  this.read = true;
};

module.exports = mongoose.model('Notification', notificationSchema);
