const statusUpdate = require("../services/statusUpdate");
const issueCreated = require("../services/issueCreated");
const issueModified = require("../services/issueModified");

async function notify(req,res){
  type = req.body.type;
  switch(type){
    case 'status-update': statusUpdate(req,res); break;
    case 'issue-created': issueCreated(req,res); break;
    case 'issue-modified': issueModified(req,res); break;
  }
}

module.exports = notify;