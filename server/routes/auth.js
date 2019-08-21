const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const { sendConfirmation } = require('../configs/nodemailer');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// TODO: Change email to email.
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Indicate email and password' });
    return;
  }

  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let confirmationCode = '';
  for (let i = 0; i < 25; i++) {
    confirmationCode +=
      characters[Math.floor(Math.random() * characters.length)];
  }

  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: 'The email already exists' });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const account = {
        password: hashPass
      };
      const name = `unconfirmedplayer${Math.floor(Math.random() * 1000)}`;
      const newUser = new User({ email, account, confirmationCode, name });
      return newUser.save();
    })
    .then(userSaved => {
      // send
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.status(200).json(userSaved);
      });
    })
    .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // first check to see if there's a document with that email
  User.findOne({ email })
    .then(userDoc => {
      // "userDoc" will be empty if the email is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Incorrect email '));
        return;
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Password is wrong'));
        return;
      }
      // sendConfirmation(email, confirmationCode, username)
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined;
        res.json(userDoc);
      });
    })
    .catch(err => next(err));
});

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.json(req.user);
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'You are out!' });
});

// todo, what to render
router.get('/confirm/:confirmCode', (req, res) => {
  User.findOneAndUpdate(
    { confirmationCode: req.params.confirmCode },
    { $set: { status: 'Active' } }
  )
    .then(user => {
      // don't render. do something else. redirect to setup?
      res.render('auth/confirmed', user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/forgot', function(req, res) {
  const email = req.body.email;
  // forgot password
});

router.post('/reset', function(req, res) {
  // reset password
});

module.exports = router;
