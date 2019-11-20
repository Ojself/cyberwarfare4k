const DataCenter = require("../models/DataCenter");
const User = require("../models/User");

function dataCenterPayoutInterval() {
  DataCenter.find().then(d => {
    d.map(d => {
      if (d.status === "Owned") {
        const user = User.findById(d.owner).then(u => {
          u.bitcoinGain(d.minutlyrevenue);
        });
      }
      // d.save()
    });
  });
}

module.exports = dataCenterPayoutInterval;
