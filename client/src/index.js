import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
//import './hacker.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
// registerServiceWorker();
