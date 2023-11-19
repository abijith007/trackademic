const { Issues } = require('../ORM/models/models');

module.exports = getIssueByIDService = async ({issueID}) =>{  
  return await Issues.findByPk(issueID);
}