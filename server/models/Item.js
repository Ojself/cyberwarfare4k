const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['CPU', 'Firewall', 'AntiVirus', 'Encryption']
  },
  price: Number,
  bonus: Number
});

module.exports = mongoose.model('Item', itemSchema);
