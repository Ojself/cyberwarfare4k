import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true,
});

const errHandler = (err) => {
  console.error("errHandler: ", err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data;
  }
  throw err;
};

export default {
  service: service,

  getRedirectInfo() {
    return service
      .get("/user-setup-status")
      .then((res) => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then((res) => {
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
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  getUser() {
    return service
      .get("/profile")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getOpponent(opponentId) {
    return service
      .get(`/opponents/${opponentId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },
  upgradeStats(statPoint) {
    return service
      .post("/upgradeStats", { statPoint })
      .then((res) => res.data)
      .catch(errHandler);
  },

  changeWeapon(weapon) {
    return service
      .post("/changeWeapon", { weapon })
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAllLadderUsers() {
    return service
      .get("/ladder")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAllItems() {
    return service
      .get("/marketplace")
      .then((res) => res.data)
      .catch(errHandler);
  },

  // FUNERAL
  // FUNERAL

  getFunerals() {
    return service
      .get("/funeral")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getFuneral(id) {
    return service
      .get(`/funeral/${id}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  postFuneralComment(id, comment, flower) {
    return service
      .post(`/funeral${id}`, { comment, flower })
      .then((res) => res.data)
      .catch(errHandler);
  },

  // HACK
  // HACK

  pettyHack() {
    return service
      .post("/hack/pettyCrime")
      .then((res) => res.data)
      .catch(errHandler);
  },

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

  attackOpponent(opponentId) {
    return service
      .post(`/hack/${opponentId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  fraudOpponent(opponentId) {
    return service
      .post(`/hack/fraud/${opponentId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  // ORG CRIME
  // ORG CRIME

  getOrgCrimes() {
    return service
      .get("/org-crime")
      .then((res) => res.data)
      .catch(errHandler);
  },
  claimOrgCrime(crimeId) {
    return service
      .put("/org-crime", { crimeId })
      .then((res) => res.data)
      .catch(errHandler);
  },
  claimOrgCrimeRole(crimeId, roleName) {
    return service
      .patch("/org-crime", { crimeId, roleName })
      .then((res) => res.data)
      .catch(errHandler);
  },
  commitOrgCrime(crimeId) {
    return service
      .post("/org-crime", { crimeId })
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

  // SERVICE SUPPORT
  // SERVICE SUPPORT

  repairPartial() {
    return service
      .post("/service/partial")
      .then((res) => res.data)
      .catch(errHandler);
  },

  repairFull() {
    return service
      .post("/service/full")
      .then((res) => res.data)
      .catch(errHandler);
  },
  buyBodyguard() {
    return service
      .post("/service/bodyguard")
      .then((res) => res.data)
      .catch(errHandler);
  },

  resetStatPoints() {
    return service
      .post("/service/reset-stat-points")
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
      .get("/city/locals")
      .then((res) => res.data)
      .catch(errHandler);
  },

  // FENCE
  // FENCE

  getStashes() {
    return service
      .get("/stashes")
      .then((res) => res.data)
      .catch(errHandler);
  },

  sellStashes(body) {
    return service
      .post("/stashes/sell", body)
      .then((res) => res.data)
      .catch(errHandler);
  },
  buyStashes(body) {
    return service
      .post("/stashes/buy", body)
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

  // ESPIONAGE
  // ESPIONAGE

  getVaultInformation() {
    return service
      .get("/vault")
      .then((res) => res.data)
      .catch(errHandler);
  },

  depositVault(depositAmount) {
    return service
      .post("/vault/deposit", { depositAmount })
      .then((res) => res.data)
      .catch(errHandler);
  },

  sendSpy(opponentId, bitCoinSpent) {
    return service
      .post("/vault", { opponentId, bitCoinSpent })
      .then((res) => res.data)
      .catch(errHandler);
  },

  cancelSpy(id) {
    return service
      .delete(`/vault/${id}`)
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

  // DATACENTER
  // DATACENTER

  getDataCenters(params = {}) {
    return service
      .get(`/datacenter/`, { params })
      .then((res) => res.data)
      .catch(errHandler);
  },

  purchaseDataCenter(id) {
    return service
      .post("/datacenter/purchase", { id })
      .then((res) => res.data)
      .catch(errHandler);
  },

  attackDataCenter(id) {
    return service
      .post("/datacenter/attack", { id })
      .then((res) => res.data)
      .catch(errHandler);
  },

  healDataCenter(id) {
    return service
      .patch(`/datacenter/${id}`)
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
      .post("/marketplace", body)
      .then((res) => res.data)
      .catch(errHandler);
  },

  //COMMUNICATIONS
  //COMMUNICATIONS

  getNotifications() {
    return service
      .get(`/communication/notifications`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  getMessages() {
    return service
      .get(`/communication/messages`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  sendMessage(body) {
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
      .get("/opponents")
      .then((res) => res.data)
      .catch(errHandler);
  },
  // BetaForum
  // BetaForum

  getBetaForum(query) {
    return service
      .get(`/beta-forum/?alliance=${query}`)
      .then((res) => res.data)
      .catch(errHandler);
  },
  postBetaComment(comment, forumType) {
    return service
      .post(`/beta-forum`, { comment, forumType })
      .then((res) => res.data)
      .catch(errHandler);
  },

  editBetaComment(comment, commentId) {
    return service
      .patch(`/beta-forum`, { comment, commentId })
      .then((res) => res.data)
      .catch(errHandler);
  },
  likeBetaComment(commentId) {
    return service
      .put(`/beta-forum/${commentId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  deleteComment(commentId) {
    return service
      .delete(`/beta-forum/${commentId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  // FORUM
  // FORUM
  // FORUM
  /* 
   getForums()
    return service
      .get("/forum")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getThreads(forumId) {
    return service
      .get(`/forum/${forumId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },
  getComments(threadId) {
    return service
      .get(`/forum/thread/${threadId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  postComment(comment, threadId) {
    return service
      .post(`/forum/thread/comment`, { comment, threadId })
      .then((res) => res.data)
      .catch(errHandler);
  }, */

  // EARN ENERGY
  postGithubUsername(githubUserName) {
    return service
      .post(`/earnBattery`, { githubUserName })
      .then((res) => res.data)
      .catch(errHandler);
  },

  // ALLIANCE
  // ALLIANCE

  getAlliances() {
    return service
      .get("/alliance")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAlliance(allianceId) {
    return service
      .get(`/alliance/${allianceId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAllianceLadder() {
    return service
      .get("/alliance/ladder")
      .then((res) => res.data)
      .catch(errHandler);
  },

  getAllianceDashBoard() {
    return service
      .get(`/alliance/dashboard`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  leaveAlliance() {
    return service
      .patch(`/alliance/leave`)
      .then((res) => res.data)
      .catch(errHandler);
  },

  createAlliance(allianceId, cityId) {
    return service
      .post("/alliance", { allianceId, cityId })
      .then((res) => res.data)
      .catch(errHandler);
  },

  sendAllianceInvitation(id) {
    return service
      .post("/alliance/invitation", { id })
      .then((res) => res.data)
      .catch(errHandler);
  },
  cancelAllianceInvitation(userId) {
    return service
      .delete(`/alliance/invitation/${userId}`)
      .then((res) => res.data)
      .catch(errHandler);
  },
  answerAllianceInvitation(id, answer) {
    return service
      .patch("/alliance/invitation", { id, answer })
      .then((res) => res.data)
      .catch(errHandler);
  },
  promoteAllianceMember(playerId, newTitle) {
    return service
      .post("/alliance/promote", { playerId, newTitle })
      .then((res) => res.data)
      .catch(errHandler);
  },
};
