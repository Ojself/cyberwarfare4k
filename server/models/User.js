/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const Alliance = require('./Alliance');
const City = require('./City');
const DataCenter = require('./DataCenter');

const { generateFuneral } = require('../logic/_helpers');

const ranks = [
  {
    expToNewRank: 10000,
    name: 'Script kiddie',
    rank: 0,
  },
  {
    expToNewRank: 25000,
    name: 'Family IT-Support',
    rank: 1,
  },
  {
    expToNewRank: 62500,
    name: 'Blog Writer',
    rank: 2,
  },
  {
    expToNewRank: 156000,
    name: "HTML 'programmer'",
    rank: 3,
  },
  {
    expToNewRank: 420000,
    name: 'Jr. Web Dev',
    rank: 4,
  },
  {
    expToNewRank: 1015000,
    name: 'Sr. Web Dev',
    rank: 5,
  },
  {
    expToNewRank: 2437500,
    name: 'System Dev',
    rank: 6,
  },
  {
    expToNewRank: 6093314,
    name: 'Cyber Security Dev',
    rank: 7,
  },
  {
    expToNewRank: 15231337,
    name: 'Basement Dweller',
    rank: 8,
  },
  {
    expToNewRank: 9999999999999.0,
    name: 'Anonymous',
    rank: 9,
  },
  {
    expToNewRank: Infinity,
    name: 'Cheater',
    rank: 10,
  },
];

