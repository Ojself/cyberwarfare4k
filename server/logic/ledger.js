// Sees if everything is in order to transfer bitcoins
const tranfserCriteria = (user, receiver, amount) => {
  if (!user) {
    return "User doesn't exist";
  }
  if (!receiver) {
    return "Receiver doesn't exist";
  }
  if (user._id.toString() === receiver._id.toString()) {
    return "You can't transfer money to yourself";
  }
  if (amount > user.playerStats.ledger) {
    return 'Insufficent bitcoins in your ledger';
  }
  return null;
};

module.exports = { tranfserCriteria };
