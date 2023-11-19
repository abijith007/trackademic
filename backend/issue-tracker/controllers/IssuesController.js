const getIssueByIDService = require('../services/getIssueByID.js');
const getIssuesService = require('../services/getIssues.js');
const getIssuesByFilterService = require('../services/getIssuesByFilter.js');
const updateIssueService = require('../services/updateIssue.js');
const createIssueService = require('../services/createIssue.js');


async function getIssues(req, res) {
  getIssuesService();
}

async function getIssueById(req, res) {
  getIssueByIDService(req.query);
}
async function getIssuesByFilter(req, res) {
  getIssuesByFilterService(req.query);
}

async function updateIssue(req, res) {
  updateIssueService(req.body);
}

async function createIssue(req, res) {
  createIssueService(req.body);
}

module.exports = {getIssues, getIssueById, getIssuesByFilter, createIssue, updateIssue};