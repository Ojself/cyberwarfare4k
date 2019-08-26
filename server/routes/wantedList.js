router.get('/wantedList', async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    return res.status(400).json({
      success: false,
      message: 'no hackers found, try again later'
    });
  }

  const bountyUsers = users.filter(user => user.bounty > 0);

  res.status(200).json({
    success: true,
    message: 'wanted hackers loaded',
    bountyUsers
  });
});

/* adds bounty to opponent */
router.post('/wantedList', async (req, res, next) => {
  const { name, bounty } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  const opponent = await User.findOne({ name });

  let message = addBountyCriteria(user, opponent);

  function addBountyCriteria(user, opponent, bounty) {
    // check user
    // check opponent
    // check money
  }

  if (message) {
    return res.status(400).json({
      success: false,
      message
    });
  }

  user.drainMoney(bounty);
  opponent.addBounty(user, bounty);

  res.status(200).json({
    success: true,
    message: `${bounty} added to ${target}s bounty`
  });

  Promise.all([user, opponent]).then(result => {
    result[0].bitCoins -= parseInt(bounty);
    result[1].bounty += parseInt(bounty);
    if (!result[1].bountyDonors.includes(userId)) {
      result[1].bountyDonors.push(userId);
    }
    result[0].save();
    result[1].save();
  });
});
