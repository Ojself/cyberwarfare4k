const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  expires: Date,
  session: String
});

module.exports = mongoose.model("Session", sessionSchema);
