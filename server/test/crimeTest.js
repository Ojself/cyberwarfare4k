const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const should = chai.should();

const app = 'http://localhost:5000/api/';
const User = require('../models/User');
const Crime = require('../models/Crime');

const { createDummyUser, cleanUp } = require('./helper/createDbUser');
const {
  crimeRouteCriterias,
  crimeWin,
  fightCrime,
  chanceCalculator,
  damageCalulator,
  roundWin,
  roundLost
} = require('../middlewares/middleCrime');

const {
  user,
  crime,
  result,
  fakeDamageAttribtures
} = require('./helper/fakeValues/crime');

chai.use(chaiHttp);

describe('Crime', function() {
  describe('Crime helper functions', function() {
    describe('Crime chanceCalculator', function() {
      it(' should return 0.05 if user is trying to do too difficult crime', () => {
        crime.crimeType = 'Technical';
        user.crimeSkill.Technical = 20;
        crime.difficulty = 55;
        const result = chanceCalculator(user, crime);

        crime.crimeType = 'Social Engineering';
        user.crimeSkill['Social Engineering'] = 50;
        crime.difficulty = 150;
        const result2 = chanceCalculator(user, crime);

        expect(typeof result).to.be.equal('number');
        expect(typeof result2).to.be.equal('number');
        expect(result).to.be.equal(0.05);
        expect(result2).to.be.equal(0.05);
      });

      it('Should give approx 30% probability for 20 skillpoints below difficulty', () => {
        crime.crimeType = 'Social Engineering';
        user.crimeSkill['Social Engineering'] = 10;
        crime.difficulty = 30;
        let chanceAverage = 0;
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 260).to.be.equal(true);
        expect(chanceAverage < 340).to.be.equal(true);
      });

      it('Should give approx 40% probability for 10 skillpoints below difficulty', () => {
        crime.crimeType = 'Forensics';
        user.crimeSkill.Forensics = 20;
        crime.difficulty = 30;
        let chanceAverage = 0;
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 360).to.be.equal(true);
        expect(chanceAverage < 440).to.be.equal(true);
      });

      it('Should give 50% probability if skills are alike', () => {
        crime.crimeType = 'Cryptography';
        user.crimeSkill.Cryptography = 50;
        crime.difficulty = 50;
        let chanceAverage = 0;
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }

        expect(chanceAverage > 460).to.be.equal(true);
        expect(chanceAverage < 540).to.be.equal(true);
      });

      it('Should give approx 60% probability for 10 skillpoints ABOVE difficulty', () => {
        crime.crimeType = 'Forensics';
        user.crimeSkill.Forensics = 90;
        crime.difficulty = 80;
        let chanceAverage = 0;
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 560).to.be.equal(true);
        expect(chanceAverage < 640).to.be.equal(true);
      });

      it('Should give approx 70% probability for 20 skillpoints ABOVE difficulty', () => {
        crime.crimeType = 'Forensics';
        user.crimeSkill.Forensics = 100;
        crime.difficulty = 80;
        let chanceAverage = 0;
        for (let i = 0; i < 1000; i++) {
          chanceAverage += chanceCalculator(user, crime);
        }
        expect(chanceAverage > 660).to.be.equal(true);
        expect(chanceAverage < 740).to.be.equal(true);
      });
    });
    describe('Crime damageCalculator', function() {
      it('should return less than 10dmg if BEGINNER stats', () => {
        crime.crimeType = 'Technical';
        user.crimeSkill.Technical = 10;
        user.hackSkill = {
          CPU: 3,
          AntiVirus: 2,
          Encryption: 3
        };
        let averageDamage = 0;
        for (let i = 0; i < 1000; i++) {
          averageDamage += damageCalulator(user, crime);
        }
        expect(averageDamage < 10000).to.be.equal(true);
      });

      damageCalculatorTester(user, crime, fakeDamageAttribtures.beginner);
      damageCalculatorTester(user, crime, fakeDamageAttribtures.novice);
      damageCalculatorTester(user, crime, fakeDamageAttribtures.intermidiate);
      damageCalculatorTester(user, crime, fakeDamageAttribtures.strong);
      damageCalculatorTester(user, crime, fakeDamageAttribtures.veryStrong);

      function damageCalculatorTester(user, crime, fakeDamageAttribtures) {
        it(`should return  ${Math.round(
          fakeDamageAttribtures.damage * 1.2
        )} > && > ${Math.round(fakeDamageAttribtures.damage * 0.8)} dmg if ${
          fakeDamageAttribtures.string
        } stats`, () => {
          crime.crimeType = 'Social Engineering';
          user.crimeSkill['Social Engineering'] =
            fakeDamageAttribtures.crimeSkill;
          user.hackSkill = fakeDamageAttribtures.hackSkill;

          let averageDamage = 0;

          for (let i = 0; i < 1000; i++) {
            averageDamage += damageCalulator(user, crime);
          }
          averageDamage = averageDamage / 1000;
          expect(
            averageDamage < fakeDamageAttribtures.damage * 1.2
          ).to.be.equal(true);
          expect(
            averageDamage > fakeDamageAttribtures.damage * 0.8
          ).to.be.equal(true);
        });
      }
    });
    describe('Crime round outcome', function() {
      const damage = 10;
      it('ROUNDWIN should push correct values into new results', () => {
        const oldHp = result.crimeHp;
        const finalResult = roundWin(result, damage);
        expect(finalResult.roundResult.includes('win')).to.be.equal(true);
        expect(
          finalResult.roundCrimeRemainingHp.includes(oldHp - damage)
        ).to.be.equal(true);
        expect(finalResult.crimeHp < oldHp).to.be.equal(true);
      });
      it('ROUNDWIN should push correct values into existing results', () => {
        result.roundResult = ['win', 'lost', 'win', 'lost'];
        result.roundCrimeRemainingHp = [90, 80, 65, 33];
        result.crimeHp = 33;
        const finalResult = roundWin(result, damage);
        expect(
          finalResult.roundResult[finalResult.roundResult.length - 1]
        ).to.be.equal('win');
        expect(finalResult.roundResult.length).to.be.equal(5);
        expect(finalResult.roundResult.length).to.be.equal(
          finalResult.roundCrimeRemainingHp.length
        );
        expect(
          finalResult.roundCrimeRemainingHp[
            finalResult.roundCrimeRemainingHp.length - 1
          ]
        ).to.be.equal(23);
      });

      it('ROUNDLOST should push correct values into new results', () => {
        const finalResult = roundLost(result, damage);
        expect(finalResult.roundResult.includes('lost')).to.be.equal(true);
      });

      it('ROUNDLOST should push correct values into existing results', () => {
        result.roundResult = ['win', 'lost', 'win', 'win'];
        result.crimeHp = 33;
        result.roundCrimeRemainingHp = [90, 90, 68, 33];
        const finalResult = roundLost(result);
        expect(
          finalResult.roundResult[finalResult.roundResult.length - 1]
        ).to.be.equal('lost');
        expect(finalResult.roundResult.length).to.be.equal(5);
        expect(finalResult.roundResult.length).to.be.equal(
          finalResult.roundCrimeRemainingHp.length
        );
        expect(
          finalResult.roundCrimeRemainingHp[
            finalResult.roundCrimeRemainingHp.length - 1
          ]
        ).to.be.equal(33);
      });
    });

    describe('crimewin', function() {
      it(`Should return correct type of values with high decider`, () => {
        crime.difficulty = 30;
        crime.crimeType = 'Forensics';
        user.playerStats.rank = 0;

        const finalResult = crimeWin(result, crime, user, 1);
        expect(finalResult.won).to.be.equal(true);
        expect(typeof finalResult.playerGains.exp).to.be.equal('number');
        expect(typeof finalResult.playerGains.bitCoins).to.be.equal('number');
      });

      it(`Should return correct type of values with low decider`, () => {
        crime.difficulty = 70;
        crime.crimeType = 'Social Engineering';
        user.playerStats.rank = 2;

        const finalResult = crimeWin(result, crime, user, 0.001);
        expect(finalResult.won).to.be.equal(true);
        expect(typeof finalResult.playerGains.exp).to.be.equal('number');
        expect(typeof finalResult.playerGains.bitCoins).to.be.equal('number');
      });
    });

    describe('Crime win looping', function() {
      const crimeAttributes = {
        crimeDiff: [30, 50, 70, 90, 150],
        playerRank: [0, 2, 4, 6, 8],
        crimeTypes: [
          'Technical',
          'Social Engineering',
          'Forensics',
          'Cryptography'
        ]
      };

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          runCrimeTest(i, j, crimeAttributes);
        }
      }

      function runCrimeTest(i, j, crimeAttributes) {
        it(`Crimewin with i:${i},j:${j}. Should return correct values`, () => {
          let bitCoins = 0;
          let exp = 0;
          let skillGained = 0;
          let statGained = 0;

          let finalResult;

          crime.difficulty = crimeAttributes.crimeDiff[i];
          user.playerStats.rank = crimeAttributes.playerRank[j];
          crime.crimeType =
            crimeAttributes.crimeTypes[Math.floor(Math.random() * 4)];

          const forLimit = 1000;
          for (let k = 0; k < forLimit; k++) {
            finalResult = crimeWin(result, crime, user, Math.random());
            exp += finalResult.playerGains.exp;
            bitCoins += finalResult.playerGains.bitCoins;

            if (finalResult.playerGains.skillGained) {
              skillGained++;
            }
            if (finalResult.playerGains.statGained === true) {
              statGained++;
            }
          }

          expect(bitCoins / forLimit).to.be.above(
            1000 * crime.difficulty * 0.4,
            `failed at i:${i},j:${j} ${bitCoins / forLimit}`
          );
          expect(bitCoins / forLimit).to.be.below(
            1000 * crime.difficulty * 0.6,
            `failed at i:${i},j:${j} ${bitCoins / forLimit}`
          );

          expect(exp / forLimit).to.be.above(300 * crime.difficulty * 0.4);
          expect(exp / forLimit).to.be.below(300 * crime.difficulty * 0.6);

          expect(skillGained / forLimit).to.be.below(0.8); // not satisfying. Should specify todo
          expect(statGained / forLimit).to.be.below(0.8);
        });
      }
    });

    describe('API hack/crimes', async function() {
      it(`GET crimes`, done => {
        chai
          .request(app)
          .get('hack/crimes')
          .end(async (err, res) => {
            res.should.have.status(200);
            if (res.body.crimes.length > 0) {
              res.body.crimes.every(el => el.available).should.equal(true);
            }
            done();
          });
      });
    });
  });
});
