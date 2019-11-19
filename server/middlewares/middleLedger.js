const { existingValue, checkFunds } = require("../middlewares/middleHelpers");

// Sees if everything is in order to transfer bitcoins
function tranfserCriteria(user, receiver, amount) {
  if (!existingValue(user)) {
    return "User doesn't exist";
  }
  if (!existingValue(receiver)) {
    return "Opponent doesn't exist";
  }
  if (!checkFunds(user.playerStats.ledger, amount)) {
    return "Insufficent bitcoins in your ledger";
  }
  return null;
}

module.exports = { tranfserCriteria };
