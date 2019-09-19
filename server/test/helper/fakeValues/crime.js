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
    battery: 20
  }
};
let crime = {
  available: true,
  crimeType: "Technical",
  difficulty: 150,
  currentFirewall: 450 // diff*3
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
    bitcoins: 0,
    skillGained: "",
    stashGained: "",
    legendaryGained: ""
  }
}


module.exports = { user, crime, result }