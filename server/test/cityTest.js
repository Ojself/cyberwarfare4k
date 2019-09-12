const assert = require("assert");
const { expect } = require("chai");

const { changeCityRouteCriterias } = require("../middlewares/middleCity");

// todo: write tests..
describe("City Route", function() {
  describe("Change city route criterias", function() {
    it("should return no exist if no user has been defined", function() {
      const user = undefined;
      const result = changeCityRouteCriterias(user);
      expect(result).to.be.equal("User doesn't exist");
    });

    it("should return no exist if no city has been defined", function() {
      const user = {
        name: "testUser",
        playerStats: { bitCoins: 100, battery: 20 }
      };
      const newCity = undefined;
      const result = changeCityRouteCriterias(user, newCity);
      expect(result).to.be.equal("Arrival city doesn't exist");
    });

    it("should return no exist if no batterycost has been defined", function() {
      const user = {
        name: "testUser",
        playerStats: { bitCoins: 100, battery: 20 }
      };
      const newCity = { name: "Miami", price: 10 };
      const oldCity = { name: "Stavanger", price: 15 };
      const batteryCost = undefined;
      const result = changeCityRouteCriterias(user, newCity);
      expect(result).to.be.equal("Batterycost doesn't exist");
    });

    it("should return insufficent battery if the user doesn't have enough battery", function() {
      const user = {
        name: "testUser",
        playerStats: { bitCoins: 100, battery: 5 }
      };
      const newCity = { name: "Miami", price: 10 };
      const oldCity = { name: "Stavanger", price: 15 };
      const batteryCost = 10;
      const result = changeCityRouteCriterias(
        user,
        newCity,
        oldCity,
        batteryCost
      );
      expect(result).to.be.equal("Insufficent battery");
    });

    it("should return insufficient funds if the user doesn't have enough bitcoins", function() {
      const user = {
        name: "testUser",
        playerStats: { bitCoins: 5, battery: 20 }
      };
      const newCity = { name: "Miami", price: 10 };
      const oldCity = { name: "Stavanger", price: 15 };
      const batteryCost = 10;
      const result = changeCityRouteCriterias(
        user,
        newCity,
        oldCity,
        batteryCost
      );
      expect(result).to.be.equal("Insufficient funds");
    });

    it("should return vpn change if the user is trying to change to the same city he's depaturing", function() {
      const user = {
        name: "testUser",
        playerStats: { bitCoins: 100, battery: 20 }
      };
      const newCity = { name: "Miami", price: 10 };
      const oldCity = { name: "Miami", price: 15 };
      const batteryCost = 10;
      const result = changeCityRouteCriterias(
        user,
        newCity,
        oldCity,
        batteryCost
      );
      expect(result).to.be.equal("Your VPN is already set to this city");
    });

    it("Should return null if everythin passes ", function() {
      const user = {
        name: "testUser",
        playerStats: { bitCoins: 100, battery: 20 }
      };
      const newCity = { name: "Miami", price: 10 };
      const oldCity = { name: "Stavanger", price: 15 };
      const batteryCost = 10;
      const result = changeCityRouteCriterias(
        user,
        newCity,
        oldCity,
        batteryCost
      );
      expect(result).to.be.equal(null);
    });
  });
});

/* hackSkill, crimeSkill, currencies,playerStats, playerStats,marketPlaceItems,specialWeapons,fightInformation,allianceRole,stash */

const attributes = {
  hackSkill: {},
  crimeSkill: {},
  currencies: {},
  playerStats: {},
  marketPlaceItems: {},
  specialWeapons: {},
  fightInformation: {},
  allianceRole: "",
  stash: [],
  alliance: ""
};
