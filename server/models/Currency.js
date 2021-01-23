const mongoose = require('mongoose');

const { Schema } = mongoose;

const currencySchema = new Schema({
  name: String,
  color: String,
  initials: String,
  lowerPrice: Number,
  higherPrice: Number,
  levelReq: Number,
  price: Number,
  historyPrice: [Number],
  historyTime: [Number],
  // max a person can hold in percentage
  available: Number,
  marketCap: Number,
  lastPurchasedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  online: {
    type: Boolean,
    default: true,
  },
});

// makes less available crypto currency because why not

currencySchema.methods.purchaseHandle = function (amount, userId) {
  this.available -= amount;
  this.lastPurchasedBy = userId;
  // if the purchase is bigger than 8% of market cap. crush some coins
  /* if (amount) {
    this.available -= (this.available * 0.01);
  } */
  if (this.avialable < 0) {
    this.available = 0;
  }
};

currencySchema.methods.sellHandle = function (amount) {
  this.available += parseInt(amount, 10);
  if (this.available > this.marketCap) {
    this.marketCap = this.available;
  }
};

module.exports = mongoose.model('Currency', currencySchema);
