const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { authenticateJWT } = require('./middleware/authenticateJWT');
const envPath = path.join(__dirname, '../', '.env');
require('dotenv').config({ path: envPath });
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const issuesRouter = express.Router();
const app = express();
const PORT = 4002;

const { getIssues, getIssueById, getIssuesByFilter, createIssue, updateIssue, getDashboard} = require('./controllers/IssuesController');

app.use(bodyParser.json());
app.use(cors({origin:process.env.REACT_SERVICE, credentials: true}));
app.use(cookieParser())

// Routes
app.use('/issues', issuesRouter);
issuesRouter.get('/getIssues', getIssues);
issuesRouter.get('/issueByID', getIssueById);
issuesRouter.get('/issuesByFilter', getIssuesByFilter);
issuesRouter.post('/create', createIssue);
issuesRouter.post('/update', updateIssue);
issuesRouter.get('/dashboard', getDashboard)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
