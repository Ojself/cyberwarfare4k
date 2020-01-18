let user = {
  account: { role: 'testUser' },
  crimeSkill: {
    Technical: 50,
    'Social Engineering': 50,
    Forensics: 50,
    Cryptography: 50
  },
  hackSkill: {
    CPU: 75,
    AntiVirus: 75,
    Encryption: 75
  },
  playerStats: {
    battery: 20,
    rank: 0
  }
};
let crime = {
  available: true,
  crimeType: 'Technical',
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
    skillGained: '',
    stashGained: '',
    legendaryGained: ''
  }
};

const fakeDamageAttribtures = {
  beginner: {
    hackSkill: {
      CPU: 3,
      AntiVirus: 2,
      Encryption: 3
    },
    crimeSkill: 10,
    damage: 10,
    string: 'BEGINNER'
  },
  novice: {
    hackSkill: {
      CPU: 20,
      AntiVirus: 20,
      Encryption: 20
    },
    crimeSkill: 40,
    damage: 50,
    string: 'NOVICE'
  },
  intermidiate: {
    hackSkill: {
      CPU: 50,
      AntiVirus: 50,
      Encryption: 50
    },
    crimeSkill: 70,
    damage: 110,
    string: 'INTERMIDIATE'
  },
  strong: {
    hackSkill: {
      CPU: 110,
      AntiVirus: 110,
      Encryption: 110
    },
    crimeSkill: 140,
    damage: 230,
    string: 'STRONG'
  },
  veryStrong: {
    hackSkill: {
      CPU: 200,
      AntiVirus: 200,
      Encryption: 200
    },
    crimeSkill: 200,
    damage: 400,
    string: 'VERY STRONG'
  }
};

module.exports = { user, crime, result, fakeDamageAttribtures };
