const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");

const app = "http://localhost:5000/api/";
const User = require("../models/User");

const { createDummyUser, cleanUp } = require("./helper/createDbUser");
const {
  pettyHackRouteCriterias,
  pettyCrime
} = require("../middlewares/middlePettyHack");

const fakeSkillGainAttributes = require("./helper/fakeValues/petty");
chai.use(chaiHttp);

describe("Petty Route", function () {
  after(function (done) {
    cleanUp();
    done();
  });
  describe("Petty Hack Route Criterias", function () {
    let user = {
      name: "testUser",
      playerStats: { battery: 20 }
    };
    let batteryCost = 10;

    it("Should return null if everythin passes ", function () {
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal(null);
    });

    it("Should return insufficent battery if player doesn't have enough battery to commit crime ", function () {
      user.playerStats.battery = 5;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal("insufficent battery");
    });

    it("Should return no exist on batterycost if not provided", function () {
      batteryCost = undefined;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal("Battery doesn't exist");
    });

    it("Should return no exist on user if not provided", function () {
      user = undefined;
      const result = pettyHackRouteCriterias(user, batteryCost);
      expect(result).to.be.equal("User doesn't exist");
    });
  });

  describe("Petty crime semi-integration", function () {
    it("Should return the correct values if player succeed", async () => {
      const alice = await createDummyUser();
      const result = await forceSkillGain(alice);

      expect(result.won).to.be.equal(true);
      expect(typeof result.bitCoins).to.be.equal("number");
      expect(typeof result.exp).to.be.equal("number");
      expect(typeof result.battery).to.be.equal("number");
      expect(typeof result.stashGained).to.be.equal("string");
      expect(typeof result.crimeSkillGained).to.be.equal("string");
    });

    skillGainTester(85, null, "BEGINNER");
    skillGainTester(25, fakeSkillGainAttributes.novice, "NOVICE");
    skillGainTester(40, fakeSkillGainAttributes.intermidiate, "INTERMIDIATE");
    skillGainTester(60, fakeSkillGainAttributes.experienced, "EXPERIENCED");
    skillGainTester(75, fakeSkillGainAttributes.strong, "STRONG");
    skillGainTester(85, fakeSkillGainAttributes.veryStrong, "VERY STRONG");
    async function skillGainTester(x, attributes, skill) {
      it(`Should win atleast ${x}% of time (and skillgain ${x -
        11}%) as player w ${skill} stats`, async () => {
          const alice = await createDummyUser(attributes);
          let result;
          let crimeWon = 0;
          let skillWon = 0;
          for (let i = 0; i <= 100; i++) {
            result = await pettyCrime(alice);
            if (result.won) {
              crimeWon++;
            }
            if (result.crimeSkillGained) {
              skillWon++;
            }
          }
          expect(crimeWon).to.be.above(x);
          expect(skillWon).to.be.above(x - 11);
        });
    }
  });
});

// runs function until user gets a crimeskill
async function forceSkillGain(user) {
  let result = await pettyCrime(user);
  if (result.crimeSkillGained) {
    return await result;
  }
  return forceSkillGain(user);
}
