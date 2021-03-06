/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const nocache = require('nocache');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
});

const app = express();
require('./configs/database');

/* app.use('/api/', apiLimiter); */
app.use(nocache());

app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, origin && origin.startsWith('http://localhost:'));
    },
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);

// Set the public folder to "~/client/build/"
app.use(express.static(path.join(__dirname, '../client/build')));

// Enable authentication using session + passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);
require('./passport')(app);

app.use('/api', require('./routes/index'));
app.use('/api', require('./routes/auth'));
app.use('/api/alliance', require('./routes/alliance'));
app.use('/api/beta-forum', require('./routes/betaForum'));
app.use('/api/communication', require('./routes/communication'));
app.use('/api/city', require('./routes/city'));
app.use('/api/currency', require('./routes/currency'));
app.use('/api/datacenter', require('./routes/datacenter'));
app.use('/api/earnBattery', require('./routes/earnBattery'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/funeral', require('./routes/funeral'));
app.use('/api/hack', require('./routes/hack'));
app.use('/api/ledger', require('./routes/ledger'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/org-crime', require('./routes/orgCrime'));
app.use('/api/service', require('./routes/service'));
app.use('/api/stashes', require('./routes/stashes'));
app.use('/api/tokens', require('./routes/tokens'));
app.use('/api/vault', require('./routes/vault'));
app.use('/api/wanted', require('./routes/wanted'));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// For any other routes, redirect to the index.html file of React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handler
app.use((err, req, res) => {
  console.error('----- An error happened -----');
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);

    // A limited amount of information sent in production
    if (process.env.NODE_ENV === 'production') res.json(err);
    else {
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))),
      );
    }
  }
});

module.exports = app;
