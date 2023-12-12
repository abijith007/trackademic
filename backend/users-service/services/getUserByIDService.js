const Users = require("../ORM/models/Users");

function getUserByIDService(req,res) {
  return Users.findByPk(req.query.userID);
}

module.exports = getUserByIDService;