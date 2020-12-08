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
  const randomPrice = (Math.random() * (multiplier - this.lowerPrice) + this.lowerPrice).toFixed(2);
  this.price = parseFloat(randomPrice);

  this.save();
};

module.exports = mongoose.model('Stash', stashSchema);
