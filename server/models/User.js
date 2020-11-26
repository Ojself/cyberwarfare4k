/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
/* const Item = require('./Item'); */
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
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        default: 'Bronze',
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
        expires: { type: Date },
      },
      chessathor: {
        code: { type: String, default: '' },
        expires: { type: Date },
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

// this probably doesn't work. test it
userSchema.methods.handleItemPurchase = function (item) {
  const currentItem = this.marketPlaceItems[item.type];
  if (currentItem) {
    // lower the stats so items doesn't stack
    switch (currentItem.type) {
      case 'CPU':
        this.hackSkill.CPU -= currentItem.bonus;
        break;
      case 'AntiVirus':
        this.hackSkill.AntiVirus -= currentItem.bonus;
        break;
      case 'Firewall':
        this.playerStats.maxFirewall -= currentItem.bonus;
        this.playerStats.currentFirewall -= currentItem.bonus;
        break;
      case 'Encryption':
        this.hackSkill.Encryption -= currentItem.bonus;
        break;
      default:
        break;
    }
  }

  // gives the user the item

  this.marketPlaceItems[item.type] = item;
  // adds the bonus to user
  switch (item.type) {
    case 'CPU':
      this.hackSkill.CPU += item.bonus;
      break;
    case 'AntiVirus':
      this.hackSkill.AntiVirus += item.bonus;
      break;
    case 'Firewall':
      this.playerStats.maxFirewall += item.bonus;
      this.playerStats.currentFirewall += item.bonus;
      break;
    case 'Encryption':
      this.hackSkill.Encryption += item.bonus;
      break;
    default:
      break;
  }
  return this.save();
};

userSchema.methods.giveLegendary = function (itemName = 'emp') {
  this[itemName] += 1;
  this.save();
};

userSchema.methods.giveCrimeSkill = function (amount = 1, skill = 'Technical') {
  if (!this.crimeSkill[skill]) {
    return;
  }
  this.crimeSkill[skill] += amount;
  if (this.crimeSkill[skill] < 200) {
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

userSchema.methods.bitcoinDrain = function (bitCoins) {
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
  this.bitcoinDrain(bitCoins);
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
  batteryCost,
  totalPrice,
) {
  this.playerStats.battery -= batteryCost;
  this.bitcoinDrain(totalPrice);
  this.currencies[currency.name] += amount;
  this.save();
};

userSchema.methods.sellCurrency = function (
  currency,
  amount,
  batteryCost,
  totalPrice,
) {
  this.battery -= batteryCost;
  this.currencies[currency.name] -= amount;
  this.bitCoinGain(totalPrice);
  this.save();
};

userSchema.methods.changeCity = function (city, batteryCost) {
  this.batteryDrain(batteryCost);
  this.playerStats.city = city._id;
};

userSchema.methods.leaveAlliance = function () {
  this.alliance = null;
  this.allianceRole = null;
};

userSchema.methods.createAlliance = function (cost, allianceId) {
  this.bitcoinDrain(cost);
  this.alliance = allianceId;
  this.allianceRole = 'boss';
};

userSchema.methods.handleCrime = async function (result) {
  this.batteryDrain(result.playerGains.batteryCost);
  this.playerStats.bitCoins += result.playerGains.bitCoins;
  this.playerStats.exp += result.playerGains.exp;
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

  this.playerStats.rankName = newRank.name;
  this.playerStats.expToLevel = newRank.expToNewRank;
};

userSchema.methods.handleAttack = function (result) {
  this.batteryDrain(result.playerGains.batteryCost);

  // steals all the currencies when opponent is dead
  if (result.victimDead) {
    Object.keys(result.playerGains.currencies).forEach((currency) => {
      this.currencies[currency] += parseInt(result.playerGains.currencies[currency], 10);
    });
    this.playerStats.shutdowns += 1;
  }
  this.playerStats.attacksInitiated += 1;

  const notificationMessage = `You attacked ${result.opponent.name} and ${result.bodyguardKilled ? 'killed a bodyguard!' : `dealt ${result.damageDealt} damage`}!`;
  /* todo. add message string if opponent is dead */

  this.sendNotification(notificationMessage, result.now);
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
  this.bitcoinDrain(cost);
  this.playerStats.currentFirewall += (percentage * this.playerStats.maxFirewall) / 100;

  if (this.playerStats.currentFirewall > this.playerStats.maxFirewall) {
    this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  }
  const multiplier = percentage === 100 ? 1.35 : 1.07;
  this.playerStats.repairCost = Math.round(this.playerStats.repairCost * multiplier);
};

userSchema.methods.buyBodyguard = function () {
  const cost = this.playerStats.bodyguards.price;
  this.bitcoinDrain(cost);
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
      this.hackSkill.CPU += 5;
      break;
    case 'AntiVirus':
      this.hackSkill.AntiVirus += 5;
      break;
    case 'Encryption':
      this.hackSkill.Encryption += 5;
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

// todo remove from city and alliance
/* userSchema.methods.die = function () {
  const currentCity = this.playerStats.city;
  const currentAlliance = this.alliance;
}; */

const User = mongoose.model('User', userSchema);
module.exports = User;
