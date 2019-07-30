const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: String,
  residents: { type: [Schema.Types.ObjectId], ref: 'User' },
  dataCenters: { type: [Schema.Types.ObjectId], ref: 'DataCenter' },
  allianceBase: { type: Schema.Types.ObjectId, ref: 'Alliance' }
});

module.exports = mongoose.model('City', citySchema);
