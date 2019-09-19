const fakeSkillGainAttributes = {
  beginner: {},
  novice: {
    crimeSkill: {
      Technical: 2,
      "Social Engineering": 2,
      Forensics: 2,
      Cryptography: 2
    }
  },
  intermidiate: {
    crimeSkill: {
      Technical: 3,
      "Social Engineering": 3,
      Forensics: 3,
      Cryptography: 3
    }
  },
  experienced: {
    crimeSkill: {
      Technical: 5,
      "Social Engineering": 5,
      Forensics: 6,
      Cryptography: 2
    }
  },
  strong: {
    crimeSkill: {
      Technical: 7,
      "Social Engineering": 5,
      Forensics: 6,
      Cryptography: 7
    }
  },
  veryStrong: {
    crimeSkill: {
      Technical: 10,
      "Social Engineering": 9,
      Forensics: 11,
      Cryptography: 18
    }
  }
};

module.exports = fakeSkillGainAttributes;
