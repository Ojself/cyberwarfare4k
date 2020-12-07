const mongoose = require('mongoose');

const { Schema } = mongoose;

const stashSchema = new Schema({
  name: String,
  lowerPrice: Number,
  price: Number,
});

stashSchema.methods.setNewRandomPrice = function () {
  const multiplier = this.lowerPrice * (Math.random() + 1);
  this.price = Math.floor(multiplier);
};

module.exports = mongoose.model('Stash', stashSchema);
