const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemSchema = new Schema({
  name: String,
  type: {
    type: String,
    enum: ['cpu', 'firewall', 'avs', 'encryption'],
  },
  price: Number,
  bonus: Number,
});

module.exports = mongoose.model('Item', itemSchema);
