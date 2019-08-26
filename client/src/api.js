import axios from 'axios';

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:5000/api',
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error('API response', err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  // This method is synchronous and returns true or false
  // To know if the user is connected, we just check if we have a value for localStorage.getItem('user')
  isLoggedIn() {
    return localStorage.getItem('user') != null;
  },

  // This method returns the user from the localStorage
  // Be careful, the value is the one when the user logged in for the last time
  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  // This method signs up and logs in the user
  signup(userInfo) {
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(email, password) {
    return service
      .post('/login', {
        email,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem('user');
    return service.get('/logout');
  },

  createUser(body) {
    return service
      .post('/createUser', body)
      .then(res => res.data)
      .catch(errHandler);
  },

  upgradeStats(statPoint) {
    return service
      .post('/upgradeStats', { statPoint })
      .then(res => res.data)
      .catch(errHandler);
  },

  getUser() {
    return service
      .get('/my-profile')
      .then(res => res.data)
      .catch(errHandler);
  },

  getAllUsers() {
    return service
      .get('/ladder')
      .then(res => res.data)
      .catch(errHandler);
  },

  getAllItems() {
    return service
      .get('/marketplace')
      .then(res => res.data)
      .catch(errHandler);
  },

  /* ATTACK */

  pettyHack() {
    return service
      .post('/hack/pettyCrime')
      .then(res => res.data)
      .catch(errHandler);
  },

  /* CRIMES */

  getCrimes() {
    return service
      .get('/hack/crimes')
      .then(res => res.data)
      .catch(errHandler);
  },

  commitCrimes(crimeId) {
    return service
      .post('/hack/crimes', { crimeId })
      .then(res => res.data)
      .catch(errHandler);
  },

  // CRYPTOCURRENCY
  // CRYPTOCURRENCY
  getCrypto() {
    return service
      .get('/currency/')
      .then(res => res.data)
      .catch(errHandler);
  },

  buyCrypto(body) {
    return service
      .post('/currency/buy', body)
      .then(res => res.data)
      .catch(errHandler);
  },

  sellCrypto(body) {
    return service
      .post('/currency/sell', body)
      .then(res => res.data)
      .catch(errHandler);
  },

  getNavUser() {
    return service
      .get('/get-nav-user')
      .then(res => res.data)
      .catch(errHandler);
  },

  // REPAIR
  repairPartial() {
    return service
      .post('/repair/partial')
      .then(res => res.data)
      .catch(errHandler);
  },

  repairFull() {
    return service
      .post('/repair/full')
      .then(res => res.data)
      .catch(errHandler);
  },

  // VPN CITIES
  getCities() {
    return service
      .get('/city')
      .then(res => res.data)
      .catch(errHandler);
  },

  changeCity(body) {
    return service
      .post('/city', body)
      .then(res => res.data)
      .catch(errHandler);
  }
};
