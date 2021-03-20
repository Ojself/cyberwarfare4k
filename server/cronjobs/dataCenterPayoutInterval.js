/* eslint-disable no-await-in-loop */
const DataCenter = require('../models/DataCenter');
const User = require('../models/User');

const dataCenterPayoutInterval = async () => {
  const dataCenters = await DataCenter.find({
    owner: { $exists: true, $ne: null },
  });

  if (Array.isArray(dataCenters)) {
    const amountByUser = dataCenters.reduce(
      (dict, dc) => ({
        ...dict,
        [dc.owner]: (dict[dc.owner] || 0) + dc.minutlyrevenue,
      }),
      {},
    );
    await Promise.all(
      Object.entries(amountByUser).map(([userId, amount]) => User.updateOne(
        { _id: userId },
        {
          $inc: {
            'playerStats.bitCoins': amount,
          },
        },
      )),
    );
  }
};

module.exports = dataCenterPayoutInterval;
