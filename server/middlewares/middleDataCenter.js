const {
  batteryCheck,
  checkFunds,
  checkSameValue,
} = require('./middleHelpers');

const healDataCenterCriterias = (user, dataCenter) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!dataCenter) {
    return "Datacenter doesn't exist";
  }
  if (!checkFunds(user.playerStats.bitCoins, dataCenter.price)) {
    return 'Insufficient funds';
  }
  return null;
};

// Sees if everything is in order to buy dataCenter
const purchaseDataCenterCriterias = (user, dataCenter) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!dataCenter) {
    return "Datacenter doesn't exist";
  }
  if (checkSameValue(user.playerStats.city.toString(), dataCenter.city.toString())
  ) {
    return "You can't purchase a datacenter outside your city";
  }
  if (dataCenter.owner) {
    return 'This datacenter already has an owner';
  }
  if (dataCenter.gracePeriod) {
    return 'This datacenter is not available at the moment';
  }
  if (!checkFunds(user.playerStats.bitCoins, dataCenter.price)) {
    return 'Insufficient funds';
  }
  return null;
};

// Sees if everything is in order to attack datacenter
const attackDataCenterCriterias = (user, dataCenter, batteryCost) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!dataCenter) {
    return "Datacenter doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (dataCenter.gracePeriod) {
    return 'This datacenter is currently graced';
  }
  if (JSON.stringify(user._id) === JSON.stringify(dataCenter.owner._id)) {
    return "You can't attack your own datacenter";
  }
  if (dataCenter.currentFirewall <= 0) {
    return 'This datacenter is down for maintance and might be available for purchase soon';
  }
  if (!hasRequiredStash(user.stash, dataCenter.requiredStash)) {
    return "You don't have the required stash to hack this datacenter";
  }
};

const purchaseDataCenter = async (user, dataCenter) => {
  user.bitCoinDrain(dataCenter.price);
  dataCenter.handlePurchase(user._id);
  await dataCenter.save();
};

const attackDataCenter = async (
  user,
  dataCenter,
  dataCenterOwner,
  batteryCost,
) => {
  const userCpuSkill = user.hackSkill.CPU;
  const userCrimeSkillsAverage = Object.values(user.crimeSkill)
    .filter((skill) => typeof skill === 'number')
    .reduce((acc, cur) => acc + cur, 0) / 4;

  // Max 1
  let probability = (userCpuSkill + userCrimeSkillsAverage) / 400;
  if (probability < 0.05)probability = 0.05;
  if (probability > 0.95)probability = 0.95;

  let decider = (dataCenter.difficulty / 200) + Math.random() / 2;
  if (decider < 0.05)decider = 0.05;
  if (decider > 0.95)decider = 0.95;
  const result = {
    batteryCost,
    damageDealt: 0,
    won: false,
    destroyed: false,
  };

  if (decider < probability) {
    result.damageDealt = Math.round(Math.random() * (userCpuSkill * 0.15 - userCpuSkill * 0.10) + (userCpuSkill * 0.10));
    result.won = true;
    result.destroyed = dataCenter.currentFirewall - result.damageDealt <= 0;
  }
  const now = Date.now();
  user.handleDataCenterAttack(dataCenter, result);
  dataCenter.handleAttack(user._id, result);

  const notificationMessage = `Datacenter ${dataCenter.name} was attacked ${
    result.destroyed ? 'and destroyed' : ''
  } by ${user.name}!`;
  dataCenterOwner.sendNotification(notificationMessage, now);

  await dataCenterOwner.save();
  await dataCenter.save();
  return { result, user };
};

// checks if user has the required stash in order to attack a datacenter
const hasRequiredStash = (userStash, requiredStash) => {
  const requiredStashObj = requiredStash.reduce((a, b) => {
    if (typeof a[b.name] === 'undefined') {
      a[b.name] = 1;
    } else {
      a[b.name] += 1;
    }
    return a;
  }, {});
  const userHasRequiredStash = Object.keys(requiredStashObj).every((stash) => requiredStashObj[stash] <= userStash[stash]);
  return userHasRequiredStash;
};
module.exports = {
  purchaseDataCenterCriterias,
  attackDataCenterCriterias,
  attackDataCenter,
  purchaseDataCenter,
  healDataCenterCriterias,
};
