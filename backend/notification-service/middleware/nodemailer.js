const nodemailer = require('nodemailer');

console.log(process.env.GMAIL_USER);
console.log(process.env.GMAIL_PASSWORD);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
  }
});

module.exports = {transporter};