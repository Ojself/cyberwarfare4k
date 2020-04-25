const { nullifyValues } = require("../../middlewares/middleHelpers.js");
const User = require("../../models/User");
const Session = require("../../models/Session");
const Message = require("../../models/Message");

const getAllUsers = async (filterArray = [], select = null) => {
  if (select) {
    // {name:'1'}
    const usersWithSelect = await User.find().select(select);
    return usersWithSelect;
  }
  let users = await User.find()
    .populate("playerStats.bountyDonors", "name")
    .populate("alliance", "name")
    .populate("playerStats.city", "name");

  // todo, select information instead of nullify?
  // todo apply filter

  if (filterArray.length) {
    users = users.map((user) => nullifyValues(user, filterArray));
  }
  return users;
};

// gets all online users based on sesssion
const getOnlineUsers = async () => {
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
      .map((y) => y.session.match(/[a-f\d]{24}/g, ""))
      .filter((el) => el != null);
    onlineIds = [].concat(...filteredIds);
  });
  console.log("onlineIds: ", onlineIds, "stop");
  // const onlinePlayers = await User.find({ _id: { $in: onlineIds } });

  return onlineIds;
};

const getInbox = async (userId) => {
  return await Message.find({ to: userId })
    .populate("from", "name")
    .sort({ createdAt: -1 });
};

module.exports = { getAllUsers, getOnlineUsers, getInbox };
