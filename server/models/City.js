const mongoose = require('mongoose');

const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
  price: { type: Number, default: 2000 },
  residents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  stashPriceMultiplier: { type: Number },
  owner: { type: Schema.Types.ObjectId, ref: 'Alliance' },
});

// pushes userId into residents so server (and client) knows which hacker is in which city
citySchema.methods.arrival = function (userId) {
  const oldArray = this.residents;
  oldArray.push(userId);
  this.residents = oldArray;
  this.save();
};

// pop/pull userId into residents so server (and client) knows which hacker is in which city
citySchema.methods.departure = function (userId) {
  const oldArray = this.residents.filter((resident) => resident.toString() !== userId.toString());
  this.residents = oldArray;

  this.save();
};

module.exports = mongoose.model('City', citySchema);
