const assert = require("assert");
const User = require("../models/User");
const { expect } = require("chai");

const {
  pettyHackRouteCriterias,
  pettyCrime
} = require("../middlewares/middlePettyHack");

const { createDummyUser, cleanUp } = require("./helper");

describe("Petty Route", function() {
  describe("Petty Hack Route Criterias", function() {
    it("Should return no exist on user if not provided", function() {
      const user = undefined;
      const batteryCost = 5;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal("User doesn't exist");
    });

    it("Should return no exist on batterycost if not provided", function() {
      const user = {
        name: "testUser",
        playerStats: { battery: 20 }
      };
      const batteryCost = undefined;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal("Battery doesn't exist");
    });

    it("Should return insufficent battery if player doesn't have enough battery to commit crime ", function() {
      const user = {
        name: "testUser",
        playerStats: { battery: 5 }
      };
      const batteryCost = 10;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal("insufficent battery");
    });

    it("Should return null if everythin passes ", function() {
      const user = {
        name: "testUser",
        playerStats: { battery: 20 }
      };
      const batteryCost = 10;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal(null);
    });
  });

  describe("Petty crime semi-integration", function() {
    it("Should return the correct values if player succeed", async () => {
      const alice = await createDummyUser();
      let result;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);

        if (result.crimeSkillGained) {
          break;
        }
      }

      expect(result.won).to.be.equal(true);
      expect(typeof result.bitcoins).to.be.equal("number");
      expect(typeof result.exp).to.be.equal("number");
      expect(typeof result.battery).to.be.equal("number");
      expect(typeof result.stashGained).to.be.equal("string");
      expect(typeof result.crimeSkillGained).to.be.equal("string");
    });

    it("Should win atleast 85% of time (and skillgain 75%) as player w BEGINNER stats", async () => {
      const alice = await createDummyUser();
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }

      expect(crimeWon).to.be.above(85);
      expect(skillWon).to.be.above(75);
    });

    it("Should win atleast 25% of time (and skillgain 15%) as player with NOVICE stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 2,
          "Social Engineering": 2,
          Forensics: 2,
          Cryptography: 2
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(25);
      expect(skillWon).to.be.above(15);
    });

    it("Should win atleast 40% of time (and skillgain 30%) as player with INTERMIDIATE stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 3,
          "Social Engineering": 3,
          Forensics: 3,
          Cryptography: 3
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(40);
      expect(skillWon).to.be.above(30);
    });

    it("Should win atleast 60% of time (and skillgain 50%) as player with EXPERIENCED stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 5,
          "Social Engineering": 5,
          Forensics: 6,
          Cryptography: 2
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(60);
      expect(skillWon).to.be.above(50);
    });

    it("Should win atleast 75% of time (and skillgain 65%) as player with STRONG stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 7,
          "Social Engineering": 5,
          Forensics: 6,
          Cryptography: 7
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(75);
      expect(skillWon).to.be.above(65);
    });

    it("Should win atleast 85% of time (and skillgain 75%) as player with VERY STRONG stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 10,
          "Social Engineering": 9,
          Forensics: 11,
          Cryptography: 18
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(85);
      expect(skillWon).to.be.above(75);
    });
  });

  describe("Petty crime semi-integration", function() {
    it("Should return the correct values if player succeed", async () => {
      const alice = await createDummyUser();
      let result;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);

        if (result.crimeSkillGained) {
          break;
        }
      }

      expect(result.won).to.be.equal(true);
      expect(typeof result.bitcoins).to.be.equal("number");
      expect(typeof result.exp).to.be.equal("number");
      expect(typeof result.battery).to.be.equal("number");
      expect(typeof result.stashGained).to.be.equal("string");
      expect(typeof result.crimeSkillGained).to.be.equal("string");
    });

    it("Should win atleast 85% of time (and skillgain 75%) as player w BEGINNER stats", async () => {
      const alice = await createDummyUser();
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }

      expect(crimeWon).to.be.above(85);
      expect(skillWon).to.be.above(75);
    });

    it("Should win atleast 25% of time (and skillgain 15%) as player with NOVICE stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 2,
          "Social Engineering": 2,
          Forensics: 2,
          Cryptography: 2
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(25);
      expect(skillWon).to.be.above(15);
    });

    it("Should win atleast 40% of time (and skillgain 30%) as player with INTERMIDIATE stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 3,
          "Social Engineering": 3,
          Forensics: 3,
          Cryptography: 3
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(40);
      expect(skillWon).to.be.above(30);
    });

    it("Should win atleast 60% of time (and skillgain 50%) as player with EXPERIENCED stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 5,
          "Social Engineering": 5,
          Forensics: 6,
          Cryptography: 2
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(60);
      expect(skillWon).to.be.above(50);
    });

    it("Should win atleast 75% of time (and skillgain 65%) as player with STRONG stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 7,
          "Social Engineering": 5,
          Forensics: 6,
          Cryptography: 7
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(75);
      expect(skillWon).to.be.above(65);
    });

    it("Should win atleast 85% of time (and skillgain 75%) as player with VERY STRONG stats", async () => {
      const attributes = {
        crimeSkill: {
          Technical: 10,
          "Social Engineering": 9,
          Forensics: 11,
          Cryptography: 18
        }
      };
      const alice = await createDummyUser(attributes);
      let result;
      let crimeWon = 0;
      let skillWon = 0;

      for (let i = 0; i <= 100; i++) {
        result = pettyCrime(alice);
        if (result.won) {
          crimeWon++;
        }
        if (result.crimeSkillGained) {
          skillWon++;
        }
      }
      expect(crimeWon).to.be.above(85);
      expect(skillWon).to.be.above(75);
    });
  });
});
