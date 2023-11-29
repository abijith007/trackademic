const { Issues } = require('../ORM/models/models');

module.exports = createIssueService = async (issueDetails) => {
  // console.log(data);
  await Issues.create({
    title: issueDetails.title,
    description: issueDetails.description,
    status: issueDetails.status,
    createdBy: issueDetails.createdBy,    
    assignee: issueDetails.assignee
  });
}