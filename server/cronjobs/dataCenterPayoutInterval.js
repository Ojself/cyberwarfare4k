/* eslint-disable no-await-in-loop */
const DataCenter = require('../models/DataCenter');
const User = require('../models/User');

const dataCenterPayoutInterval = async () => {
  const dataCenters = await DataCenter.find({ owner: { $exists: true, $ne: null } });

  if (dataCenters) {
  // eslint-disable-next-line no-restricted-syntax
    for (const dataCenter of dataCenters) {
      if (dataCenter.owner) {
        const owner = await User.findById(dataCenter.owner);
        if (owner) {
          owner.bitCoinGain(dataCenter.minutlyrevenue);
          await owner.save();
        }
      }
    }
  }
};

module.exports = dataCenterPayoutInterval;
