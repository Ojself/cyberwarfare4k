function purchaseDataCentreCriterias(user, dataCentre, batteryCost) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(dataCentre)) {
    return "Datacentre doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }

  if (
    checkSameValue(user.playerStats.city.toString(), dataCentre.city.toString())
  ) {
    return `You can't purchase a datacentre outside your city`;
  }

  if (!existingValue(dataCentre.owner)) {
    return 'This datacentre already has an owner';
  }

  if (!existingValue(dataCentre.gracePeriod)) {
    return 'This datacentre is not available at the moment';
  }

  if (!checkFunds(user.playerStats.bitCoins, dataCentre.price)) {
    return 'Insufficent money';
  }

  return null;
}

function attackDataCentreCriterias() {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }

  if (!existingValue(dataCentre)) {
    return "Datacentre doesn't exist";
  }
  if (!batteryCheck(user, batteryCost)) {
    return 'Insufficent battery';
  }

  if (!existingValue(dataCentre.gracePeriod)) {
    return 'This datacentred is graced at the moment';
  }

  if (checkSameValue(user._id.toString(), dataCentre.owner._id.toString())) {
    return `You can't attack your own datacentre`;
  }
  if (dataCentre.currentFirewall <= 0) {
    return `This datacentre is down for maintance and might be available for purchase soon`;
  }

  if (!checkRequiredStash(user, dataCentre)) {
    return `You don't have the required items to hack this datacentre`;
  }
}

function purchaseDataCentre(user, dataCentre, batteryCost) {
  user.handleDataCentrePurchase(dataCentre, batteryCost);
  dataCentre.handlePurchase(user);
}

function attackDataCentre(user, dataCentre, dataCentreOwner, batteryCost) {
  const userCpuSkill = Object.Values(user.hackSkill.userCpuSkill);
  const userCrimeSkills = Object.Values(user.CrimeSkill);

  // (cpuskill + random crimeskill) / difficulty.
  const probability =
    (userCpuSkill / 100 +
      userCrimeSkills[Math.floor(Math.random() * userCrimeSkills.length)] /
        1000) /
    dataCentre.difficulty;
  const decider = Math.random();

  const result = {
    batteryCost,
    damageDealt: 10 + Math.ceil(probability * 10),
    won: false,
    destroyed: false
  };

  if (decider > probability) {
    result.won = true;
    if (dataCentre.currentFirewall - result.damageDealt <= 0) {
      result.destroyed = true;
      user.handleDataCentreAttack(dataCentre, result);
      dataCentre.handleDestroyed(user._id, dataCentreOwner, result);
      dataCentreOwner.giveNotification(
        `${dataCentre.name} was attacked and shut down by ${user.name}!`
      );
    } else {
      user.handleDataCentreAttack(dataCentre, result);
      dataCentre.handleAttack(user._id, dataCentreOwner, result);
      dataCentreOwner.giveNotification(
        `${dataCentre.name} was attacked by ${user.name}!`
      );
    }
  }
  return result;
}

function checkRequiredStash(user, dataCentre) {
  const requiredItems = dataCentre.requiredStash;
  const userStash = ['cat', 'dog', 'dog', 'dog', 'idiot'];
  const intersection = requiredItems.filter(
    el => userStash.indexOf(el.toString()) !== -1
  );
  return intersection.length >= requiredItems.length;
}
