/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const Alliance = require('./Alliance');
const City = require('./City');
const DataCenter = require('./DataCenter');
const Rank = require('./Rank');

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    account: {
      password: String,
      ip: [String],
      status: {
        type: String,
        enum: ['Pending Confirmation', 'Active'],
        default: 'Pending Confirmation',
      },
      avatar: {
        type: String,
        default: '',
      },
      confirmationCode: String,
      subscription: {
        type: String,
        enum: ['', 'Bronze', 'Silver', 'Gold'],
      },
      isSetup: {
        type: Boolean,
        default: false,
      },
      notifications: {
        type: Array,
        dateSent: String,
        read: Boolean,
        message: String,
      },
      banned: {
        type: Boolean,
        default: false,
      },
      bannedReason: {
        type: String,
        default: '',
      },
    },
    name: {
      type: String,
      default: '',
      unique: true,
    },
    alliance: {
      type: Schema.Types.ObjectId,
      ref: 'Alliance',
    },
    allianceRole: {
      type: String,
      // enum: ['boss', 'cto', 'analyst', 'firstLead', 'secondLead', 'firstMonkeys', 'secondMonkeys'],
    },

    hackSkill: {
      CPU: {
        type: Number,
        default: 1,
      },
      AntiVirus: {
        type: Number,
        default: 2,
      },
      Encryption: {
        type: Number,
        default: 1,
      },
    },
    crimeSkill: {
      Technical: {
        type: Number,
        default: 2,
      },
      'Social Engineering': {
        type: Number,
        default: 1,
      },
      Forensics: {
        type: Number,
        default: 1,
      },
      Cryptography: {
        type: Number,
        default: 1,
      },
    },
    // currencies
    currencies: {
      Litecoin: { type: Number, default: 0 },
      Ethereum: { type: Number, default: 0 },
      Ripple: { type: Number, default: 0 },
      Monero: { type: Number, default: 0 },
      Zcash: { type: Number, default: 0 },
      Dash: { type: Number, default: 0 },
    },

    // Player stats
    playerStats: {
      city: { type: Schema.Types.ObjectId, ref: 'City' },
      repairCost: { type: Number, default: 50000 },
      bodyguards: {
        alive: { type: Number, default: 0 },
        bought: { type: Number, default: 0 },
        price: { type: Number, default: 100000 },
      },
      statPoints: {
        type: Number,
        default: 5,
      },
      maxFirewall: {
        type: Number,
        default: 100,
      },
      currentFirewall: {
        type: Number,
        default: 100,
      },
      battery: {
        type: Number,
        default: 100,
      },

      bitCoins: {
        type: Number,
        default: 1000,
      },
      ledger: {
        type: Number,
        default: 1500,
      },
      bounty: {
        type: Number,
        default: 0,
      },
      bountyDonors: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
      },
      rank: {
        type: Number,
        default: 0,
      },
      rankName: {
        type: String,
        default: 'Script kiddie',
      },
      exp: {
        type: Number,
        default: 1,
      },
      expToLevel: {
        type: Number,
        default: 10000,
      },
    },

    marketPlaceItems: {
      CPU: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null,
      },
      Firewall: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null,
      },
      AntiVirus: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null,
      },
      Encryption: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null,
      },
    },
    /* Special weapons */
    specialWeapons: {
      equipped: {
        type: String,
        default: '',
      },
      emp: {
        type: Number,
        default: 0,
      },

      geostorm: {
        type: Number,
        default: 0,
      },

      medusa: {
        type: Number,
        default: 0,
      },
    },

    stash: {
      Cables: { type: Number, default: 5 },
      'Linux for dummies': { type: Number, default: 1 },
      'Lock pick set': { type: Number, default: 1 },
      'Proxmark3 Kit': { type: Number, default: 0 },
      'Rubber Ducky': { type: Number, default: 0 },
      Keylogger: { type: Number, default: 0 },
      'EyeSpy Digital Spy Recorder': { type: Number, default: 0 },
      'WiFi Pineapple': { type: Number, default: 0 },
      'HackRf One': { type: Number, default: 0 },
      Computer: { type: Number, default: 0 },
      'Ubertooth One': { type: Number, default: 0 },
      Magspoof: { type: Number, default: 0 },
      'Raspberry Pi': { type: Number, default: 0 },
      'Mini Hidden Camera': { type: Number, default: 0 },
    },

    // Figth accessories
    fightInformation: {
      gracePeriod: { type: Date, default: Date.now() },
      shutdowns: { type: Number, default: 0 },
      attacksInitiated: { type: Number, default: 0 },
      attacksVictim: { type: Number, default: 0 },
      crimesInitiated: { type: Number, default: 0 },
      vpnChanges: { type: Number, default: 0 },
      currencyPurchases: { type: Number, default: 0 },
    },

    earnBattery: {
      githubUserName: { type: String, default: '' },
      githubStar: { type: Boolean, default: false },
      megarpg: {
        code: { type: String, default: '' },
        expires: { type: Date, default: Date.now() },
      },
      chessathor: {
        code: { type: String, default: '' },
        expires: { type: Date, default: Date.now() },
      },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

userSchema.methods.handleItemPurchase = function (item) {
  const currentItem = this.marketPlaceItems[item.type];
  // lower the stats so items doesn't stack
  if (currentItem) {
    if (['CPU', 'AntiVirus', 'Encryption'].includes(currentItem.type)) {
      this.giveHackSkill(-currentItem.bonus, item.type);
    }
    if (currentItem.type === 'Firewall') {
      this.playerStats.maxFirewall -= currentItem.bonus;
      this.playerStats.currentFirewall -= currentItem.bonus;
    }
  }

  // gives the user the item
  this.marketPlaceItems[item.type] = item;

  if (['CPU', 'AntiVirus', 'Encryption'].includes(item.type)) {
    this.giveHackSkill(item.bonus, item.type);
  }
  if (item.type === 'Firewall') {
    this.playerStats.maxFirewall += item.bonus;
    this.playerStats.currentFirewall += item.bonus;
  }
  this.bitCoinDrain(item.price);
};

userSchema.methods.giveHackSkill = function (amount = 1, skill = 'Encryption') {
  if (!this.hackSkill[skill]) {
    return;
  }
  if (this.marketPlaceItems[skill] && this.hackSkill[skill] - this.marketPlaceItems[skill].bonus > 100) {
    return;
  }
  this.hackSkill[skill] += amount;
};

userSchema.methods.giveCrimeSkill = function (amount = 1, skill = 'Technical') {
  if (!this.crimeSkill[skill]) {
    return;
  }
  this.crimeSkill[skill] += amount;
  if (this.crimeSkill[skill] > 200) {
    this.crimeSkill[skill] = 200;
  }
};

userSchema.methods.batteryDrain = function (battery) {
  this.playerStats.battery -= parseInt(battery, 10);
  if (this.playerStats.battery < 0) {
    this.playerStats.battery = 0;
  }
};

userSchema.methods.batteryGain = function (battery) {
  this.playerStats.battery += parseInt(battery, 10);
  if (this.playerStats.battery > 100) {
    this.playerStats.battery = 100;
  }
};

userSchema.methods.bitCoinDrain = function (bitCoins) {
  this.playerStats.bitCoins -= parseInt(bitCoins, 10);
  if (this.playerStats.bitCoins < 0) {
    this.playerStats.bitCoins = 0;
  }
};

userSchema.methods.bitCoinGain = function (bitCoins) {
  this.playerStats.bitCoins += parseInt(bitCoins, 10);
};

// LEDGER
// LEDGER

userSchema.methods.ledgerDrain = function (bitCoins) {
  this.playerStats.ledger -= parseInt(bitCoins, 10);
};

userSchema.methods.ledgerGain = function (bitCoins) {
  this.playerStats.ledger += parseInt(bitCoins, 10);
};

userSchema.methods.depositLedger = function (bitCoins) {
  this.bitCoinDrain(bitCoins);
  this.ledgerGain(bitCoins);
  // this.playerStats.bitCoins -= bitCoins * fee;
};

userSchema.methods.withdrawLedger = function (bitCoins) {
  this.bitCoinGain(bitCoins);
  this.ledgerDrain(bitCoins);
  // todo fee?
};

userSchema.methods.handlePettyCrime = async function (result) {
  this.batteryDrain(result.battery);
  this.bitCoinGain(result.bitCoins);
  this.playerStats.exp += result.exp;

  if (result.stashGained) {
    const stashName = result.stashGained;
    this.stash[stashName] += 1;
  }
  if (result.crimeSkillGained) {
    this.giveCrimeSkill(1, result.crimeSkillGained);
  }
  if (result.legendaryGained) {
    this[result.legendaryGained] += 1;
  }
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    await this.setRank();
  }
};

