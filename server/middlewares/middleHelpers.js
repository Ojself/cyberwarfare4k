// multiplier is for later use. default is 1
function stashDropChance(user, multiplier = 1) {
  console.log('stashDropChance');
  const commonStash = [
    'Raspberry Pi',
    'Ubertooth One',
    'EyeSpy Digital Spy Recorder',
    'Keylogger',
    'Lock pick set',
    'Linux for dummies',
    'Cables'
  ];
  const rareStash = [
    'WiFi Pineapple',
    'Mini Hidden Camera',
    'Rubber Ducky',
    'Proxmark3 Kit'
  ];
  const ultraStash = ['Computer', 'HackRf One'];
  const legendary = ['emp', 'geostorm', 'medusa'];
  let givenStash = '';

  let decider = Math.round(Math.random() * 1000) + multiplier;
  if (decider - multiplier > 998) {
    /* Give legendary item */
    user.giveLegendary(legendary[Math.floor(Math.random() * legendary.length)]);
  } else if (decider > 750) {
    /* Give ultra  item */
    givenStash = ultraStash[Math.floor(Math.random() * ultraStash.length)];
  } else if (decider > 450) {
    /* Give rare item */
    givenStash = rareStash[Math.floor(Math.random() * rareStash.length)];
  } else {
    /* give common item */
    givenStash = commonStash[Math.floor(Math.random() * commonStash.length)];
  }
  user.giveStash(givenStash);
  return givenStash;
}

function crimeSkillDropChance(user) {
  console.log('crimeSkillDropChance');
  let crimeSkills = [
    'technical',
    'socialEngineering',
    'forensics',
    'cryptography'
  ];
  let givenCrimeSkill;

  let decider = Math.random() * 1000;

  if (decider > 750) {
    /* Give technical skill */
    givenCrimeSkill = crimeSkills[0];
  } else if (decider > 500) {
    /* Give socialEngineering skill */
    givenCrimeSkill = crimeSkills[1];
  } else if (decider > 250) {
    /* Give forensics skill */
    givenCrimeSkill = crimeSkills[2];
  } else {
    /* give cryptography skill */
    givenCrimeSkill = crimeSkills[3];
  }
  user.giveSkill(givenCrimeSkill);
  return givenCrimeSkill;
}

function batteryCheck(user, x) {
  console.log('batterycheck triggered');
  if (user.playerStats.battery < x) {
    console.log('batterycheck triggered condition met');
    return false;
  }
  return user.batteryDrain(x);
}
module.exports = {
  stashDropChance,
  crimeSkillDropChance,
  batteryCheck
};
