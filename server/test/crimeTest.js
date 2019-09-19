const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = chai.should();

const app = "http://localhost:5000/api/";
const User = require("../models/User");
const Crime = require("../models/Crime");

const { createDummyUser, cleanUp } = require("./helper/createDbUser");
const {
  crimeRouteCriterias,
  crimeWin,
  fightCrime,
  chanceCalculator,
  damageCalulator,
  roundWin,
  roundLost
} = require("../middlewares/middleCrime");

const { user, crime, result } = require("./helper/fakeValues/crime");

chai.use(chaiHttp);

describe("Crime", function () {
  describe("Crime helper functions", function () {
    describe("chanceCalculator", function () {
      it(" should return 0.05 if user is trying to do too difficult crime", () => {
        crime.crimeType = "Technical"
        user.crimeSkill.Technical = 20
        crime.difficulty = 55
        const result = chanceCalculator(user, crime);

        crime.crimeType = "Social Engineering"
        user.crimeSkill["Social Engineering"] = 50
        crime.difficulty = 150
        const result2 = chanceCalculator(user, crime);

        expect(typeof result).to.be.equal("number");
        expect(typeof result2).to.be.equal("number");
        expect(result).to.be.equal(0.05);
        expect(result2).to.be.equal(0.05);
      });

      it("Should give approx 30% probability for 20 skillpoints below difficulty", () => {
        crime.crimeType = "Social Engineering"
        user.crimeSkill["Social Engineering"] = 10
        crime.difficulty = 30
        let chanceAverage = 0
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 260).to.be.equal(true);
        expect(chanceAverage < 340).to.be.equal(true);
      });

      it("Should give approx 40% probability for 10 skillpoints below difficulty", () => {
        crime.crimeType = "Forensics"
        user.crimeSkill.Forensics = 20
        crime.difficulty = 30
        let chanceAverage = 0
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 360).to.be.equal(true);
        expect(chanceAverage < 440).to.be.equal(true);
      });

      it("Should give 50% probability if skills are alike", () => {
        crime.crimeType = "Cryptography"
        user.crimeSkill.Cryptography = 50
        crime.difficulty = 50
        let chanceAverage = 0
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }

        expect(chanceAverage > 460).to.be.equal(true);
        expect(chanceAverage < 540).to.be.equal(true);
      });

      it("Should give approx 60% probability for 10 skillpoints ABOVE difficulty", () => {
        crime.crimeType = "Forensics"
        user.crimeSkill.Forensics = 90
        crime.difficulty = 80
        let chanceAverage = 0
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }

        expect(chanceAverage > 560).to.be.equal(true);
        expect(chanceAverage < 640).to.be.equal(true);
      });

      it("Should give approx 70% probability for 20 skillpoints ABOVE difficulty", () => {
        crime.crimeType = "Forensics"
        user.crimeSkill.Forensics = 100
        crime.difficulty = 80
        let chanceAverage = 0

        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 660).to.be.equal(true);
        expect(chanceAverage < 740).to.be.equal(true);
      });
    });
    describe("damageCalculator", function () {
      it("should return less than 10dmg if BEGINNER stats", () => {
        crime.crimeType = "Technical"
        user.crimeSkill.Technical = 10
        user.hackSkill = {
          cpu: 3,
          antiVirus: 2,
          encryption: 3
        }
        let averageDamage = 0

        for (let i = 0; i < 1000; i++) {
          averageDamage += damageCalulator(user, crime)
        }
        expect(averageDamage < 10000).to.be.equal(true);
      });



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

      damageCalculatorTester(user, crime, fakeDamageAttribtures.beginner)
      damageCalculatorTester(user, crime, fakeDamageAttribtures.novice)
      damageCalculatorTester(user, crime, fakeDamageAttribtures.intermidiate)
      damageCalculatorTester(user, crime, fakeDamageAttribtures.strong)
      damageCalculatorTester(user, crime, fakeDamageAttribtures.veryStrong)

      function damageCalculatorTester(user, crime, fakeDamageAttribtures) {
        it(`should return  ${fakeDamageAttribtures.damage * 1.1} > && > ${fakeDamageAttribtures.damage * 0.9} dmg if ${fakeDamageAttribtures.string} stats`, () => {
          crime.crimeType = "Social Engineering"
          user.crimeSkill["Social Engineering"] = fakeDamageAttribtures.crimeSkill
          user.hackSkill = fakeDamageAttribtures.hackSkill

          let averageDamage = 0

          for (let i = 0; i < 1000; i++) {
            averageDamage += damageCalulator(user, crime)
          }
          averageDamage = averageDamage / 1000
          console.log(averageDamage, fakeDamageAttribtures.string)
          expect(averageDamage < (fakeDamageAttribtures.damage * 1.1)).to.be.equal(true);
          expect(averageDamage > (fakeDamageAttribtures.damage * 0.9)).to.be.equal(true);
        });
      }
    });
  });
});

