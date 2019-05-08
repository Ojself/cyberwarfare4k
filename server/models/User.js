const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    isSetup: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    name: {
      type: String,
      unique: true
    },
    alliance: {
      type: String,
      enum: ["White hats", "Black hats"],
      default: "White hats"
    },

    // Player picture
    imgName: String,
    imgPath: String,

    //Player stats
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
    cpu: {
      type: Number,
      default: 10
    },
    antiVirus: {
      type: Number,
      default: 5
    },
    encryption: {
      type: Number,
      default: 10
    },
    crimeSkill: {
      type: Number,
      default: 0
    },
    battery: {
      type: Number,
      default: 100
    },

    //Player possessions
    bitCoins: {
      type: Number,
      default: 0
    },
    bounty: {
      type: Number,
      default: 0
    },

    items: {
      cpu: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
      },
      firewall: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
      },
      avs: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
      },
      encryption: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        default: null
      }
    }, //Player information
    rank: {
      type: Number,
      default: 0
    },

    rankName: {
      type: String,
      default: "Script kiddie"
    },
    shutdowns: {
      type: Number,
      default: 0
    },
    networth: {
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
    },

    //Figth accessories
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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;





