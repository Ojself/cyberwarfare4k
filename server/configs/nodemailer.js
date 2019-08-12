require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    /* TODO add credentials to .env */
    user: process.env.SGUSER,
    pass: process.env.SGPASS
  }
});
// todo, write a nice email
exports.sendConfirmation = (email, confirmationCode) => {
  return transporter.sendMail({
    from: 'Hacker',
    to: email,
    subject: 'Please confirm your account',
    html: `
    <h1>NEW USER</h1>
    <p>Confrim your account </p>
    <p>${confirmationCode}</p>
    <a href="http://localhost:5000/auth/confirm/${confirmationCode}">Follow this link to finish confirmation process</a>
    `
    //TODO edit href.
  });
};
