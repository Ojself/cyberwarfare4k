const rankSchema = new Schema({
  name: String,
  rank: Number,
  expToNewRank: {
    type: Number,
    default: 10000
  }
});
