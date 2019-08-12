const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  price: { type: Number, default: 2000 },
  residents: { type: [Schema.Types.ObjectId], ref: 'User' },
  allianceBase: { type: Schema.Types.ObjectId, ref: 'Alliance' }
});

module.exports = mongoose.model('City', citySchema);

// pushes userId into residents so server (and client) knows which hacker is in which city
citySchema.methods.arrival = function(user) {
  console.log('arrival triggered', user);
  this.residents.push(user._id);
  this.save();
};

// pop userId into residents so server (and client) knows which hacker is in which city
citySchema.methods.departure = function(user) {
  console.log('departure triggered', user);
  this.residents.pop(user._id);
  this.save();
};
