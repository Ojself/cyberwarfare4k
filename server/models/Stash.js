const mongoose = require('mongoose');

const { Schema } = mongoose;

const stashSchema = new Schema({
  name: String,
  lowerPrice: Number,
  price: Number,
});

module.exports = mongoose.model('Stash', stashSchema);
