const { generateNotification } = require('./_helpers');
const DataCenter = require('../models/DataCenter');

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

const healDataCenterCriterias = (user, dataCenter, healCost) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!dataCenter) {
    return "Datacenter doesn't exist";
  }
  if (user.playerStats.bitCoins < healCost) {
    return 'Insufficient funds';
  }
  return null;
};

// Sees if everything is in order to buy dataCenter
const purchaseDataCenterCriterias = (user, dataCenter, now) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!dataCenter) {
    return "Datacenter doesn't exist";
  }
  if (user.playerStats.city.toString() !== dataCenter.city.toString()) {
    return "You can't purchase a datacenter outside your city";
  }
  if (dataCenter.owner) {
    return 'This datacenter already has an owner';
  }
  if (dataCenter.gracePeriod > now) {
    return 'This datacenter is not available at the moment';
  }
  if (user.playerStats.bitCoins < dataCenter.price) {
    return 'Insufficient funds';
  }
  return null;
};

// Sees if everything is in order to attack datacenter
const attackDataCenterCriterias = (user, dataCenter, batteryCost, now) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!dataCenter) {
    return "Datacenter doesn't exist";
  }
  if (user.playerStats.battery < batteryCost) {
    return 'Insufficent battery';
  }
  if (dataCenter.gracePeriod > now) {
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
  const { equippedWeapon } = user.fightInformation;
  const weaponPower = user.hackSkill[equippedWeapon];

  const userCrimeSkillsAverage = Object.values(user.crimeSkill)
    .filter((skill) => typeof skill === 'number')
    .reduce((acc, cur) => acc + cur, 0) / 4;

  const totalPower = (weaponPower + userCrimeSkillsAverage) / 2;

  // Max 1
  let probability = ((totalPower) / 400) + Math.random() / 4;
  if (probability < 0.05)probability = 0.05;
  if (probability > 0.95)probability = 0.95;

  let decider = (dataCenter.difficulty / 200) + Math.random() / 3;
  if (decider < 0.05)decider = 0.05;
  if (decider > 0.95)decider = 0.95;
  const result = {
    batteryCost,
    damageDealt: 0,
    won: false,
    destroyed: false,
  };

  const maxDamage = totalPower * 0.16;
  const minDamage = totalPower * 0.10;

  if (decider < probability) {
    result.damageDealt = Math.round(Math.random() * (maxDamage - minDamage) + (minDamage));
    result.won = true;
    result.destroyed = dataCenter.currentFirewall - result.damageDealt <= 0;
  }
  const now = Date.now();
  user.handleDataCenterAttack(dataCenter, result);
  dataCenter.handleAttack(user._id, result, now);

  const notificationText = `Datacenter ${dataCenter.name} was attacked ${
    result.destroyed ? 'and destroyed' : ''} by ${user.name}!`;
  await generateNotification(dataCenterOwner._id, notificationText);

  await dataCenterOwner.save();
  await dataCenter.save();
  return { result, user };
};

const attachDatacenterStatus = (dataCenters) => {
  const now = Date.now();
  const sixtySec = 1000 * 60;

  dataCenters.forEach((dc) => {
    let status = 'Available';
    if (dc.owner) {
      status = 'Owned';
      if (dc.attacker && dc.gracePeriod - sixtySec < now && dc.gracePeriod > now) {
        status = 'Under Attack';
      }
    } else if (dc.gracePeriod > now) {
      status = 'Resetting';
    }
    dc.gracePeriod = null;
    dc.status = status;
  });
  return dataCenters;
};

const findDataCenters = async (params, owner, userId) => {
  let dataCenters = await DataCenter.find(params)
    .populate('requiredStash', ['name', 'price'])
    .populate('city', ['name', 'residents'])
    .populate('owner', 'name')
    .populate('attacker', 'name')
    .sort({ price: 1 })
    .lean();
  // filter out the datacenters that don't belong to the city the user is in
  if (!owner) {
    dataCenters = dataCenters.filter((dc) => {
      const stringifiedObjectId = JSON.stringify(dc.city.residents);
      return stringifiedObjectId.includes(userId.toString());
    });
  }
  return attachDatacenterStatus(dataCenters);
};
module.exports = {
  purchaseDataCenterCriterias,
  attackDataCenterCriterias,
  attackDataCenter,
  purchaseDataCenter,
  healDataCenterCriterias,
  findDataCenters,
};
