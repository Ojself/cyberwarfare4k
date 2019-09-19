function stashDropChance(user, multiplier = 1) {
  const commonStash = [
    "Raspberry Pi",
    "Ubertooth One",
    "EyeSpy Digital Spy Recorder",
    "Keylogger",
    "Lock pick set",
    "Linux for dummies",
    "Cables"
  ];
  const rareStash = [
    "WiFi Pineapple",
    "Mini Hidden Camera",
    "Rubber Ducky",
    "Proxmark3 Kit"
  ];
  const ultraStash = ["Computer", "HackRf One"];

  let givenStash;

  let decider = Math.round(Math.random() * 1000) + multiplier;

  if (decider > 750) {
    /* Give ultra  item */
    givenStash = ultraStash[Math.floor(Math.random() * ultraStash.length)];
  } else if (decider > 450) {
    /* Give rare item */
    givenStash = rareStash[Math.floor(Math.random() * rareStash.length)];
  } else {
    /* give common item */
    givenStash = commonStash[Math.floor(Math.random() * commonStash.length)];
  }
  return givenStash;
}

function crimeSkillDropChance(user) {
  let crimeSkills = [
    "Technical",
    "Social Engineering",
    "Forensics",
    "Cryptography"
  ];
  let givenCrimeSkill;

  let decider = Math.random() * 1000;

  if (decider > 750) {
    /* Give Technical skill */
    givenCrimeSkill = crimeSkills[0];
  } else if (decider > 500) {
    /* Give 'Social Engineering' skill */
    givenCrimeSkill = crimeSkills[1];
  } else if (decider > 250) {
    /* Give Forensics skill */
    givenCrimeSkill = crimeSkills[2];
  } else {
    /* give Cryptography skill */
    givenCrimeSkill = crimeSkills[3];
  }
  //user.giveSkill(givenCrimeSkill);
  return givenCrimeSkill;
}

// not been implemented yet
function legendaryDropChance(user) {
  const legendary = ["emp", "geostorm", "medusa"];

  let decider = Math.random() * 1000;

  if (decider > 998) {
    /* Give legendary skill */
    return legendary[Math.floor(Math.random() * legendary.length)];
  }
  return null;
}

function batteryCheck(user, x) {
  return user.playerStats.battery >= x;
}

function existingValue(value) {
  return !!value;
}

// e.g. user.playerStats.bitCoins >= item.price
function checkFunds(x, y) {
  return x >= y;
}

// checks for number of occurance is over
function checkOccuranceLimit(array, value, x) {
  const result = array.filter(el => el === value);
  return result.length >= x;
}

// Checks for two values being the same incl. type
function checkSameValue(valueX, valueY) {
  return valueX !== valueY;
}

// Nullifies values in obj so unnecessary data is left behind
function nullifyValues(obj, valuesArray) {
  for (key in obj) {
    if (valuesArray.includes(key)) {
      obj[key] = null;
    }
  }
  return obj;
}

module.exports = {
  checkFunds,
  stashDropChance,
  crimeSkillDropChance,
  batteryCheck,
  legendaryDropChance,
  existingValue,
  checkOccuranceLimit,
  checkSameValue,
  nullifyValues
};