userSchema.methods.purchaseCurrency = function (
  currency,
  amount,
  totalPrice,
) {
  this.bitCoinDrain(totalPrice);
  this.currencies[currency.name] += parseInt(amount, 10);
};

userSchema.methods.sellCurrency = function (
  currency,
  amount,
  totalPrice,
) {
  this.currencies[currency.name] -= amount;
  this.bitCoinGain(totalPrice);
};

userSchema.methods.changeCity = function (city, batteryCost) {
  this.batteryDrain(batteryCost);
  this.bitCoinDrain(city.price);
  this.playerStats.city = city._id;
};

userSchema.methods.leaveAlliance = function () {
  this.alliance = null;
  this.allianceRole = null;
};

userSchema.methods.createAlliance = function (cost, allianceId) {
  this.bitCoinDrain(cost);
  this.alliance = allianceId;
  this.allianceRole = 'boss';
};

userSchema.methods.handleCrime = async function (result) {
  this.batteryDrain(result.playerGains.batteryCost);
  this.playerStats.bitCoins += result.playerGains.bitCoins;
  this.playerStats.exp += result.playerGains.exp;
  this.fightInformation.crimesInitiated += 1;
  this.giveCrimeSkill(1, result.crimeType);

  if (result.playerGains.stashGained) {
    const stashName = result.playerGains.stashGained;
    this.stash[stashName] += 1;
  }

  if (result.playerGains.legendaryGained) {
    this.legendaryGained[result.playerGains.legendaryGained] += 1;
  }
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    await this.setRank();
  }
};

