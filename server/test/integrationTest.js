const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const User = require('../models/User');
const Crime = require('../models/Crime');

const { createDummyUser, cleanUp } = require('./helper/createDbUser');

chai.use(chaiHttp);

// todo crimes: change attributes of player to test different stuff

// only God knows what's going on here

describe.only('Integration - route testing', async () => {
  const testUsers = {
    alice: {
      user: null,
      attributes: {
        playerStats: { battery: 30, exp: 9999 },
        role: 'testUserDB',
      },
    },
    bob: {
      user: null,
      attributes: {
        hackSkill: {
          CPU: 20,
          AntiVirus: 20,
          Encryption: 20,
        },
        crimeSkill: {
          Technical: 20,
          'Social Engineering': 20,
          Forensics: 20,
          Cryptography: 20,
        },
        role: 'testUserDB',
      },
    },
    chuck: {
      user: null,
      attributes: {
        hackSkill: {
          CPU: 50,
          AntiVirus: 50,
          Encryption: 50,
        },
        crimeSkill: {
          Technical: 50,
          'Social Engineering': 50,
          Forensics: 50,
          Cryptography: 50,
        },
        role: 'testUserDB',
      },
    },
    craig: {
      user: null,
      attributes: {
        hackSkill: {
          CPU: 70,
          AntiVirus: 70,
          Encryption: 70,
        },
        crimeSkill: {
          Technical: 70,
          'Social Engineering': 70,
          Forensics: 70,
          Cryptography: 70,
        },
        role: 'testUserDB',
      },
    },
    eve: {
      user: null,
      attributes: {
        hackSkill: {
          CPU: 90,
          AntiVirus: 90,
          Encryption: 90,
        },
        crimeSkill: {
          Technical: 90,
          'Social Engineering': 90,
          Forensics: 90,
          Cryptography: 90,
        },
        role: 'testUserDB',
      },
    },
    faythe: {
      user: null,
      attributes: {
        hackSkill: {
          CPU: 150,
          AntiVirus: 150,
          Encryption: 150,
        },
        crimeSkill: {
          Technical: 150,
          'Social Engineering': 150,
          Forensics: 150,
          Cryptography: 150,
        },
        role: 'testUserDB',
      },
    },
    mallory: {
      user: null,
      attributes: {},
    },
    sybil: {
      user: null,
      attributes: {},
    },
    trudy: {
      user: null,
      attributes: {},
    },
    gerald: {
      user: null,
      attributes: {},
    },
  };
  before(async () => {
    // PETTY

    // testing pettyCrime
    testUsers.alice.user = await createDummyUser(testUsers.alice.attributes);
    // CRIME

    // testing easiest crime diff30
    testUsers.bob.user = await createDummyUser(testUsers.bob.attributes);

    // testing easiest crime diff30
    testUsers.chuck.user = await createDummyUser(testUsers.chuck.attributes);

    testUsers.craig.user = await createDummyUser(testUsers.craig.attributes);

    testUsers.eve.user = await createDummyUser(testUsers.eve.attributes);

    testUsers.faythe.user = await createDummyUser(testUsers.faythe.attributes);
    console.log(testUsers, 'testusers');
    await makeCrimesAvailable();
  });

  after(async () => {
    // cleanUp()
    await makeCrimesAvailable();
  });

  for (let i = 0; i < 7; i++) {
    it('Should give 200 response if criterias are met and 400 if insufficent resources (eg. battery)', async () => {
      await postChaiRequest('hack/pettyCrime/', {
        userId: testUsers.alice.user._id.toString(),
      }).then((result) => {
        if (i === 6) {
          expect(result).to.have.status(400); // insufficent battery
        } else {
          expect(result).to.have.status(200);
        }
      });
    });
  }

  it('should have levled up and gain new values after commiting 6 pettycrime', async () => {
    const newAlice = await User.findById(testUsers.alice.user._id.toString());
    const crimeSkill = Object.values(newAlice.crimeSkill);
    const {
      battery,
      bitCoins,
      networth,
      rank,
      rankName,
    } = newAlice.playerStats;

    const oldCrimeSkill = Object.values(testUsers.alice.user.crimeSkill);
    const oldBattery = testUsers.alice.user.playerStats.battery;
    const oldBitCoins = testUsers.alice.user.playerStats.bitCoins;
    const oldNetworth = testUsers.alice.user.playerStats.networth;
    const oldRank = testUsers.alice.user.playerStats.rank;
    const oldRankName = testUsers.alice.user.playerStats.rankName;
    const failMessage = 'fails 1% of the time due to randomness';
    expect(crimeSkill > oldCrimeSkill).to.be.equal(true, failMessage);
    expect(battery > oldBattery).to.be.equal(false, failMessage);
    expect(bitCoins > oldBitCoins).to.be.equal(true, failMessage);
    expect(networth > oldNetworth).to.be.equal(true, failMessage);
    expect(rank > oldRank).to.be.equal(true, failMessage);
    expect(rankName !== oldRankName).to.be.equal(true, failMessage);
  });

  it('POST CRIMES 30', async () => {
    const crimes = await Crime.find({ available: true, difficulty: 30 });
    const crimeId = crimes[
      Math.floor(Math.random() * crimes.length)
    ]._id.toString();
    await postChaiRequest('hack/crimes/', {
      userId: testUsers.bob.user._id.toString(),
      crimeId,
    }).then((result) => {
      console.log(result.body.finalResult, 'result crime');
      expect(result).to.have.status(200);
    });
  });

  it('POST CRIMES 50', async () => {
    const crimes = await Crime.find({ available: true, difficulty: 50 });
    const crimeId = crimes[
      Math.floor(Math.random() * crimes.length)
    ]._id.toString();
    await postChaiRequest('hack/crimes/', {
      userId: testUsers.chuck.user._id.toString(),
      crimeId,
    }).then((result) => {
      console.log(result.body.finalResult, 'result crime');
      expect(result).to.have.status(200);
    });
  });

  it('POST CRIMES 70', async () => {
    const crimes = await Crime.find({ available: true, difficulty: 70 });
    const crimeId = crimes[
      Math.floor(Math.random() * crimes.length)
    ]._id.toString();
    await postChaiRequest('hack/crimes/', {
      userId: testUsers.craig.user._id.toString(),
      crimeId,
    }).then((result) => {
      console.log(result.body.finalResult, 'result crime');
      expect(result).to.have.status(200);
    });
  });

  it('POST CRIMES 90', async () => {
    const crimes = await Crime.find({ available: true, difficulty: 90 });
    const crimeId = crimes[
      Math.floor(Math.random() * crimes.length)
    ]._id.toString();
    await postChaiRequest('hack/crimes/', {
      userId: testUsers.eve.user._id.toString(),
      crimeId,
    }).then((result) => {
      console.log(result.body.finalResult, 'result crime');
      expect(result).to.have.status(200);
    });
  });

  it('POST CRIMES 150', async () => {
    const crimes = await Crime.find({ available: true, difficulty: 150 });
    const crimeId = crimes[
      Math.floor(Math.random() * crimes.length)
    ]._id.toString();
    await postChaiRequest('hack/crimes/', {
      userId: testUsers.faythe.user._id.toString(),
      crimeId,
    }).then((result) => {
      console.log(result.body.finalResult, 'result crime');
      expect(result).to.have.status(200);
    });
  });

  async function postChaiRequest(route, body) {
    return chai
      .request('http://localhost:5000/api/')
      .post(route)
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(body)
      .then((res) => res);
  }
});

function makeCrimesAvailable() {
  Crime.find({}).then((crimes) => {
    crimes.map((crime) => {
      crime.available = true;
      crime.save();
    });
  });
}
