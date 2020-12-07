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
  lastPurchasedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
  // and raise the price limits
  if (amount > ((this.maxAmountHold - 2) / 100) * this.marketCap) {
    this.lowerPrice *= 1.05;
    this.higherPrice *= 1.1;
    this.available -= (this.available * 0.001);
  }
  if (this.avialable < 0) {
    this.available = 0;
  }
  this.save();
};

currencySchema.methods.sellHandle = function (amount) {
  this.available += parseInt(amount, 10);
  this.save();
};

module.exports = mongoose.model('Currency', currencySchema);
