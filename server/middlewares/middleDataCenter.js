const {
  batteryCheck,
  checkFunds,
  checkSameValue,
  existingValue,
} = require('./middleHelpers');

// Sees if everything is in order to buy dataCenter
function purchaseDataCenterCriterias(user, dataCenter, batteryCost) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(dataCenter)) {
    return "Datacenter doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }
  if (
    checkSameValue(user.playerStats.city.toString(), dataCenter.city.toString())
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
}

// Sees if everything is in order to attack datacenter
function attackDataCenterCriterias(user, dataCenter, batteryCost) {
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
}

const purchaseDataCenter = async (user, dataCenter) => {
  user.bitcoinDrain(dataCenter.price);
  dataCenter.handlePurchase(user._id);
  await dataCenter.save();
};

async function attackDataCenter(
  user,
  dataCenter,
  dataCenterOwner,
  batteryCost,
) {
  const userCpuSkill = user.hackSkill.CPU;
  const userCrimeSkills = Object.values(user.crimeSkill).filter(
    (skill) => typeof skill === 'number',
  );

  const probability = (userCpuSkill
      + userCrimeSkills[Math.floor(Math.random() * userCrimeSkills.length)])
    / 100;
  console.log(probability, 'probability');

  const decider = Math.random() + (dataCenter.difficulty * 4) / 100;
  console.log(decider, 'decider');
  const result = {
    batteryCost,
    damageDealt: 0,
    won: false,
    destroyed: false,
  };

  if (decider < probability) {
    result.damageDealt = Math.random() * probability;
    result.won = true;
    result.destroyed = dataCenter.currentFirewall - result.damageDealt <= 0;
  }
  const now = Date.now();
  user.handleDataCenterAttack(dataCenter, result);
  dataCenter.handleAttack(user._id, result);

  const notificationMessage = `${dataCenter.name} was attacked ${
    result.destroyed ? 'and destroyed' : ''
  } by ${user.name}!`;
  dataCenterOwner.sendNotification(notificationMessage, now);

  await dataCenterOwner.save();
  await dataCenter.save();
  return { result, user };
}

// checks if user has the required stash in order to attack a datacenter
function hasRequiredStash(userStash, requiredStash) {
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
}
module.exports = {
  purchaseDataCenterCriterias,
  attackDataCenterCriterias,
  attackDataCenter,
  purchaseDataCenter,
};