const userSchema = new Schema(
  {
    account: {
      email: String,
      password: String,
      ip: [String],
      confirmationCode: { type: String, default: `${Math.random()}` },
      confirmed: { type: Boolean, default: false },
      isSetup: {
        type: Boolean,
        default: false,
      },
      avatar: {
        type: String,
        default: '',
      },
      subscription: {
        type: String,
        enum: ['', 'Bronze', 'Silver', 'Gold', 'Platinum'],
      },
      tokens: { type: Number, default: 0 },
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
    },
    alliance: {
      type: Schema.Types.ObjectId,
      ref: 'Alliance',
    },
    allianceRole: { type: String },

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

    playerStats: {
      city: { type: Schema.Types.ObjectId, ref: 'City' },
      repairCost: { type: Number, default: 100000 },
      bodyguards: {
        alive: { type: [Number], default: [] },
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
        default: 125,
      },
      bitCoins: {
        type: Number,
        default: 1000,
      },
      ledger: {
        type: Number,
        default: 1500,
      },
      vault: {
        type: Number,
        default: 0,
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
        default: '5fc13fcf7e196b5b2c875e4d',
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

    fightInformation: {
      gracePeriod: { type: Date, default: Date.now() },
      equippedWeapon: {
        type: String,
        enum: ['CPU', 'Encryption', 'AntiVirus'],
        default: 'CPU',
      },
      activeSpies: [{
        target: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        id: String,
        arrives: Date,
        timeLeft: Number,
        bitCoinSpent: Number,
      }],
      shutdowns: { type: Number, default: 0 },
      attacksInitiated: { type: Number, default: 0 },
      attacksVictim: { type: Number, default: 0 },
      crimesInitiated: { type: Number, default: 0 },
      orgCrimesInitiated: { type: Number, default: 0 },
      spiesSent: { type: Number, default: 0 },
      pettyCrimesInitiated: { type: Number, default: 0 },
      vpnChanges: { type: Number, default: 0 },
      currencyPurchases: { type: Number, default: 0 },
    },

    earnBattery: {
      githubUserName: { type: String, default: '' },
      githubStar: { type: Boolean, default: false },
      megarpg: { type: String },
      chessathor: { type: String },
      gracePeriod: { type: Date, default: Date.now() },
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

userSchema.methods.giveHackSkill = function (amount = 1, skill) {
  if (this.marketPlaceItems[skill] && this.hackSkill[skill] - this.marketPlaceItems[skill].bonus > 100) {
    return;
  }
  if (!this.marketPlaceItems[skill] && this.hackSkill[skill] >= 100) {
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
};

userSchema.methods.withdrawLedger = function (bitCoins) {
  this.bitCoinGain(bitCoins);
  this.ledgerDrain(bitCoins);
};

// VAULT
// VAULT

userSchema.methods.depositVault = function (bitCoins) {
  this.bitCoinDrain(bitCoins);
  this.vaultGain(bitCoins);
};

userSchema.methods.vaultGain = function (bitCoins) {
  this.playerStats.vault += parseInt(bitCoins, 10);
};

userSchema.methods.vaultDrain = function (bitCoins) {
  this.playerStats.vault -= parseInt(bitCoins, 10);
};

userSchema.methods.sendSpy = function (bitCoins, target, date) {
  this.vaultDrain(bitCoins);
  const randomNumber = `${Math.random()}`;
  const id = randomNumber.replace('0.', '');
  const spy = {
    target,
    id,
    arrives: date,
    bitCoinSpent: bitCoins,
  };
  const oldArray = this.fightInformation.activeSpies;
  oldArray.unshift(spy);
  this.fightInformation.activeSpies = oldArray;
  return id;
};

userSchema.methods.deleteSpy = function (id) {
  const spyToBeDeleted = this.fightInformation.activeSpies.find((spy) => spy.id === id.toString());
  const oldArray = this.fightInformation.activeSpies.filter((spy) => spy.id !== id.toString());

  this.fightInformation.activeSpies = oldArray;
  this.vaultGain(spyToBeDeleted.bitCoinSpent);
};

userSchema.methods.cleanSpies = function (now) {
  const oldArray = this.fightInformation.activeSpies.filter((spy) => spy.arrives.getTime() + (1000 * 120) > now);
  this.fightInformation.activeSpies = oldArray;
};

userSchema.methods.giveExp = function (exp) {
  this.playerStats.exp += parseInt(exp, 10);
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    this.levelUp();
  }
};

userSchema.methods.handlePettyCrime = function (result) {
  this.batteryDrain(result.battery);
  this.bitCoinGain(result.bitCoins);
  this.fightInformation.pettyCrimesInitiated += 1;
  this.giveExp(result.exp);

  if (result.stashGained) {
    const stashName = result.stashGained;
    this.stash[stashName] += 1;
  }
  if (result.skillGained) {
    const { skillGained } = result;
    if (['Encryption', 'CPU', 'AntiVirus'].includes(skillGained)) {
      this.giveHackSkill(1, skillGained);
    }
    if (['Technical', 'Social Engineering', 'Cryptography', 'Forensics'].includes(skillGained)) {
      this.giveCrimeSkill(1, skillGained);
    }
  }
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    this.levelUp();
  }
};

userSchema.methods.purchaseCurrency = function (
  currency,
  amount,
  totalPrice,
) {
  this.bitCoinDrain(totalPrice);
  this.fightInformation.currencyPurchases += 1;
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
  this.fightInformation.vpnChanges += 1;
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

userSchema.methods.handleCrime = function (result) {
  this.batteryDrain(result.playerGains.batteryCost);
  this.playerStats.bitCoins += result.playerGains.bitCoins;
  this.giveExp(result.playerGains.exp);
  this.fightInformation.crimesInitiated += 1;
  this.giveCrimeSkill(1, result.crimeType);

  if (result.playerGains.stashGained) {
    const stashName = result.playerGains.stashGained;
    this.stash[stashName] += 1;
  }

  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    this.levelUp();
  }
};

userSchema.methods.levelUp = function () {
  console.info(`${this.name} is leveling up from ${this.playerStats.rank}`);
  this.playerStats.rank += 1;
  const newRank = ranks[this.playerStats.rank];

  this.playerStats.statPoints += 5;
  this.playerStats.battery += (this.playerStats.rank * 10);
  this.playerStats.rankName = newRank.name;
  this.playerStats.expToLevel = newRank.expToNewRank;
};

userSchema.methods.handleFraud = function (result) {
  this.batteryDrain(result.playerGains.batteryCost);
  this.fightInformation.attacksInitiated += 1;
  this.bitCoinGain(result.playerGains.bitCoinStolen);
};

userSchema.methods.handleFraudDefense = function (result, gracePeriod) {
  this.setGracePeriod(gracePeriod);
  this.bitCoinDrain(result.playerGains.bitCoinStolen);
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
    this.fightInformation.shutdowns += 1;
  }
  this.fightInformation.attacksInitiated += 1;
  /* todo. add message string if opponent is dead */
};
userSchema.methods.handleAttackDefense = async function (result, gracePeriod) {
  this.setGracePeriod(gracePeriod);
  if (result.bodyguardAttacked) {
    this.playerStats.bodyguards.alive[0] = 50;
    this.markModified('playerStats.bodyguards.alive.0');
  }
  if (result.bodyguardKilled) {
    this.playerStats.bodyguards.alive.shift();
    this.markModified('playerStats.bodyguards.alive.0');
  }
  if (!result.bodyguardAttacked && !result.bodyguardKilled) {
    this.playerStats.currentFirewall -= parseInt(result.damageDealt, 10);
  }
  this.fightInformation.attacksVictim += 1;
  if (this.playerStats.currentFirewall <= 0) {
    try {
      await this.die();
    } catch (err) {
      console.error('Error die function: ', err, ' \n Name: ', this.name);
    }
  }
};

userSchema.methods.setGracePeriod = function (now = Date.now()) {
  this.fightInformation.gracePeriod = now;
};

userSchema.methods.repair = function (percentage, cost) {
  this.bitCoinDrain(cost);
  const multiplier = 1 + ((this.playerStats.maxFirewall - this.playerStats.currentFirewall) / this.playerStats.currentFirewall / 10);

  this.playerStats.currentFirewall += (percentage * this.playerStats.maxFirewall) / 100;

  if (this.playerStats.currentFirewall > this.playerStats.maxFirewall) {
    this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  }
  this.playerStats.repairCost = Math.round(this.playerStats.repairCost * multiplier);
};

userSchema.methods.buyBodyguard = function () {
  const cost = this.playerStats.bodyguards.price;
  this.bitCoinDrain(cost);
  this.playerStats.bodyguards.alive.push(100);
  this.playerStats.bodyguards.bought += 1;
  if (this.playerStats.bodyguards.bought > 3) {
    const newPriceInPercentage = (this.playerStats.rank + 1) / 20;
    this.playerStats.bodyguards.price *= (1 + newPriceInPercentage);
  }
};

userSchema.methods.handleOrgCrime = function (result, amountMembers) {
  if (!result.winPercentage) return;
  this.giveExp(Math.round(result.xp / amountMembers));
  this.stash[result.stash] += Math.round(result.stashAmount / amountMembers);
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

userSchema.methods.addBounty = function (bountyDonor, bounty) {
  // todo, change array to set to fix this issue?
  if (!this.playerStats.bountyDonors.some((el) => el.equals(bountyDonor._id))) {
    this.playerStats.bountyDonors.push(bountyDonor._id);
  }
  this.playerStats.bounty += parseInt(bounty, 10);
};

userSchema.methods.changeWeapon = function (weapon) {
  this.fightInformation.equippedWeapon = weapon;
};

userSchema.methods.handleNewStatpoint = function (statName) {
  /* console.info(`${this.name} is upgrading: ${statName}`) */
  this.playerStats.statPoints -= 1;
  switch (statName) {
    case 'Firewall':
      this.playerStats.maxFirewall += 10;
      this.playerStats.currentFirewall += 10;
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
      this.giveExp(this.playerStats.expToLevel * 0.075);
      break;
    default:
      // gives back statpoints if something went wrong
      this.playerStats.statPoints += 1;
  }
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    this.levelUp();
  }
};

// todo remove from city and alliance and datacenters
userSchema.methods.die = async function () {
  console.info(`${this.name} is dead`);
  const city = await City.findById(this.playerStats.city);
  city.departure(this._id);
  await city.save();

  const dataCenters = await DataCenter.find({ owner: this._id });
  if (dataCenters) {
    dataCenters.forEach((dataCenter) => dataCenter.handleDestroyed());
    try {
      await Promise.all(dataCenters.map((dataCenter) => dataCenter.save()));
    } catch (err) {
      console.error('Removing datacenters error :', err);
    }
  }
  if (this.alliance) {
    const alliance = await Alliance.findById(this.alliance);
    alliance.leaveAlliance(this._id);
    try {
      await alliance.save();
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  await generateFuneral(this.name, this.account.avatar, this._id, this.alliance);

  this.name = `UnconfirmedPlayer${Math.random()}`;
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
      alive: [],
      bought: 0,
      price: 100000,
    },
    statPoints: 5,
    maxFirewall: 100,
    currentFirewall: 0,
    battery: 100,
    bitCoins: 1000,
    ledger: 1500,
    vault: 0,
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
    equippedWeapon: 'CPU',
    activeSpies: [],
    shutdowns: 0,
    attacksInitiated: 0,
    attacksVictim: 0,
    crimesInitiated: 0,
    orgCrimesInitiated: 0,
    spiesSent: 0,
    pettyCrimesInitiated: 0,
    vpnChanges: 0,
    currencyPurchases: 0,
  };
};

const User = mongoose.model('User', userSchema);
module.exports = User;
