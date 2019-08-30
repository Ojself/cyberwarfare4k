const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Stash = require('../models/Stash');
const Rank = require('../models/Rank');
const City = require('../models/City');

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    account: {
      password: String,
      ip: [String],
      status: {
        type: String,
        enum: ['Pending Confirmation', 'Active'],
        default: 'Pending Confirmation'
      },
      confirmationCode: String,
      subscription: {
        type: String,
        enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
        default: 'Bronze'
      },
      isSetup: {
        type: Boolean,
        default: false
      },
      role: {
        type: String,
        enum: ['user', 'npc', 'admin'],
        default: 'user'
      },
      notifications: {
        type: Object,
        default: {
          '0': ['Hey man, welcome to CH4K', false]
        }
      },
      messages: {
        type: Object,
        default: {
          '0': ['Hey man, welcome to CH4K', false]
        }
      },
      banned: {
        type: Boolean,
        default: false
      },
      bannedReason: {
        type: String,
        default: ''
      }
    },
    name: {
      type: String,
      default: '',
      unique: true
    },
    alliance: {
      type: String,
      enum: ['White', 'Black', 'Red', 'Grey', 'Brown', ''],
      default: ''
    },

    hackSkill: {
      cpu: {
        type: Number,
        default: 1
      },
      antiVirus: {
        type: Number,
        default: 2
      },
      encryption: {
        type: Number,
        default: 1
      }
    },
    crimeSkill: {
      Technical: {
        type: Number,
        default: 2
      },
      'Social Engineering': {
        type: Number,
        default: 1
      },
      Forensics: {
        type: Number,
        default: 1
      },
      Cryptography: {
        type: Number,
        default: 1
      }
    },
    // currencies
    currencies: {
      Litecoin: { type: Number, default: 0 },
      Ethereum: { type: Number, default: 0 },
      Ripple: { type: Number, default: 0 },
      Monero: { type: Number, default: 0 },
      Zcash: { type: Number, default: 0 }
    },

    //Player stats
    playerStats: {
      city: { type: Schema.Types.ObjectId, ref: 'City' },
      statPoints: {
        type: Number,
        default: 5
      },
      maxFirewall: {
        type: Number,
        default: 100
      },
      currentFirewall: {
        type: Number,
        default: 100
      },
      battery: {
        type: Number,
        default: 100
      },

      bitCoins: {
        type: Number,
        default: 1000
      },
      networth: {
        type: Number,
        default: 0
      },
      bounty: {
        type: Number,
        default: 0
      },
      bountyDonors: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
      },
      rank: {
        type: Number,
        default: 0
      },
      rankName: {
        type: String,
        default: 'Script kiddie'
      },
      shutdowns: {
        type: Number,
        default: 0
      },
      exp: {
        type: Number,
        default: 0
      },
      expToLevel: {
        type: Number,
        default: 10000
      }
    },

    marketPlaceItems: {
      cpu: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null
      },
      firewall: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null
      },
      avs: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null
      },
      encryption: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        default: null
      }
    },
    /* Special weapons */
    specialWeapons: {
      equipped: {
        type: String,
        default: ''
      },
      emp: {
        type: Number,
        default: 0
      },

      geostorm: {
        type: Number,
        default: 0
      },

      medusa: {
        type: Number,
        default: 0
      }
    },
    // Should be an object with stash instead of array to easier show amount
    stash: {
      type: [Schema.Types.ObjectId],
      ref: 'Stash'
    },

    //Figth accessories
    fightInformation: {
      inCombat: {
        type: Boolean,
        default: false
      },

      gracePeriod: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

// from marketplace
// this probably doesn't work. test it
userSchema.methods.handleItemPurchase = function(item) {
  console.log('handleItemPurchase triggered', item);
  const currentItem = this.marketPlaceItems[item.type];
  if (currentItem) {
    // lower the stats so items doesn't stack
    switch (currentItem.type) {
      case 'cpu':
        this.hackSkill.cpu -= currentItem.bonus;
        break;
      case 'avs':
        this.hackSkill.antiVirus -= currentItem.bonus;
        break;
      case 'firewall':
        this.playerStats.maxFirewall -= currentItem.bonus;
        this.playerStats.currentFirewall -= currentItem.bonus;
        break;
      case 'encryption':
        this.hackSkill.encryption -= currentItem.bonus;
        break;
    }
  }

  // gives the user the item

  this.marketPlaceItems[item.type] = item;
  // adds the bonus to user
  switch (item.type) {
    case 'cpu':
      this.hackSkill.cpu += item.bonus;
      break;
    case 'avs':
      this.hackSkill.antiVirus += item.bonus;
      break;
    case 'firewall':
      this.playerStats.maxFirewall += item.bonus;
      this.playerStats.currentFirewall += item.bonus;
      break;
    case 'encryption':
      this.hackSkill.encryption += item.bonus;
      break;
  }
  return this.save();
};

userSchema.methods.newRank = function() {
  console.log('new rank method triggered');
  this.playerStats.statPoints += 5;
  this.playerStats.rank++;
  Rank.findOne({ rank: this.rank }).then(newRank => {
    this.playerStats.rankName = newRank.name;
    this.playerStats.expToLevel = newRank.expToNewRank;
  });
  this.save();
};

userSchema.methods.giveStash = function(stashName = 'Cables') {
  console.log('give stash method triggered', stashName);
  Stash.findOne({ name: stashName }).then(newStash => {
    this.stash.push(newStash._id);
  });
  this.save();
};

userSchema.methods.giveExp = function(exp = 1) {
  console.log('give exp method triggered', exp);
  this.playerStats.exp += exp;
  this.save();
};

userSchema.methods.giveLegendary = function(itemName = 'emp') {
  console.log('give legendary method triggered', itemName);
  this[itemName]++;
  this.save();
};

userSchema.methods.giveSkill = function(skill = 'technical') {
  console.log('give crimeskill triggered', skill);
  console.log(this.crimeSkill, 'this.crimeSkill');
  this.crimeSkill[skill]++;
  this.save();
};

userSchema.methods.batteryDrain = function(battery = 5) {
  console.log('batterydrain triggered', battery);
  this.playerStats.battery -= battery;
  this.save();
};

userSchema.methods.batteryGain = function(battery = 5) {
  console.log('batteryGain triggered', battery);
  this.playerStats.battery += battery;
  if (this.playerStats.battery > 100) {
    this.playerStats.battery = 100;
  }
  this.save();
};

userSchema.methods.bitcoinDrain = function(bitcoins = 5) {
  console.log('bitcoinsdrain triggered', bitcoins);
  this.playerStats.bitcoins -= bitcoins;
  this.save();
};

userSchema.methods.bitcoinGain = function(bitcoins = 5) {
  console.log('bitcoinsGain triggered', bitcoins);
  this.playerStats.bitcoins += bitcoins;
  // this.playerStats.networth += bitcoins;
  this.save();
};

userSchema.methods.handlePettyCrime = async function(result) {
  console.log('handlePettyCrime triggered', result);
  this.playerStats.battery -= result.battery;
  this.playerStats.bitcoins += result.bitcoins;
  this.playerStats.networth += result.bitcoins;
  this.playerStats.exp += result.exp;

  if (result.stashGained) {
    let newStash = await Stash.findOne({ name: result.stashGained });
    console.log(newStash, 'newstash');
    this.stash.push(newStash._id);
  }
  if (result.crimeSkillGained) {
    this.crimeSkill[result.crimeSkillGained]++;
  }
  if (result.legendaryGained) {
    this[result.legendaryGained]++;
  }
  this.save();
};

userSchema.methods.purchaseCurrency = function(
  currency,
  amount,
  batteryCost,
  totalPrice
) {
  console.log('purchaseCurrency triggered', arguments);
  this.playerStats.battery -= batteryCost;
  this.playerStats.bitCoins -= totalPrice;
  this.currencies[currency.name] += amount;
  this.save();
};

userSchema.methods.sellCurrency = function(
  currency,
  amount,
  batteryCost,
  totalPrice
) {
  console.log('sellCurrency triggered', arguments);
  this.battery -= batteryCost;
  this.currencies[currency.name] -= amount;
  this.playerStats.bitCoins += totalPrice;
  this.playerStats.networth += totalPrice;
  this.save();
};

userSchema.methods.changeCity = function(city, batteryCost) {
  console.log('changeCity triggered', batteryCost);
  this.playerStats.battery -= batteryCost;
  this.playerStats.city = city._id;
  this.save();
};

userSchema.methods.handleCrime = function(finalResult) {
  console.log('userschema handleCrime triggered', finalResult);
  this.playerStats.battery -= finalResult.playerGains.batteryCost;
  this.playerStats.bitCoins += finalResult.playerGains.bitCoins;
  this.playerStats.networth += finalResult.playerGains.bitCoins;
  this.playerStats.exp += finalResult.playerGains.exp;

  this.crimeSkill[finalResult.crimeType]++;

  if (finalResult.playerGains.stashGained) {
    this.stash.push(finalResult.playerGains.stashGained);
  }
  if (finalResult.playerGains.legendaryGained) {
    this.legendaryGained[finalResult.playerGains.legendaryGained]++;
  }
  this.save();
};

userSchema.methods.handleAttack = function(finalResult) {
  console.log('userschema handleAttack', finalResult);

  this.playerStats.battery -= finalResult.playerGains.batteryCost;
  this.playerStats.bitCoins += finalResult.playerGains.bitCoins;
  this.playerStats.networth += finalResult.playerGains.bitCoins;
  this.playerStats.exp += finalResult.playerGains.exp;

  // TODO finish this

  this.account.notifications[finalResult.date] = [
    `You attacked ${finalResult.opponent.name} ${new Date(
      finalResult.date
    ).toString()} and dealt ${XXXX} damage`,
    true
  ];

  // adds currencies
  for (let i in finalResult.playerGains.currencies) {
    this.currencies[i] += finalResult.playerGains.currencies[i];
  }
  this.shutdowns++;

  this.save();
};

userSchema.methods.handleAttackDefense = function(finalResult) {
  console.log('userschema handleAttackDefense', finalResult);
  // todo, graceperiod
  this.account.notifications[finalResult.date] = [
    `${user.name} attacked you at ${new Date(finalResult.date).toString()}`,
    false
  ];

  this.playerStats.bitCoins -= finalResult.playerGains.bitCoins;
  this.playerStats.currentFirewall -= 10; // TODO figure out what number to put here

  // if the player is dead
  if (this.playerStats.currentFirewall <= 0) {
    // empties his current currency
    Object.keys(this.currencies).forEach(el => (this.currencies[el] = 0));

    // if user rank 8, he is now 4. if user rank 9, he is now 5
    let newRank = Math.ceil(this.rank / 2);
    Rank.findOne({ rank: newRank }).then(newRank => {
      this.playerStats.rankName = newRank.name;
      this.playerStats.expToLevel = newRank.expToNewRank;
      this.playerStats.exp = this.playerStats.expToLevel - 20000;
    });
  }

  // TODO finish this

  this.save();
};

// REPAIR
// REPAIR

userSchema.methods.partialRepair = function(repairCost, batteryCost) {
  console.log('partialRepair triggered');
  // this.playerStats.battery -= battery;
  this.playerStats.bitCoins -= repairCost;
  this.playerStats.currentFirewall += (20 * this.playerStats.maxFirewall) / 100;

  if (this.playerStats.currentFirewall > this.playerStats.maxFirewall) {
    this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  }
  this.save();
};

userSchema.methods.fullRepair = function(repairCost, batteryCost) {
  console.log('fullRepair triggered');
  // this.playerStats.battery -= battery;
  this.playerStats.bitCoins -= repairCost;
  this.playerStats.currentFirewall = this.playerStats.maxFirewall;
  this.save();
};

// DATACENTER
// DATACENTER

userSchema.methods.handleDataCenterPurchase = function(
  dataCenter,
  batteryCost
) {
  console.log('handlePurchase triggered');
  // this.playerStats.battery -= batteryCost;
  this.playerStats.bitCoins -= dataCenter.price;
  this.save();
};

userSchema.methods.handleDataCenterAttack = function(dataCenter, result) {
  console.log('handleDataCenterAttack triggered');
  this.playerStats.battery -= result.batteryCost;
  dataCenter.requiredStash.forEach(el => {
    this.stash.pop(el);
  });
  this.save();
};

userSchema.methods.giveNotification = function(message) {
  let date = Date.now();
  this.account.notifications[date] = [
    `${message} ${new Date(date).toString()}`,
    true
  ];
  this.save();
};

// WANTEDLIST
/* todo, erase bounty and  if killed */

userSchema.methods.addBounty = function(bountyDonor, bounty) {
  // todo, change array to set to fix this issue?
  if (!this.playerStats.bountyDonors.some(el => el.equals(bountyDonor._id))) {
    this.playerStats.bountyDonors.push(bountyDonor._id);
  }
  this.playerStats.bounty += parseInt(bounty);
  this.save();
};

const User = mongoose.model('User', userSchema);
module.exports = User;
