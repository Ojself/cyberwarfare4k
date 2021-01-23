const mongoose = require('mongoose');

const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
  price: { type: Number, default: 2000 },
  residents: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  allianceOwner: { type: Schema.Types.ObjectId, ref: 'Alliance' },
  allianceFee: {
    type: Number,
    default: 0, // Percentage - 0.05 gives 5% to alliance
  },
  stashPriceMultiplier: { type: Number },
});

// pushes userId into residents so server (and client) knows which hacker is in which city
citySchema.methods.arrival = function (userId) {
  const oldArray = this.residents;
  oldArray.push(userId);
  this.residents = oldArray;
};

citySchema.methods.setFee = function (fee) {
  this.allianceFee = parseFloat(fee, 10);
};

citySchema.methods.setNewOwner = function (allianceId) {
  this.allianceOwner = allianceId;
};

// pop/pull userId into residents so server (and client) knows which hacker is in which city
citySchema.methods.departure = function (userId) {
  const oldArray = this.residents.filter((resident) => resident.toString() !== userId.toString());
  this.residents = oldArray;
};

module.exports = mongoose.model('City', citySchema);
