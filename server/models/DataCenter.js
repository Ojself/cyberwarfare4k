const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const City = require('./City');

const dataCenterSchema = new Schema({
  name: String,
  status: {
    type: String,
    enum: ['Available', 'Under Attack', 'Malfunctioning', 'Owned'],
    default: 'Available'
  },
  price: {
    type: Number,
    default: 1000000
  },
  difficulty: Number,
  currentFirewall: {
    type: Number,
    default: 100
  },
  maxFirewall: {
    type: Number,
    default: 100
  },
  city: { type: Schema.Types.ObjectId, ref: 'City' },
  attacker: { type: Schema.Types.ObjectId, ref: 'User' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  ownerAlliance: { type: Schema.Types.ObjectId, ref: 'Alliance' },
  minutlyrevenue: Number,
  timeToAvailable: Number,
  avaialble: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('dataCenter', dataCenterSchema);
