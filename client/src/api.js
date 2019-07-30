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
    console.log('signup', userInfo);
    return service
      .post('/signup', userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post('/login', {
        username,
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

  getSecret() {
    return service
      .get('/secret')
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
    console.log('hello from api, getAllUsers()');
    return service
      .get('/ladder')
      .then(res => res.data)
      .catch(errHandler);
  },

  getAllItems() {
    console.log('hello from api, getAllItems()');
    return service
      .get('/marketplace')
      .then(res => res.data)
      .catch(errHandler);
  }
};
