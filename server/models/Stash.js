const mongoose = require('mongoose');

const { Schema } = mongoose;

const stashSchema = new Schema({
  name: String,
  lowerPrice: Number,
  price: Number,
});

stashSchema.methods.setNewRandomPrice = function () {
  const rng = Math.random() + 1;
  const multiplier = this.lowerPrice * rng;
  this.price = Math.floor(multiplier);
  this.save();
};

module.exports = mongoose.model('Stash', stashSchema);
