const { existingValue } = require('../middlewares/middleHelpers');

function checkCreateAllianceCriteria(user, alliance) {
  if (!existingValue(user)) {
    return 'ùser not found';
  }
  if (!existingValue(alliance)) {
    return 'alliance already exist';
  }
  // if user doesn't have 1000000
  // if user doesn't have level 5

  return null;
}

const getShuffledArr = (arr) => { // TODO, put in helper
  if (arr.length === 1) {
    return arr;
  }
  const rand = Math.floor(Math.random() * arr.length);
  return [arr[rand], ...getShuffledArr(arr.filter((_, i) => i !== rand))];
};

const findAllianceStats = (alliances) => {
  let result = [];
  for (let i = 0; i < alliances.length; i += 1) {
    const allianceStats = {
      name: alliances[i].name,
      members: alliances[i].members.length,
      _id: alliances[i]._id,
      totSkills: 0,
      totCurrencies: 0,
      totWealth: 0,
      totBounty: 0,
      totRank: 0,
      totShutdowns: 0,
      totAttacksInitiated: 0,
      totAttacksVictim: 0,
      totCrimesInitiated: 0,
      totVpnChanges: 0,
      totCurrencyPurchases: 0,
    };

    for (let j = 0; j < alliances[i].members.length; j += 1) {
      allianceStats.totSkills = Object.values(
        alliances[i].members[j].hackSkill,
      ).reduce((t, n) => t + n);

      allianceStats.totSkills = Object.values(
        alliances[i].members[j].crimeSkill,
      ).reduce((t, n) => t + n);

      allianceStats.totCurrencies = Object.values(
        alliances[i].members[j].currencies,
      ).reduce((t, n) => t + n);

      allianceStats.totWealth += alliances[i].members[j].playerStats.networth;

      allianceStats.totBounty += alliances[i].members[j].playerStats.bounty;

      allianceStats.totRank += alliances[i].members[j].playerStats.rank;

      allianceStats.totShutdowns
          += alliances[i].members[j].fightInformation.shutdowns;

      allianceStats.totAttacksInitiated
          += alliances[i].members[j].fightInformation.attacksInitiated;

      allianceStats.totAttacksVictim
          += alliances[i].members[j].fightInformation.attacksVictim;

      allianceStats.totCrimesInitiated
          += alliances[i].members[j].fightInformation.crimesInitiated;

      allianceStats.totVpnChanges
          += alliances[i].members[j].fightInformation.vpnChanges;

      allianceStats.totCurrencyPurchases
          += alliances[i].members[j].fightInformation.currencyPurchases;
    }
    result.push(allianceStats);
  }
  result = getShuffledArr(result);
  return result;
};


module.exports = {
  checkCreateAllianceCriteria,
  findAllianceStats,

};
