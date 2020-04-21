const mongoose = require('mongoose');

const { Schema } = mongoose;

const minigameSchema = new Schema({
  query: String,
  status: String,
  userId: { type: Schema.Types.ObjectId },
  generated: Number,
});

module.exports = mongoose.model('Minigame', minigameSchema);
