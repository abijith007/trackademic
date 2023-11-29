const Users = require("../ORM/models/Users");

function getUsersService() {
  return Users.findAll();
}

module.exports = getUsersService;