const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Stash = require('../models/Stash');
const Rank = require('../models/Rank');

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    account: {
      password: String,
      ip: [String],
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
          '0': { '0': 'Hey man, welcome to CH4K', seen: false }
        }
      },
      messages: {
        type: Object,
        default: {
          '0': { '0': 'Hey man, welcome to CH4K', seen: false }
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
        default: 2
      },
      antiVirus: {
        type: Number,
        default: 1
      },
      encryption: {
        type: Number,
        default: 1
      }
    },
    crimeSkill: {
      technical: {
        type: Number,
        default: 2
      },
      socialEngineering: {
        type: Number,
        default: 1
      },
      forensics: {
        type: Number,
        default: 1
      },
      cryptography: {
        type: Number,
        default: 1
      }
    },

    //Player stats
    playerStats: {
      city: Schema.Types.ObjectId,
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

      //Player possessions
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

      failedAttempts: {
        type: Number,
        default: 0
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
// 'this' refers to userschema
// eg. 'this.items[item.type]
// this probably doesn't work. test it
userSchema.methods.addItem = function(item) {
  const currentItem = this.items[item.type];
  console.log(currentItem, 'currentitem');
  if (currentItem) {
    // lower the stats so items doesn't stack
    switch (currentItem.type) {
      case 'cpu':
        this.cpu -= currentItem.bonus;
        break;
      case 'avs':
        this.antiVirus -= currentItem.bonus;
        break;
      case 'firewall':
        this.maxFirewall -= currentItem.bonus;
        this.currentFirewall -= currentItem.bonus;
        break;
      case 'encryption':
        this.encryption -= currentItem.bonus;
        break;
    }
  }

  // gives the user the item

  this.items[item.type] = item;
  console.log(this.items, 'all items');
  console.log(this.items[item.type], 'this should be the new item');
  // adds the bonus to user
  switch (item.type) {
    case 'cpu':
      this.cpu += item.bonus;
      break;
    case 'avs':
      this.antiVirus += item.bonus;
      break;
    case 'firewall':
      this.maxFirewall += item.bonus;
      this.currentFirewall += item.bonus;
      break;
    case 'encryption':
      this.encryption += item.bonus;
      break;
  }
  return this.save();
};

userSchema.methods.fightCrime = function(opponent) {
  console.log('fight crime user method');
  console.log(opponent, 'opponent information');

  this.battery -= 7;

  let results = {
    rounds: [],
    currentHp: [],
    maxHp: opponent.maxFirewall,
    won: false,
    levelUp: false,
    gains: {
      exp: 0,
      bitCoins: 0,
      battery: 0,
      crime: 0,
      expToLevel: this.expToLevel
    }
  };

  let endResult = this.fightCrimeBattle(opponent, results);

  // If user levels up.
  if (this.exp >= this.expToLevel) {
    this.newRank();
    endResult.levelUp = true;
  }
  /* sends endResult to client and handles result */
  return endResult;
};

/* Recursive function that runs max 4 times */
/* Numbers needs to be tweaked */
userSchema.methods.fightCrimeBattle = function(opponent, results) {
  /* Figures outs how often encryption/block will effect */
  let different = (opponent.encryption / this.encryption) * 0.4;
  let encryptionOccurance =
    Math.random() + (opponent.encryption / this.encryption) * 0.4;
  if (different > 0.35) {
    encryptionOccurance = Math.random() + 0.35;
  } else if (different < 0.1) {
    encryptionOccurance = Math.random() + 0.1;
  }

  // Battle lost
  if (this.failedAttempts === 4) {
    results.gains.battery = -14;
    this.battery -= 7;
    this.roundNumber = 0;
    this.failedAttempts = 0;
    this.save();
    return results;
  }

  //Battle won:
  if (opponent.currentFirewall <= 0) {
    results.won = true;

    /* Figures out how much bitcoin user will get for winning */
    let moneyChange =
      Math.floor(Math.random() * (opponent.difficulty * 1000)) +
      opponent.difficulty * 500;

    /* Figures out how much exp user will get for winning */
    let expChange =
      Math.floor(Math.random() * 300) + opponent.difficulty * 200 + 100;

    /* Figures out how much crimeSkill user will get for winning */
    let crimeChange = Math.floor(Math.random() * opponent.difficulty) + 1;

    this.bitCoins += moneyChange;
    this.networth += moneyChange;
    this.exp += expChange;
    this.crimeSkill += crimeChange;

    if (this.crimeSkill > 1000) {
      this.crimeSkill = 1000;
    }
    results.gains.exp = expChange;
    results.gains.bitCoins = moneyChange;
    results.gains.battery = -7;
    results.gains.crime = crimeChange;
    this.failedAttempts = 0;
    this.save();
    return results;
  }
  /* if combat lost, but battle not over  */
  /* ENCRYPTION TOO HIGH, **BLOCKED** */
  /* Starts recursive */
  if (encryptionOccurance >= 1 + this.crimeSkill / 100) {
    this.failedAttempts += 1;
    results.rounds.push('encryption');
    results.currentHp.push(opponent.currentFirewall);
    return this.fightCrimeBattle(opponent, results);
  }

  /* if if combat won, but battle not over */
  opponent.currentFirewall -= this.cpu + this.crimeSkill / 10;
  results.rounds.push('hit');

  /* ensures no minus */
  if (opponent.currentFirewall < 0) {
    opponent.currentFirewall = 0;
  }
  results.currentHp.push(opponent.currentFirewall);
  return this.fightCrimeBattle(opponent, results);
};

userSchema.methods.newRank = function() {
  console.log('new rank method triggered');
  this.statPoints += 5;
  this.rank++;
  Rank.findOne({ rank: this.rank }).then(newRank => {
    this.rankName = newRank.name;
    this.expToLevel = newRank.expToNewRank;
  });
  this.save();
};

userSchema.methods.giveStash = function(stashName = 'Cables') {
  console.log('give stash method triggered', stashName);
  Stash.findOne({ name: stashName }).then(newStash => {
    console.log(newStash._id, 'newstash');
    console.log(this.stash);
    this.stash.push(newStash._id);
  });
  this.save();
};

userSchema.methods.giveBitcoins = function(bitcoins = 1) {
  console.log('give bitcoins method triggered', bitcoins);
  this.playerStats.bitCoins += bitcoins;
  this.playerStats.networth += bitcoins;
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

const User = mongoose.model('User', userSchema);
module.exports = User;
