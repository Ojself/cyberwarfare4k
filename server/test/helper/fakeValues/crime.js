let user = {
  account: { role: "testUser" },
  crimeSkill: {
    Technical: 50,
    "Social Engineering": 50,
    Forensics: 50,
    Cryptography: 50
  },
  hackSkill: {
    cpu: 75,
    antiVirus: 75,
    encryption: 75
  },
  playerStats: {
    battery: 20,
    rank: 0
  }
};
let crime = {
  available: true,
  crimeType: "Technical",
  difficulty: 30,
  currentFirewall: 90 // diff*3
};
const result = {
  user: user,
  crimeType: crime.crimeType,
  roundResult: [],
  roundCrimeRemainingHp: [],
  crimeHp: crime.currentFirewall,
  won: false,
  playerGains: {
    levelUp: false,
    batteryCost: 7,
    exp: 0,
    bitCoins: 0,
    skillGained: "",
    stashGained: "",
    legendaryGained: ""
  }
}

const fakeDamageAttribtures = {
  beginner: {
    hackSkill: {
      cpu: 3,
      antiVirus: 2,
      encryption: 3
    },
    crimeSkill: 10,
    damage: 10,
    string: 'BEGINNER'
  },
  novice: {
    hackSkill: {
      cpu: 20,
      antiVirus: 20,
      encryption: 20
    },
    crimeSkill: 40,
    damage: 50,
    string: 'NOVICE'
  },
  intermidiate: {
    hackSkill: {
      cpu: 50,
      antiVirus: 50,
      encryption: 50
    },
    crimeSkill: 70,
    damage: 110,
    string: 'INTERMIDIATE'
  },
  strong: {
    hackSkill: {
      cpu: 110,
      antiVirus: 110,
      encryption: 110
    },
    crimeSkill: 140,
    damage: 230,
    string: 'STRONG'
  },
  veryStrong: {
    hackSkill: {
      cpu: 200,
      antiVirus: 200,
      encryption: 200
    },
    crimeSkill: 200,
    damage: 400,
    string: "VERY STRONG"
  }
}


module.exports = { user, crime, result, fakeDamageAttribtures }