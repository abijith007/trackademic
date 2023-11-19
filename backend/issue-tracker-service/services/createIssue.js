const { Issues } = require('../ORM/models/models');

module.exports = createIssueService = async () => {
  await Issues.create(issueDetails);
}