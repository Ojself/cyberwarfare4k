const {
  batteryCheck,
  checkFunds,
  checkSameValue,
  existingValue
} = require('../middlewares/middleHelpers');

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
    return `You can't purchase a datacenter outside your city`;
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

function attackDataCenterCriterias() {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }

  if (!existingValue(dataCenter)) {
    return "Datacenter doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }

  if (!existingValue(dataCenter.gracePeriod)) {
    return 'This datacenterd is graced at the moment';
  }

  if (checkSameValue(user._id.toString(), dataCenter.owner._id.toString())) {
    return `You can't attack your own datacenter`;
  }
  if (dataCenter.currentFirewall <= 0) {
    return `This datacenter is down for maintance and might be available for purchase soon`;
  }

  if (!checkRequiredStash(user, dataCenter)) {
    return `You don't have the required items to hack this datacenter`;
  }
}

function purchaseDataCenter(user, dataCenter, batteryCost) {
  user.handleDataCenterPurchase(dataCenter, batteryCost);
  dataCenter.handlePurchase(user);
}

function attackDataCenter(user, dataCenter, dataCenterOwner, batteryCost) {
  const userCpuSkill = Object.Values(user.hackSkill.userCpuSkill);
  const userCrimeSkills = Object.Values(user.CrimeSkill);

  // (cpuskill + random crimeskill) / difficulty.
  const probability =
    (userCpuSkill / 100 +
      userCrimeSkills[Math.floor(Math.random() * userCrimeSkills.length)] /
        1000) /
    dataCenter.difficulty;
  const decider = Math.random();

  const result = {
    batteryCost,
    damageDealt: 10 + Math.ceil(probability * 10),
    won: false,
    destroyed: false
  };

  if (decider > probability) {
    result.won = true;
    if (dataCenter.currentFirewall - result.damageDealt <= 0) {
      result.destroyed = true;
      user.handleDataCenterAttack(dataCenter, result);
      dataCenter.handleDestroyed(user._id, dataCenterOwner, result);
      dataCenterOwner.giveNotification(
        `${dataCenter.name} was attacked and shut down by ${user.name}!`
      );
    } else {
      user.handleDataCenterAttack(dataCenter, result);
      dataCenter.handleAttack(user._id, dataCenterOwner, result);
      dataCenterOwner.giveNotification(
        `${dataCenter.name} was attacked by ${user.name}!`
      );
    }
  }
  return result;
}

function checkRequiredStash(user, dataCenter) {
  const requiredItems = dataCenter.requiredStash;
  const userStash = ['cat', 'dog', 'dog', 'dog', 'idiot'];
  const intersection = requiredItems.filter(
    el => userStash.indexOf(el.toString()) !== -1
  );
  return intersection.length >= requiredItems.length;
}
module.exports = {
  purchaseDataCenterCriterias,
  attackDataCenterCriterias,
  attackDataCenter,
  purchaseDataCenter
};
