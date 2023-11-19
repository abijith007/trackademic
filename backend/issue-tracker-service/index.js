const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
const { authenticateJWT } = require('./middleware/authenticateJWT');

require('dotenv').config({ path: envPath });
const issuesRouter = express.Router();
const app = express();
const PORT = 4002;

const { getIssues, getIssueById, getIssuesByFilter, createIssue, updateIssue} = require('./controllers/IssuesController');

app.use(bodyParser.json());
app.use(cors({origin:process.env.REACT_SERVICE, credentials: true}));
app.use(cookieParser())



// Routes
app.use('/', authenticateJWT, issuesRouter);
issuesRouter.get('/issues', getIssues);
issuesRouter.get('/issueByID', getIssueById);
issuesRouter.get('/issuesByFilter', getIssuesByFilter);
issuesRouter.post('/issue', createIssue);
issuesRouter.put('/issue', updateIssue);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
