const { generateNotification, stash, randomNumberMinMax } = require('./_helpers');

const config = {
  MAX_STASH_REWARD: 2500,
  MAX_XP_REWARD: 500000,
  STASH_REWARD_RNG: 1 + (Math.random() / 2),
  increaseChanceOnFail: 0.02,
  chancesToAttack: 4,
};

const calculateOutcome = (result) => {
  result.orgCrime.roles.forEach((role) => {
    if (role.owner) {
      const userSkillNumber = role.owner.crimeSkill[role.roleName];
      const crimeSkillNumber = role.difficulty;
      let probability = (userSkillNumber - crimeSkillNumber) / 70;
      let currentWinPercentage = 0;
      if (currentWinPercentage === 0)probability += config.increaseChanceOnFail;
      for (let i = 0; i < config.chancesToAttack; i += 1) {
        if (Math.random() < probability) {
          currentWinPercentage += 50 / result.amountRoles / config.chancesToAttack;
        }
      }

      let response = '';
      if (currentWinPercentage) {
        response += `${role.owner.name} SUCCEEDED to ${role.description}`;
        if (currentWinPercentage === 50 / result.amountRoles) {
          response += ' ⭐️';
        }
      } else {
        response += `${role.owner.name} FAILED to ${role.description}`;
      }
      result.winPercentage += currentWinPercentage;
      result.responses.unshift(response);
    } else {
      result.responses.push(`Missing Hacker: ${role.description}`);
    }
  });
  result.responses.unshift(result.orgCrime.name);

  // Reward for having every role equipped
  if (result.amountMembers === result.amountRoles && result.winPercentage > 21) {
    result.winPercentage += 50;
  }
  return result;
};

const calculateRewards = (result) => {
  const randomStashIndex = Math.floor(randomNumberMinMax(result.amountMembers + 3, stash.length));
  const randomStash = stash[randomStashIndex];
  result.stash = randomStash;
  if (result.winPercentage) {
    const percentage = result.winPercentage / 100;
    result.stashAmount = Math.round(config.MAX_STASH_REWARD * percentage * config.STASH_REWARD_RNG);
    result.xp = Math.round(config.MAX_XP_REWARD * percentage);
  }

  const rewardResponse = `You stole ${Math.round(result.stashAmount / result.amountRoles)} ${randomStash}!`;
  const expResponse = `You get ${Math.round(result.xp / result.amountRoles)} xp!`;
  result.responses.push(rewardResponse);
  result.responses.push(expResponse);
};
const giveRewards = (result) => {
  result.orgCrime.roles.forEach((role) => {
    if (role.owner) {
      role.owner.handleOrgCrime(result, result.amountRoles);
    }
  });
};
const commitOrginaziedCrime = async (orgCrime) => {
  const amountMembers = orgCrime.roles.filter((role) => role.owner).length;
  const amountRoles = orgCrime.roles.length;
  const result = {
    winPercentage: 0,
    responses: [],
    orgCrime,
    amountMembers,
    amountRoles,
    xp: 0,
    stash: null,
    stashAmount: 0,
  };
  calculateOutcome(result);
  calculateRewards(result);

  // Sends notifications
  try {
    await Promise.all(result.orgCrime.roles.map((role) => {
      if (!role.owner) return;
      return generateNotification(role.owner._id, result.responses, 'Organized Crime');
    }));
  } catch (err) {
    console.error('Error: ', err);
  }

  giveRewards(result);

  try {
    await Promise.all(result.orgCrime.roles.map((role) => {
      if (role.owner)role.owner.save();
    }));
  } catch (err) {
    console.error('Error: ', err);
  }
};

module.exports = { commitOrginaziedCrime };
