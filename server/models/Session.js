const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  expires: Date,
  session: String,
});

module.exports = mongoose.model('Session', sessionSchema);
