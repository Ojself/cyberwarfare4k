import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

const errHandler = (err) => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  // This method returns the user from the localStorage
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  getRedirectInfo() {
    return service
      .get("/user-setup-status")
      .then((res) => {
        return res.data;
      })
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then((res) => {
        console.log(res.data, "res data ");
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  createUser(body) {
    return service
      .post("/createUser", body)
      .then((res) => {
        console.log(res, "res");
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  upgradeStats(statPoint) {
    return service
      .post("/upgradeStats", { statPoint })
      .then((res) => res.data)
      .catch(errHandler);
  },

  getUser() {
    return service
      .get("/profile")
      .then((res) => res.data)
      .catch(errHandler);
  },

  /* getNavUser() {
    return service
      .get("/user")
      .then((res) => res.data)
      .catch(errHandler);
  }, */

  /*   getOpponent(opponentId) {
    return service
      .get(`/opponent/${opponentId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },
 */
  getAllLadderUsers() {
    return service
      .get("/ladder")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAllAlliances() {
    return service
      .get("/alliance/ladder")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAllItems() {
    return service
      .get("/marketplace")
      .then((res) => res.data)
      .catch(errHandler);
  },

  /* ATTACK */

  pettyHack() {
    return service
      .post("/hack/pettyCrime")
      .then((res) => res.data)
      .catch(errHandler);
  },

  /* CRIMES */

  getCrimes() {
    return service
      .get("/hack/crimes")
      .then((res) => res.data)
      .catch(errHandler);
  },

  commitCrimes(crimeId) {
    return service
      .post("/hack/crimes", { crimeId })
      .then((res) => res.data)
      .catch(errHandler);
  },

  // CRYPTOCURRENCY
  // CRYPTOCURRENCY
  getCrypto() {
    return service
      .get("/currency/")
      .then((res) => res.data)
      .catch(errHandler);
  },

  buyCrypto(body) {
    return service
      .post("/currency/buy", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  sellCrypto(body) {
    return service
      .post("/currency/sell", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  // REPAIR
  repairPartial() {
    return service
      .post("/repair/partial")
      .then((res) => res.data)
      .catch(errHandler);
  },

  repairFull() {
    return service
      .post("/repair/full")
      .then((res) => res.data)
      .catch(errHandler);
  },

  // VPN
  // VPN
  getCities() {
    return service
      .get("/city")
      .then((res) => res.data)
      .catch(errHandler);
  },

  changeCity(body) {
    return service
      .post("/city", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  getLocals() {
    return service
      .get("/city/local")
      .then((res) => res.data)
      .catch(errHandler);
  },

  // WANTED
  // WANTED

  getWantedUsers() {
    return service
      .get("/wanted/")
      .then((res) => res.data)
      .catch(errHandler);
  },

  addBounty(body) {
    return service
      .post("/wanted/add-bounty", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  // LEDGER
  // LEDGER

  getLedgerUsers() {
    return service
      .get("/ledger/")
      .then((res) => res.data)
      .catch(errHandler);
  },

  transferBitCoins(body) {
    return service
      .post(`/ledger/transfer/${body.receiverId}`, body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  depositBitcoin(body) {
    return service
      .post(`/ledger/deposit/`, body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  withdrawBitcoin(body) {
    return service
      .post(`/ledger/withdraw/`, body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  getDataCenters() {
    return service
      .get("/datacenter/")
      .then((res) => res.data)
      .catch(errHandler);
  },

  purchaseDataCenter(body) {
    return service
      .post("/datacenter/purchase", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  attackDataCenter(body) {
    return service
      .post("/datacenter/attack", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  // MARKETPLACE
  // MARKETPLACE

  getMarketPlaceItems() {
    return service
      .get("/marketplace")
      .then((res) => res.data)
      .catch(errHandler);
  },

  purchaseMarketPlaceItem(body) {
    return service
      .post("/marketplace/buy", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  //COMMUNICATIONS
  //COMMUNICATIONS

  readAllCommunication(communication) {
    return service
      .patch(`/communication/`, { communication })
      .then((res) => res.data)
      .catch(errHandler);
  },

  sendMessage(body) {
    console.log(body, "body");
    return service
      .post(`/communication/`, body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  //MICS
  //MICS
  // get all users. only name and _id
  getHackerNames() {
    return service
      .get("/opponent")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getForums() {
    return service
      .get("./forum")
      .then((res) => res.data)
      .catch(errHandler);
  },
};
