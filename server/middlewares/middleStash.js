const summarizeStash = (user, dbStashes, stashToBuy) => {
  let totalSum = 0;
  Object.keys(stashToBuy).forEach((stash) => {
    const foundStash = dbStashes.find((dbStash) => dbStash.name === stash);
    if (foundStash && !!stashToBuy[foundStash.name]) {
      totalSum += (foundStash.price * user.playerStats.city.stashPriceMultiplier * parseInt(stashToBuy[foundStash.name], 10));
    }
  });
  return totalSum;
};

const sellsTooMany = (stashToSell, user) => Object.keys(stashToSell).some((stashName) => stashToSell[stashName] > user.stash[stashName]);
const buysTooMany = (stashToBuy, user) => Object.keys(stashToBuy).some((stashName) => stashToBuy[stashName] + user.stash[stashName] > 50);

const cleanObj = (objToClean) => {
  const cleanedObject = JSON.parse(JSON.stringify(objToClean));
  Object.keys(cleanedObject).forEach((key) => {
    if (cleanedObject[key] === 0 || cleanedObject[key] === '0') {
      delete cleanedObject[key];
    }
    if (typeof cleanedObject[key] === 'string') {
      cleanedObject[key] = parseInt(cleanedObject[key], 10);
    }
  });
  return cleanedObject;
};

const checkSellStashCriteria = (stashToSell, user) => {
  if (sellsTooMany(stashToSell, user)) {
    return 'You can\'t sell more than you have';
  }
  return null;
};

const checkBuyStashCriteria = (stashToBuy, user, totalSum) => {
  if (buysTooMany(stashToBuy, user)) {
    return 'You can\'t buy this many';
  }
  if (totalSum > user.playerStats.bitCoins) {
    return 'insufficent funds..';
  }
  return null;
};

module.exports = {
  checkBuyStashCriteria, checkSellStashCriteria, cleanObj, summarizeStash,
};
