const Session = require('../models/Session');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const Currency = require('../models/Currency');

const monthsOverview = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dev',
];
// Sorted afer price
const stash = [
  'Cables',
  'Linux for dummies',
  'Lock pick set',
  'Ubertooth One',
  'Raspberry Pi',
  'Keylogger',
  'Mini Hidden Camera',
  'EyeSpy Digital Spy Recorder',
  'Magspoof',
  'Rubber Ducky',
  'Proxmark3 Kit',
  'WiFi Pineapple',
  'HackRf One',
  'Computer',
];

const crimeSkills = [
  'Technical',
  'Social Engineering',
  'Forensics',
  'Cryptography',
];

const hackSkills = ['CPU', 'Encryption', 'AntiVirus'];

/**
 * Returns an integer or float between two numbers
 * @param {Number} min - Minimum number
 * @param {Number} max - Maximum maximum
 */
const randomNumberMinMax = (min, max) => Math.random() * (max - min) + min;

const crimeSkillDropChance = (user) => {
  const givenCrimeSkill = crimeSkills[Math.floor(Math.random() * crimeSkills.length)];
  return user.crimeSkill[givenCrimeSkill] >= 100 ? null : givenCrimeSkill;
};

const skillDropChance = (user) => (Math.random() > 0.5 ? crimeSkillDropChance(user) : hackSkillDropChance(user));

const stashDropChance = (multiplier = 1) => {
  let givenStash;

  const decider = Math.round(Math.random() * 1000) + multiplier;

  if (decider > 750) {
    /* Give ultra  item */
    givenStash = stash[randomNumberMinMax(stash.length - 3, stash.length)];
  } else if (decider > 450) {
    /* Give rare item */
    givenStash = stash[randomNumberMinMax(stash.length / 2, stash.length)];
  } else {
    /* give common item */
    givenStash = stash[randomNumberMinMax(0, stash.length)];
  }
  return givenStash;
};

const hackSkillDropChance = (user) => {
  const givenHackSkill = hackSkills[Math.floor(Math.random() * hackSkills.length)];
  return user.hackSkill[givenHackSkill] >= 100 ? null : givenHackSkill;
};

const batteryCheck = (user, x) => user.playerStats.battery >= x;

const existingValue = (value) => !!value;

const checkFunds = (x, y) => x >= y;

// checks for number of occurance is over
const checkOccuranceLimit = (array, value, x) => {
  const result = array.filter((el) => el === value);
  return result.length >= x;
};

// Removes blanks from an object
const removeBlankValuesFromObject = (obj) => {
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || isNaN(obj[propName])) {
      delete obj[propName];
    }
  }
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

  await Session.find({ session: /user/ }).then((result) => {
    const filteredIds = result
      .filter((x) => x.expires > limitTime)
      .map((y) => y.session.match(/[a-f\d]{24}/g, ''))
      .filter((el) => el != null);
    onlineIds = [].concat(...filteredIds);
  });
  // const onlinePlayers = await User.find({ _id: { $in: onlineIds } });
  return userId ? onlineIds.includes(userId) : onlineIds;
};

/**
 * Returns all messages {inbox, sent} for certain user
 * @param {ObjectId} to - userId to who sent the message
 */

const getInbox = async (userId) => {
  const messages = await Message.find({ $or: [{ from: userId }, { to: userId }] })
    .populate('from to', 'name')
    .sort({ createdAt: -1 });
  const inbox = messages.filter((m) => JSON.stringify(m.to) === JSON.stringify(userId));
  const sent = messages.filter((m) => JSON.stringify(m.from) === JSON.stringify(userId));

  return { inbox, sent };
};

/**
 * Returns all notifications for certain user
 * @param {ObjectId} to - userId to who sent the message
 */

const getNotifications = async (userId) => {
  const notifications = await Notification.find({ to: userId }).sort({ createdAt: -1 });
  return notifications;
};

/**
 * Creates a new message
 * @param {ObjectId} to - userId to who sent the message
 * @param {ObjectId} to - userId to reciever of message
 * @param {String} text - Text to be sent
 * @param {ObjectId} allianceId - allianceId if it's an alliance invitation. Default is null
 * @param {Boolean} read - Will show as message if true. Default is false
 */

const generateMessage = (from, to, text, allianceId = null, read = false) => {
  const now = new Date(Date.now());
  let formatted = now.toString().slice(4, 21);
  formatted = formatted.replace(now.getFullYear(), '-');
  const newMessage = new Message({
    from,
    to,
    dateSent: formatted,
    text,
    read,
    allianceInvitation: allianceId,
  });
  return newMessage.save();
};

/**
 * Creates a new Notification
 * @param {ObjectId} to - userId to reciever of notification
 * @param {String} text - Text to be sent
 * @param {String} genre - Enum: ['General', 'Organized Crime', 'Spy Report', 'Logs'] - default 'General'
 * @param {Boolean} read - Will show as notification if true
 */

const generateNotification = (to, text, genre = 'General', read = false) => {
  if (!to || !text) return;
  const now = new Date(Date.now());
  let formatted = now.toString().slice(4, 24);
  formatted = formatted.replace(now.getFullYear(), '-');
  const formattedText = Array.isArray(text) ? text : [text];
  const newNotification = new Notification({
    to,
    dateSent: formatted,
    text: formattedText,
    genre,
    read,
  });
  return newNotification.save();
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
  const currencies = await Currency.find();
  allUsers.map((user) => {
    user.playerStats.bitCoins = calculateNetworth(user, currencies);
    user.playerStats.ledger = null;
    return user;
  });

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
  allUsers.sort((b, a) => a.playerStats.bitCoins - b.playerStats.ledger);
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
  return { opponent, ranking };
};

const saveAndUpdateUser = async (user) => {
  const savedUser = await user.save();
  const populatedUser = await savedUser
    .populate('playerStats.city', ['name', 'stashPriceMultiplier'])
    .populate('alliance', 'name')
    .populate('marketPlaceItems.CPU')
    .populate('marketPlaceItems.Firewall')
    .populate('marketPlaceItems.AntiVirus')
    .populate('marketPlaceItems.Encryption')
    .execPopulate();
  return populatedUser;
};

// Calculates networth (ledger, bitcoins, cryptocurrencies)
const calculateNetworth = (user, dbCurrencies) => {
  let networth = user.playerStats.bitCoins + user.playerStats.ledger;
  dbCurrencies.forEach((currency) => {
    networth += user.currencies[currency.name] * currency.price;
  });
  return networth;
};

module.exports = {
  stash,
  calculateNetworth,
  getOnlineUsers,
  getInbox,
  getOpponentInformation,
  saveAndUpdateUser,
  generateMessage,
  generateNotification,
  checkFunds,
  stashDropChance,
  skillDropChance,
  batteryCheck,
  existingValue,
  checkOccuranceLimit,
  removeBlankValuesFromObject,
  randomNumberMinMax,
  getNotifications,
};
