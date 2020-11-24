const DataCenter = require('../models/DataCenter');
const User = require('../models/User');

const dataCenterPayoutInterval = async () => {
  const dataCenters = await DataCenter.find();
  dataCenters.map((d) => {
    if (d.status === 'Owned') {
      User.findById(d.owner).then((u) => {
        if (u) {
          u.bitcoinGain(d.minutlyrevenue);
        }
      });
    }
  });
};

module.exports = dataCenterPayoutInterval;
