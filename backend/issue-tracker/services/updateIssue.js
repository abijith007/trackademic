const {Issues} = require('../ORM/models/models');
module.exports = updateIssueService = async (issueDetails) =>{
  await Issues.update(issueDetails);
}