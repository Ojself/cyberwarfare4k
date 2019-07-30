router.get('/wantedList', async (req, res, next) => {
  let users = await User.find({});

  if (!users) {
    res.status(400).json({
      success: false,
      message: 'no hackers found, try again later'
    });
    return null;
  }

  let bountyUsers = users.filter(user => user.bounty > 0);

  res.status(200).json({
    success: true,
    message: 'wanted hackers loaded',
    bountyUsers
  });
});

/* adds bounty to opponent */
router.post('/wantedList', async (req, res, next) => {
  let { name, bounty } = req.body;
  let userId = req.user._id;
  const user = await User.findById(userId);
  const opponent = await User.findOne({ name });
  Promise.all([user, opponent]).then(result => {
    if (!result[1]) {
      res.status(400).json({
        success: false,
        message: 'no hacker with that name'
      });
      return null;
    }
    if (result[0].bitCoins < bounty) {
      res.status(400).json({
        success: false,
        message: 'You dont have that many bitcoins!'
      });
      return null;
    }
    result[0].bitCoins -= parseInt(bounty);
    result[1].bounty += parseInt(bounty);
    if (!result[1].bountyDonors.includes(userId)) {
      result[1].bountyDonors.push(userId);
    }
    result[0].save();
    result[1].save();
    res.status(200).json({
      success: true,
      message: `${bounty} added to ${target}s bounty`
    });
  });
});
