const { calculateNetworth } = require('../routes/helper/index');
const Currency = require('../models/Currency');

const checkCreateAllianceCriteria = (user, alliance, createCost) => {
  if (!user) {
    return 'ùser not found';
  }
  if (!alliance) {
    return 'alliance already exist';
  }
  if (user.alliance || user.allianceRole) {
    return 'You are already in an alliance';
  }
  const allianceMembers = alliance.members();
  if (allianceMembers.length) {
    return 'This alliance already have members';
  }
  if (user.playerStats.rank < 4) {
    return 'You are too unexperienced to create your own alliance...';
  }
  if (user.playerStats.bitCoins < createCost) {
    return 'Insufficent bitcoins...';
  }

  return null;
};

const findAllianceStats = async (alliances) => {
  const currencies = await Currency.find();
  const result = [];
  alliances.forEach((alliance) => {
    const allianceStats = {
      name: alliance.name,
      members: alliance.members(true),
      _id: alliance._id,
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
    const currentMembers = alliance.members();
    currentMembers.forEach((mem) => {
      allianceStats.totSkills += Object.values(
        mem.hackSkill,
      ).reduce((t, n) => t + n);

      allianceStats.totSkills += Object.values(
        mem.crimeSkill,
      ).reduce((t, n) => t + n);

      allianceStats.totCurrencies += Object.values(
        mem.currencies,
      ).reduce((t, n) => t + n);
      allianceStats.totWealth += calculateNetworth(mem, currencies);

      allianceStats.totBounty += mem.playerStats.bounty;

      allianceStats.totRank += mem.playerStats.rank;

      allianceStats.totShutdowns
      += mem.fightInformation.shutdowns;

      allianceStats.totAttacksInitiated
      += mem.fightInformation.attacksInitiated;

      allianceStats.totAttacksVictim
      += mem.fightInformation.attacksVictim;

      allianceStats.totCrimesInitiated
        += mem.fightInformation.crimesInitiated;

      allianceStats.totVpnChanges
        += mem.fightInformation.vpnChanges;

      allianceStats.totCurrencyPurchases
        += mem.fightInformation.currencyPurchases;
    });

    result.push(allianceStats);
  });
  console.log(result);
  return result;
};

module.exports = {
  checkCreateAllianceCriteria,
  findAllianceStats,
};
