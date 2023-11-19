const { Issues } = require('../ORM/models/models');

module.exports = getIssuesService = async () => {
  return await Issues.findAll();
}