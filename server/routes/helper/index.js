const { nullifyValues } = require("../../middlewares/middleHelpers.js");
const User = require("../../models/User");

const getAllUsers = async (filter = null, onlyName = null) => {
  if (onlyName) {
    const onlyNameUsers = await User.find().select("name");
    return onlyNameUsers;
  }
  let users = await User.find()
    .populate("playerStats.bountyDonors", "name")
    .populate("alliance", "name")
    .populate("playerStats.city", "name");

  // todo, select information instead of nullify?
  // todo apply filter

  if (filter) {
    users = users.map(user => nullifyValues(user, filter));
  }
  return users;
};

module.exports = { getAllUsers };
