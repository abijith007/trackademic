const signupUser = require("../services/userSignup");

async function userSignup(req, res) {
  await signupUser(req, res);
}

async function adminSignup(req, res) {
  //Todo
}

module.exports = { userSignup, adminSignup};