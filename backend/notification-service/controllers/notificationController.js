const statusUpdate = require("../services/statusUpdate");

async function notify(req,res){
  type = req.body.type;
  switch(type){
    case 'status-update': statusUpdate(req,res); break;
    case 'issue-created': issueCreated(req,res); break;
    case 'issue-modified': issueModified(req,res); break;
  }
}

module.exports = notify;