userSchema.methods.setRank = async function (rank = undefined) {
  if (rank) {
    this.playerStats.rank = rank;
  } else {
    this.playerStats.rank += 1;
    this.playerStats.statPoints += 5;
  }
  const newRank = await Rank.findOne({ rank: this.playerStats.rank });
  this.playerStats.battery = 100;
  this.playerStats.rankName = newRank.name;
  this.playerStats.expToLevel = newRank.expToNewRank;
};

userSchema.methods.handleFraud = function (result) {
  this.batteryDrain(result.playerGains.batteryCost);
  this.playerStats.attacksInitiated += 1;
  this.bitCoinGain(result.playerGains.bitCoinStolen);
};

userSchema.methods.handleFraudDefense = function (result, gracePeriod) {
  this.setGracePeriod(gracePeriod);
  this.bitCoinDrain(result.playerGains.bitCoinStolen);
  const notificationMessage = `${result.user.name} stole ${result.playerGains.bitCoinStolen} from you!`;
  this.sendNotification(notificationMessage, result.now);
};

userSchema.methods.handleAttack = function (result) {
  this.batteryDrain(result.playerGains.batteryCost);
  // steals all the currencies when opponent is dead
  if (result.victimDead) {
    Object.keys(result.opponent.currencies).forEach((currency) => {
      if (!currency.startsWith('$')) {
        this.currencies[currency] += parseInt(result.opponent.currencies[currency], 10);
      }
    });
    this.playerStats.shutdowns += 1;
  }
  this.playerStats.attacksInitiated += 1;
  /* todo. add message string if opponent is dead */
};
userSchema.methods.handleAttackDefense = function (result, gracePeriod) {
  const notificationMessage = `${result.user.name} attacked you and ${result.bodyguardKilled ? 'killed a bodyguard!' : `dealt ${result.damageDealt} damage`}!`;
  this.sendNotification(notificationMessage, result.now);
  this.setGracePeriod(gracePeriod);
  if (result.bodyguardKilled) {
    this.playerStats.bodyguards.alive -= 1;
  } else {
    this.playerStats.currentFirewall -= parseInt(result.damageDealt, 10);
  }
  if (this.playerStats.currentFirewall <= 0) {
    this.die();
  }
};

userSchema.methods.setGracePeriod = function (now = Date.now()) {
  this.fightInformation.gracePeriod = now;
};

userSchema.methods.readNotifications = function () {
  const notificationLength = this.account.notifications.length;
  for (let i = 0; i < notificationLength; i += 1) {
    if (!this.account.notifications[i].read) {
      this.account.notifications[i].read = true;
      this.markModified(`account.notifications.${i}.read`);
    }
  }
};

userSchema.methods.repair = function (percentage, cost) {
  this.bitCoinDrain(cost);
  this.playerStats.currentFirewall += (percentage * this.playerStats.maxFirewall) / 100;

  if (this.playerStats.currentFirewall > this.playerStats.maxFirewall) {
    this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  }
  const multiplier = percentage === 100 ? 1.35 : 1.07;
  this.playerStats.repairCost = Math.round(this.playerStats.repairCost * multiplier);
};

userSchema.methods.buyBodyguard = function () {
  const cost = this.playerStats.bodyguards.price;
  this.bitCoinDrain(cost);
  this.playerStats.bodyguards.alive += 1;
  this.playerStats.bodyguards.bought += 1;
  if (this.playerStats.bodyguards.bought > 5) {
    this.playerStats.bodyguards.price *= 1.5;
  }
};

userSchema.methods.handleDataCenterAttack = function (dataCenter, result) {
  this.batteryDrain(result.batteryCost);
  dataCenter.requiredStash.forEach((stash) => {
    this.stash[stash] -= 1;
  });
};

