const mongoose = require('mongoose');

const { Schema } = mongoose;
const Stash = require('../models/Stash');
const Rank = require('../models/Rank');

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
      role: {
        type: String,
        enum: ['user', 'npc', 'testUser', 'admin'],
        default: 'user',
      },

      notifications: {
        type: Array,
        default: [['Hey man, welcome to CH4K', false]],
      },
      messages: {
        type: Array,
        default: [
          [
            `System ${new Date(
              Date.now(),
            )}:, Hi and welcome to CH4K, this is your first message`,
            false,
          ],
        ],
      },
      sentMessages: {
        type: Array,
        default: [
          [
            `System ${new Date(
              Date.now(),
            )}:, Hi and welcome to CH4K, this is your first SENT message`,
          ],
        ],
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
      enum: [
        'Boss',
        'CTO',
        'Analyst',
        'Lead0',
        'Lead1',
        'Code Monkey0',
        'Code Monkey1',
        '',
      ],
      default: '',
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
      networth: {
        type: Number,
        default: 0,
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
      gracePeriod: {
        type: Boolean,
        default: false,
      },
      shutdowns: {
        type: Number,
        default: 0,
      },
      attacksInitiated: {
        type: Number,
        default: 0,
      },
      attacksVictim: {
        type: Number,
        default: 0,
      },
      crimesInitiated: {
        type: Number,
        default: 0,
      },
      vpnChanges: {
        type: Number,
        default: 0,
      },
      currencyPurchases: {
        type: Number,
        default: 0,
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

// from marketplace
// this probably doesn't work. test it
userSchema.methods.handleItemPurchase = function (item) {
  console.log('handleItemPurchase triggered', item);
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

userSchema.methods.newRank = async function () {
  console.log('new rank method triggered');
  this.playerStats.statPoints += 5;
  this.playerStats.rank += 1;
  await Rank.findOne({ rank: this.playerStats.rank }).then((newRank) => {
    this.playerStats.rankName = newRank.name;
    this.playerStats.expToLevel = newRank.expToNewRank;
  });
  this.save();
};

userSchema.methods.giveStash = function (stashName = 'Cables') {
  console.log('give stash method triggered', stashName);
  Stash.findOne({ name: stashName }).then((newStash) => {
    this.stash.push(newStash._id);
  });
  this.save();
};

userSchema.methods.giveExp = function (exp = 1) {
  console.log('give exp method triggered', exp);
  this.playerStats.exp += exp;
  this.save();
};

userSchema.methods.giveLegendary = function (itemName = 'emp') {
  console.log('give legendary method triggered', itemName);
  this[itemName] += 1;
  this.save();
};

userSchema.methods.giveSkill = function (skill = 'technical') {
  console.log('give crimeskill triggered', skill);
  console.log(this.crimeSkill, 'this.crimeSkill');
  this.crimeSkill[skill] += 1;
  this.save();
};

userSchema.methods.batteryDrain = function (battery) {
  console.log('batterydrain triggered', battery);
  this.playerStats.battery -= battery;
  this.save();
};

userSchema.methods.batteryGain = function (battery) {
  console.log('batteryGain triggered', battery);
  this.playerStats.battery += battery;
  if (this.playerStats.battery > 100) {
    this.playerStats.battery = 100;
  }
  this.save();
};

userSchema.methods.bitcoinDrain = function (bitCoins) {
  this.playerStats.bitCoins -= bitCoins;
  this.save();
};

userSchema.methods.bitcoinGain = function (bitCoins) {
  this.playerStats.bitCoins += bitCoins;
  this.save();
};

// LEDGER
// LEDGER

userSchema.methods.ledgerDrainFromTransfer = function (bitCoins) {
  console.log('ledgerDrain triggered', bitCoins);
  this.playerStats.ledger -= bitCoins;
  this.save();
};

userSchema.methods.ledgerGainFromTransfer = function (bitCoins, senderName) {
  console.log('ledgerGain triggered', bitCoins);
  this.playerStats.ledger += bitCoins;

  const date = Date.now();
  const newNotifications = [
    `You received ${bitCoins} from ${senderName} at ${new Date(
      date,
    ).toString()}`,
    true,
  ];
  this.account.notifications.push(newNotifications);
  this.save();
};

userSchema.methods.depositLedger = function (bitCoins, fee) {
  console.log('depositLedger triggered');
  this.playerStats.ledger += bitCoins;
  this.playerStats.bitCoins -= bitCoins * fee;
  this.save();
};

userSchema.methods.withdrawLedger = function (bitCoins, fee) {
  console.log('withdrawLedger triggered');
  this.playerStats.ledger += bitCoins;
  this.playerStats.bitCoins -= bitCoins * fee;
  this.save();
};

userSchema.methods.handlePettyCrime = async function (result) {
  this.playerStats.battery -= result.battery;
  this.playerStats.bitCoins += result.bitCoins;
  this.playerStats.networth += result.bitCoins;
  this.playerStats.exp += result.exp;

  if (result.stashGained) {
    const newStash = await Stash.findOne({ name: result.stashGained });
    this.stash.push(newStash._id);
  }
  if (result.crimeSkillGained) {
    this.crimeSkill[result.crimeSkillGained] += 1;
  }
  if (result.legendaryGained) {
    this[result.legendaryGained] += 1;
  }
  if (result.levelUp) {
    this.playerStats.statPoints += 5;
    this.playerStats.rank += 1;
    await Rank.findOne({ rank: this.playerStats.rank }).then((newRank) => {
      this.playerStats.rankName = newRank.name;
      this.playerStats.expToLevel = newRank.expToNewRank;
    });
  }
  this.save();
};

userSchema.methods.purchaseCurrency = function (
  currency,
  amount,
  batteryCost,
  totalPrice,
) {
  console.log('purchaseCurrency triggered');
  this.playerStats.battery -= batteryCost;
  this.playerStats.bitCoins -= totalPrice;
  this.currencies[currency.name] += amount;
  this.save();
};

userSchema.methods.sellCurrency = function (
  currency,
  amount,
  batteryCost,
  totalPrice,
) {
  console.log('sellCurrency triggered');
  this.battery -= batteryCost;
  this.currencies[currency.name] -= amount;
  this.playerStats.bitCoins += totalPrice;
  this.playerStats.networth += totalPrice;
  this.save();
};

userSchema.methods.changeCity = function (city, batteryCost) {
  console.log('changeCity triggered', batteryCost);
  this.playerStats.battery -= batteryCost;
  this.playerStats.city = city._id;
  this.save();
};

userSchema.methods.handleCrime = async function (finalResult) {
  this.playerStats.battery -= finalResult.playerGains.batteryCost;
  this.playerStats.bitCoins += finalResult.playerGains.bitCoins;
  this.playerStats.networth += finalResult.playerGains.bitCoins;
  this.playerStats.exp += finalResult.playerGains.exp;

  this.crimeSkill[finalResult.crimeType] += 1;

  if (finalResult.playerGains.stashGained) {
    this.stash.push(finalResult.playerGains.stashGained);
  }
  if (finalResult.playerGains.legendaryGained) {
    this.legendaryGained[finalResult.playerGains.legendaryGained] += 1;
  }
  if (finalResult.playerGains.levelUp) {
    this.playerStats.rank += 1;
    this.playerStats.statPoints += 5; // todo exctract rank functionality. used several times
    await Rank.findOne({ rank: this.playerStats.rank }).then((newRank) => {
      this.playerStats.rankName = newRank.name;
      this.playerStats.expToLevel = newRank.expToNewRank;
    });
  }
  await this.save();
};

userSchema.methods.handleAttack = function (finalResult) {
  this.playerStats.battery -= finalResult.playerGains.batteryCost;
  this.playerStats.bitCoins += finalResult.playerGains.bitCoins;
  this.playerStats.networth += finalResult.playerGains.bitCoins;
  this.playerStats.exp += finalResult.playerGains.exp;

  // adds currencies if victim died
  if (finalResult.victimDead) {
    for (const i in finalResult.playerGains.currencies) {
      this.currencies[i] += finalResult.playerGains.currencies[i];
    }
    this.playerStats.shutdowns += 1;
  }

  const newNotifications = [
    `You attacked ${finalResult.opponent.name} at ${new Date(
      finalResult.date,
    ).toString()} and dealt ${finalResult.damageDealt} damage${
      finalResult.victimDead ? ' and he was shutdown!' : '!'
    }`,
    true,
  ];
  this.account.notifications.push(newNotifications);
  this.save();
};

userSchema.methods.handleAttackDefense = function (finalResult) {
  console.log('userschema handleAttackDefense', finalResult);
  // todo, graceperiod

  const newNotifications = [
    `${finalResult.user.name} attacked you at ${new Date(
      finalResult.date,
    ).toString()} and dealt ${finalResult.damageDealt} damage${
      finalResult.victimDead ? ' and you were shutdown!' : '!'
    }`,
    true,
  ];
  this.account.notifications.push(newNotifications);

  this.playerStats.bitCoins -= finalResult.playerGains.bitCoins;
  this.playerStats.currentFirewall -= 10; // TODO figure out what number to put here

  // if the player is dead
  if (finalResult.victimDead) {
    // empties his current currency
    Object.keys(this.currencies).forEach(function (el) {
      this.currencies[el] = 0;
    });

    // if user rank 8, he is now 4. if user rank 9, he is now 5
    const newRank = Math.ceil(this.playerStats.rank / 2);
    Rank.findOne({ rank: newRank }).then((rankResult) => {
      this.playerStats.rankName = rankResult.name;
      this.playerStats.expToLevel = rankResult.expToNewRank;
      this.playerStats.exp = this.playerStats.expToLevel - 20000;
    });
  }

  // TODO finish this

  this.save();
};

// REPAIR
// REPAIR

userSchema.methods.partialRepair = function (repairCost) {
  console.log('partialRepair triggered');
  this.playerStats.bitCoins -= repairCost;
  this.playerStats.currentFirewall += (20 * this.playerStats.maxFirewall) / 100;

  if (this.playerStats.currentFirewall > this.playerStats.maxFirewall) {
    this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  }
  this.save();
};

userSchema.methods.fullRepair = function (repairCost) {
  this.playerStats.bitCoins -= repairCost;
  this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  this.save();
};

// DATACENTER
// DATACENTER

userSchema.methods.handleDataCenterPurchase = function (dataCenter) {
  console.log('handlePurchase triggered');
  this.playerStats.bitCoins -= dataCenter.price;
  this.save();
};

userSchema.methods.handleDataCenterAttack = function (dataCenter, result) {
  console.log('handleDataCenterAttack triggered');
  this.playerStats.battery -= result.batteryCost;
  dataCenter.requiredStash.forEach((el) => {
    this.stash.pop(el);
  });
  this.save();
};

userSchema.methods.giveNotification = function (message) {
  const date = Date.now();
  this.account.notifications[date] = [
    `${message} ${new Date(date).toString()}`,
    true,
  ];
  this.save();
};

// WANTEDLIST
/* todo, erase bounty and  if killed */

userSchema.methods.addBounty = function (bountyDonor, bounty) {
  // todo, change array to set to fix this issue?
  if (!this.playerStats.bountyDonors.some((el) => el.equals(bountyDonor._id))) {
    this.playerStats.bountyDonors.push(bountyDonor._id);
  }
  this.playerStats.bounty += parseInt(bounty, 10);
  this.save();
};

// MESSAGES
userSchema.methods.receiveMessage = function (message, senderName) {
  console.log('receiveMessage triggered');
  const date = Date.now();
  const newMessage = [
    `${senderName} ${new Date(date).toString()}: ${message}`,
    true,
  ];
  this.account.messages.push(newMessage);
  this.save();
};

userSchema.methods.sendMessage = function (message, senderName) {
  console.log('sendMessage triggered');
  const date = Date.now();
  const newMessage = [`${senderName} ${new Date(date).toString()}: ${message}`];
  this.account.sentMessages.push(newMessage);
  this.save();
};

userSchema.methods.readAllmessages = function (communication) {
  console.log('readAllmessages triggered');
  const path = this.account[communication];
  for (let i = 0; i < path.length; i += 1) {
    path[i][1] = false;
    // this to ensure mongoose knows embedded arrays have been modified
    this.markModified(`account.${communication.toString()}.${i.toString()}.1`);
  }
  // this.account.messages[0][1]=false
  this.save();
};

userSchema.methods.handleNewStatpoint = async function (statName) {
  console.log('hello from mongo', statName);
  this.playerStats.statPoints -= 1;
  console.log(this.hackSkill, this.playerStats.exp, 'before');
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
      this.crimeSkill.Technical += 5;
      break;
    case 'Forensics':
      this.crimeSkill.Forensics += 5;
      break;
    case 'Social Engineering':
      this.crimeSkill['Social Engineering'] += 5;
      break;
    case 'Cryptography':
      this.crimeSkill.Cryptography += 5;
      break;
    case 'exp':
      this.playerStats.exp += this.playerStats.expToLevel * 0.08;
      break;
    default:
      // gives back statpoints if something went wrong
      this.playerStats.statPoints += 1;
  }
  if (this.playerStats.exp >= this.playerStats.expToLevel) {
    this.playerStats.statPoints += 5;
    this.playerStats.rank += 1;
    await Rank.findOne({ rank: this.playerStats.rank }).then((newRank) => {
      this.playerStats.rankName = newRank.name;
      this.playerStats.expToLevel = newRank.expToNewRank;
    });
  }
  console.log(this.hackSkill, this.playerStats.exp, 'after');
  this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;
