const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = chai.should();

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
        10}%) as player w ${skill} stats`, async () => {
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
          expect(skillWon).to.be.above(x - 10);
        });
    }
  });

  // only God knows what's going on here
  // Wanted behavior: Call the POST api 6 times to see if the values of player changes.
  describe("/POST hack/pettyCrime", function () {
    const attributesPettyPost = {
      playerStats: { battery: 30, exp: 9999 },
      role: "testUserDB"
    };
    let alice;

    before(function (done) {
      createDummyUser(attributesPettyPost).then(result => {
        alice = result;
        done();
      });
    });

    for (let i = 0; i < 7; i++) {
      it(`POST #${i} numerous times should give user various 'attributes' and status ${
        i == 6 ? "400" : "200"
        } `, done => {
          let userId = alice._id.toString();
          chai
            .request(app)
            .post("hack/pettyCrime")
            .set("content-type", "application/x-www-form-urlencoded")
            .send({ body: userId })
            .end((err, res) => {
              if (i == 6) {
                res.should.have.status(400); // insufficent battery
                done();
              } else {
                res.should.have.status(200);
                done();
              }
            });
        });
    }

    it("should have levled up and gain new values after commiting 6 pettycrime", async () => {
      await User.findById(alice._id).then(result => {
        const crimeSkill = Object.values(result.crimeSkill);
        const {
          battery,
          bitCoins,
          networth,
          rank,
          rankName
        } = result.playerStats;

        const oldCrimeSkill = Object.values(alice.crimeSkill);
        const oldBattery = alice.playerStats.battery;
        const oldBitCoins = alice.playerStats.bitCoins;
        const oldNetworth = alice.playerStats.networth;
        const oldRank = alice.playerStats.rank;
        const oldRankName = alice.playerStats.rankName;

        expect(crimeSkill > oldCrimeSkill).to.be.equal(true);
        expect(battery > oldBattery).to.be.equal(false);
        expect(bitCoins > oldBitCoins).to.be.equal(true);
        expect(networth > oldNetworth).to.be.equal(true);
        expect(rank > oldRank).to.be.equal(true);
        expect(rankName !== oldRankName).to.be.equal(true);
      });
    });
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