userSchema.methods.handleBuyStash = function (stashToBuy, totalSum) {
  this.bitCoinDrain(totalSum);
  Object.keys(stashToBuy).forEach((stash) => {
    this.stash[stash] += stashToBuy[stash];
  });
};

userSchema.methods.handleSellStash = function (stashToSell, totalSum) {
  this.bitCoinGain(totalSum);
  Object.keys(stashToSell).forEach((stash) => {
    this.stash[stash] -= stashToSell[stash];
  });
};

userSchema.methods.sendNotification = function (message, now = Date.now(), read = false) {
  this.account.notifications.push({
    dateSent: new Date(now).toString().slice(0, 21),
    message,
    read, // set to true to give passive notification
  });
};

userSchema.methods.addBounty = function (bountyDonor, bounty) {
  // todo, change array to set to fix this issue?
  if (!this.playerStats.bountyDonors.some((el) => el.equals(bountyDonor._id))) {
    this.playerStats.bountyDonors.push(bountyDonor._id);
  }
  this.playerStats.bounty += parseInt(bounty, 10);
};

userSchema.methods.handleNewStatpoint = async function (statName) {
  this.playerStats.statPoints -= 1;
  switch (statName) {
    case 'Firewall':
      this.playerStats.maxFirewall += 15;
      this.playerStats.currentFirewall += 15;
      break;
    case 'CPU':
      this.giveHackSkill(5, 'CPU');
      break;
    case 'AntiVirus':
      this.giveHackSkill(5, 'AntiVirus');
      break;
    case 'Encryption':
      this.giveHackSkill(5, 'Encryption');
      break;
    case 'Technical':
      this.giveCrimeSkill(5, 'Technical');
      break;
    case 'Forensics':
      this.giveCrimeSkill(5, 'Forensics');
      break;
    case 'Social Engineering':
      this.giveCrimeSkill(5, 'Social Engineering');
      break;
    case 'Cryptography':
      this.giveCrimeSkill(5, 'Cryptography');
      break;
    case 'exp':
      this.playerStats.exp += this.playerStats.expToLevel * 0.08;
      break;
    default:
      // gives back statpoints if something went wrong
      this.playerStats.statPoints += 1;
  }
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    await this.setRank();
  }
};

// todo remove from city and alliance and datacenters
userSchema.methods.die = async function () {
  const city = await City.findById(this.playerStats.city);
  await city.departure(this._id);

  const dataCenters = await DataCenter.find({ owner: this._id });
  if (dataCenters) {
    dataCenters.forEach((dataCenter) => dataCenter.handleDestroyed());
    await Promise.all(dataCenters.map((dataCenter) => dataCenter.save()));
  }
  if (this.alliance) {
    const alliance = await Alliance.findById(this.alliance);
    alliance.leaveAlliance(this._id);
  }
  this.name = '';
  this.account.isSetup = false;
  this.alliance = null;
  this.allianceRole = null;

  this.hackSkill = {
    CPU: 0,
    AntiVirus: 0,
    Encryption: 0,
  };

  this.crimeSkill = {
    Technical: 2,
    'Social Engineering': 1,
    Forensics: 1,
    Cryptography: 1,
  };

  this.currencies = {
    Litecoin: 0,
    Ethereum: 0,
    Ripple: 0,
    Monero: 0,
    Zcash: 0,
    Dash: 0,
  };

  this.playerStats = {
    city: null,
    repairCost: 50000,
    bodyguards: {
      alive: 0,
      bought: 0,
      price: 100000,
    },
    statPoints: 5,
    maxFirewall: 100,
    currentFirewall: 0,
    battery: 100,
    bitCoins: 1000,
    ledger: 1500,
    bounty: 0,
    bountyDonors: [],
    rank: 0,
    rankName: 'Script kiddie',
    exp: 1,
    expToLevel: 10000,
  };

  this.marketPlaceItems = {
    CPU: null,
    Firewall: null,
    AntiVirus: null,
    Encryption: null,
  };

  this.stash = {
    Cables: 5,
    'Linux for dummies': 1,
    'Lock pick set': 1,
    'Proxmark3 Kit': 0,
    'Rubber Ducky': 0,
    Keylogger: 0,
    'EyeSpy Digital Spy Recorder': 0,
    'WiFi Pineapple': 0,
    'HackRf One': 0,
    Computer: 0,
    'Ubertooth One': 0,
    Magspoof: 0,
    'Raspberry Pi': 0,
    'Mini Hidden Camera': 0,
  };

  this.fightInformation = {
    gracePeriod: Date.now(),
    shutdowns: 0,
    attacksInitiated: 0,
    attacksVictim: 0,
    crimesInitiated: 0,
    vpnChanges: 0,
    currencyPurchases: 0,
  };
};

const User = mongoose.model('User', userSchema);
module.exports = User;
