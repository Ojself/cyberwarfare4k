const { nullifyValues } = require('../../middlewares/middleHelpers.js');
const User = require('../../models/User');
const Session = require('../../models/Session');
const Message = require('../../models/Message');

const monthsOverview = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dev',
];

const getAllUsers = async (filterArray = [], select = null) => {
  if (select) {
    // {name:'1'}
    const usersWithSelect = await User.find().select(select);
    return usersWithSelect;
  }
  let users = await User.find()
    .populate('playerStats.bountyDonors', 'name')
    .populate('alliance', 'name')
    .populate('playerStats.city', 'name');

  // todo, select information instead of nullify?
  // todo apply filter

  if (filterArray.length) {
    users = users.map((user) => nullifyValues(user, filterArray));
  }
  return users;
};

// gets all online users based on sesssion
const getOnlineUsers = async (userId) => {
  // Default expire for session
  const twoWeeks = 1000 * 60 * 60 * 24 * 7 * 2;
  // only those who have activity from last five minutes
  const fiveMin = 1000 * 60 * 5;
  // this exact date
  const now = Date.now();
  // above variables put together
  const limitTime = new Date(now + twoWeeks - fiveMin);
  let onlineIds;

  await Session.find().then((result) => {
    const filteredIds = result
      .filter((x) => x.expires > limitTime)
      .map((y) => y.session.match(/[a-f\d]{24}/g, ''))
      .filter((el) => el != null);
    onlineIds = [].concat(...filteredIds);
  });
  // const onlinePlayers = await User.find({ _id: { $in: onlineIds } });
  return userId ? onlineIds.includes(userId) : onlineIds;
};

const getInbox = async (userId) => {
  const inbox = await Message.find({ to: userId })
    .populate('from', 'name')
    .sort({ createdAt: -1 });
  const sent = await Message.find({ from: userId })
    .populate('to', 'name')
    .sort({ createdAt: -1 });
  return { inbox, sent };
};

const getOpponentInformation = async (opponentId, allUsers) => {
  const sumAllSkillValues = (skill) => Object.values(skill).reduce((a, c) => a + c);
  const findPosition = (list, id) => {
    const position = list.findIndex((user) => JSON.stringify(user._id) === id);

    return position + 1;
  };
  const opponent = allUsers.find(
    (user) => JSON.stringify(user._id) === opponentId,
  );

  const ranking = {
    exp: null,
    crimeSkill: null,
    hackSkill: null,
    networth: null,
    online: null,
    createdAt: null,
    shutdowns: null,
  };
  ranking.exp = findPosition(allUsers, opponentId);
  allUsers.sort(
    (a, b) => sumAllSkillValues(b.crimeSkill) - sumAllSkillValues(a.crimeSkill),
  );
  ranking.crimeSkill = findPosition(allUsers, opponentId);
  allUsers.sort(
    (a, b) => sumAllSkillValues(b.hackSkill) - sumAllSkillValues(a.hackSkill),
  );
  ranking.hackSkill = findPosition(allUsers, opponentId);
  allUsers.sort(
    (a, b) => sumAllSkillValues({
      bitCoins: b.playerStats.bitCoins,
      ledger: b.playerStats.bitCoins,
    })
      - sumAllSkillValues({
        bitCoins: a.playerStats.bitCoins,
        ledger: a.playerStats.bitCoins,
      }),
  );
  ranking.networth = findPosition(allUsers, opponentId);
  const onlineUsers = await getOnlineUsers();
  ranking.online = onlineUsers.some((id) => JSON.stringify(id) === opponentId);
  allUsers.sort(
    (a, b) => b.fightInformation.shutdowns - a.fightInformation.shutdowns,
  );
  ranking.shutdowns = findPosition(allUsers, opponentId);

  ranking.createdAt = `${
    monthsOverview[opponent.createdAt.getMonth()]
  } ${opponent.createdAt.getFullYear()}`;
  console.log(ranking, 'ranking');
  return { opponent, ranking };
};

const saveAndUpdateUser = async (user) => {
  const savedUser = await user.save();
  const populatedUser = await savedUser
    .populate('playerStats.city', 'name')
    .populate('alliance', 'name')
    .execPopulate();
  return populatedUser;
};

module.exports = {
  getAllUsers,
  getOnlineUsers,
  getInbox,
  getOpponentInformation,
  saveAndUpdateUser,
};
