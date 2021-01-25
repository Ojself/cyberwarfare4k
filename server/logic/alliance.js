const { calculateNetworth } = require('./_helpers');
const Alliance = require('../models/Alliance');

const checkCreateAllianceCriteria = (user, alliance, createCost, city) => {
  if (!user || !alliance || !city) {
    return 'Something went wrong';
  }
  if (user.alliance || user.allianceRole) {
    return 'You are already in an alliance';
  }
  if (user.playerStats.rank < 4) {
    return 'You are too unexperienced to create your own alliance...';
  }
  const allianceMembers = alliance.members();
  if (allianceMembers.length) {
    return 'This alliance already have members';
  }
  if (city.allianceOwner) {
    return 'This city have already been claimed';
  }
  if (user.playerStats.bitCoins < createCost) {
    return 'Insufficent bitcoins...';
  }
  return null;
};

const findAllianceStats = async (alliances, cities, currencies) => {
  const result = [];
  alliances.forEach((alliance) => {
    const allianceStats = {
      name: alliance.name,
      members: alliance.members(true),
      _id: alliance._id,
      city: cities.find((city) => city.allianceOwner.toString() === alliance._id.toString()),
      totWealth: 0,
      totBounty: 0,
      totRank: 0,
      totShutdowns: 0,
    };
    const currentMembers = alliance.members();
    currentMembers.forEach((mem) => {
      allianceStats.totWealth += calculateNetworth(mem, currencies);
      allianceStats.totBounty += mem.playerStats.bounty;
      allianceStats.totRank += mem.playerStats.rank;
      allianceStats.totShutdowns += mem.fightInformation.shutdowns;
    });

    result.push(allianceStats);
  });
  console.log(result, 'result');
  return result;
};

const inviteSendCriteria = (user, alliance, invitedUser) => {
  if (!user || !alliance || !invitedUser) {
    return 'something went wrong...';
  }
  if (user.alliance.toString() !== alliance._id.toString()) {
    return "You can't send invites on behalf of other alliances....";
  }
  if (user.allianceRole !== 'boss') {
    return "You can't send invites...";
  }
  if (alliance.invitedMembers.includes(invitedUser._id)) {
    return 'This user is already invited...';
  }
  if (invitedUser.alliance) {
    return 'This user is already in an alliance...';
  }
  return null;
};

const answerCriterias = (user, alliance) => {
  if (!user || !alliance) {
    return 'something went wrong';
  }
  if (user.alliance || user.allianceRole) {
    return 'you are already in an alliance';
  }
  if (!alliance.invitedMembers.includes(user._id)) {
    return 'You are not invited to this alliance';
  }
  return null;
};

const promoteCriterias = (user, promotedUser, alliance) => {
  if (!user || !promotedUser || !alliance) {
    return 'Something went wrong...';
  }
  if (user.allianceRole !== 'boss') {
    return "You don't have permission to do this";
  }
  if (promotedUser.alliance.toString() !== alliance._id.toString()) {
    return "This user doesn't belong to the correct alliance";
  }
  if (user._id.toString() === promotedUser._id.toString()) {
    return "You can't promote yourself directly...";
  }
  return null;
};

const findAllianceByIdAndPopulate = async (id) => {
  const populateValues = ['name', 'account.avatar'];
  const alliance = await Alliance.findById(id)
    .populate('boss', populateValues)
    .populate('cto', populateValues)
    .populate('analyst', populateValues)
    .populate('firstLead', populateValues)
    .populate('secondLead', populateValues)
    .populate('firstMonkeys', populateValues)
    .populate('secondMonkeys', populateValues)
    .populate('invitedMembers', populateValues)
    .populate('organizePermission', populateValues)
    .populate('forumModeratorPermission', populateValues);
  return alliance;
};

module.exports = {
  checkCreateAllianceCriteria,
  findAllianceStats,
  inviteSendCriteria,
  answerCriterias,
  promoteCriterias,
  findAllianceByIdAndPopulate,
};
