const { Issues } = require('../ORM/models/models');
const { Op, fn, col, literal } = require('sequelize');

async function getDashboardService(userID) {
  const openIssues = (await Issues.findAll({where: {status: 'Open'}})).length;
  const closedIssues = (await Issues.findAll({where: {status: 'Closed'}})).length;
  const inProgressIssues = (await Issues.findAll({where: {status: 'In Progress'}})).length;
  const blockedIssues = (await Issues.findAll({where: {status: 'Blocked'}})).length;
  const resolvedIssues = (await Issues.findAll({where: {status: 'Resolved'}})).length;

  const issueStatusByMonth = await Issues.findAll({
    attributes: [
      [fn('date_format', col('createdAt'), '%Y-%m'), 'month'],
      'status',
      [fn('COUNT', col('issueID')), 'issueCount']
    ],
    group: [literal('date_format(createdAt, "%Y-%m")'), 'status'],
    order: [literal('date_format(createdAt, "%Y-%m")')],
  });

  let formattedData = new Map();

  issueStatusByMonth.forEach(issue => {
    if (!formattedData.has(issue.dataValues.month)) {
      formattedData.set(issue.dataValues.month, {
        'Open': 0,
        'Blocked': 0,
        'Resolved': 0,
        'In Progress': 0,
        'Closed': 0,
      });
    }
    formattedData.get(issue.dataValues.month)[issue.dataValues.status] = parseInt(issue.dataValues.issueCount, 10);
  });

  const lineData = [
    ["Year/Month", "Open", "In Progress","Blocked", "Resolved","Closed"]
  ];

  for (let [month, counts] of formattedData) {
    lineData.push([month, counts['Open'], counts['In Progress'], counts['Blocked'], counts['Resolved'],counts['Closed']]);
  }


  return {
    openIssues,
    closedIssues,
    inProgressIssues,
    blockedIssues,
    resolvedIssues,
    lineData
  }
}

module.exports = getDashboardService;