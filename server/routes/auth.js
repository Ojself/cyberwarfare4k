const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../models/User');

const cityIds = [
  '5fae62409cbf7d270f23470b',
  '5fae62409cbf7d270f23470c',
  '5fae62409cbf7d270f23470d',
  '5fae62409cbf7d270f23470e',
  '5fae62409cbf7d270f23470f'];

// const { sendConfirmation } = require('../configs/nodemailer');
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Indicate email and password' });
    return;
  }

  // const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // const confirmationCode = Array.from({ length: 25 }, ((_) => characters[Math.floor(Math.random() * characters.length)])).join('');

  User.findOne({ 'account.email': email })
    .then((userDoc) => {
      if (userDoc !== null) {
        res.status(409).json({ message: 'The email already exists' });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const { ip } = req;
      const account = {
        email,
        password: hashPass,
        ip: [ip],
      };
      const name = `unconfirmedplayer${Date.now()}`;
      const playerStats = {
        city: cityIds[Math.floor(Math.random() * cityIds.length)],
        gracePeriod: Date.now() + (1000 * 60 * 60 * 24 * 4),
      };

      const newUser = new User({
        account,
        name,
        playerStats,
      });

      return newUser.save();
    }).then((userSaved) => {
      req.logIn(userSaved, () => {
        userSaved.account.password = undefined;
        res.status(200).json(userSaved);
      });
    })
    .catch((err) => next(err));
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  // first check to see if there's a document with that email
  let userDoc;
  try {
    userDoc = await User.findOne({ 'account.email': email }).lean();
    if (!userDoc) {
      return res.status(403).json({
        success: false,
        message: 'Password or email is wrong',
      });
    }
    if (!bcrypt.compareSync(password, userDoc.account.password)) {
      return res.status(403).json({
        success: false,
        message: 'Password or email is wrong',
      });
    }
    req.logIn(userDoc, () => {
      userDoc.account.password = null;
      userDoc.account.ip = null;

      res.json(userDoc);
    });
  } catch (err) {
    next(err);
  }
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

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

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
    { $set: { 'account.confirmed': true } },
  )
    .then((user) => {
      res.status(200).json({
        message: 'success',
      });
    })
    .catch((err) => console.error(err));
});

/* router.post('/forgot', (req, res) => {
   const { email } = req.body;
   forgot password
});

router.post('/reset', (req, res) => {
   reset password
});
 */
module.exports = router;
