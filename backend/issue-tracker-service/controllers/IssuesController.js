const getIssueByIDService = require('../services/getIssueByID.js');
const getIssuesService = require('../services/getIssues.js');
const getIssuesByFilterService = require('../services/getIssuesByFilter.js');
const updateIssueService = require('../services/updateIssue.js');
const createIssueService = require('../services/createIssue.js');
const getDashboardService = require('../services/getDashboard.js');


async function getIssues(req, res) {
  const response = await getIssuesService();
  res.send(response);
}

async function getIssueById(req, res) {
  await getIssueByIDService(req.query);
}
async function getIssuesByFilter(req, res) {
  await getIssuesByFilterService(req.query);
}

async function updateIssue(req, res) {
  console.log(req.body, req.file)  
  await updateIssueService(req.body, req.file);
  res.send({message:"Success"})
}

async function createIssue(req, res) {
  console.log(req)  
  await createIssueService(req.body, req.body.file);
  res.send({message:"Success"})
}

async function getDashboard(req, res) {
  const response = await getDashboardService();
  res.send(response);
}

module.exports = {getIssues, getIssueById, getIssuesByFilter, createIssue, updateIssue, getDashboard};