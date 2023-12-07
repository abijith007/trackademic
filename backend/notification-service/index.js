const express = require('express');
const path = require('path');
const { authenticateJWT } = require('./middleware/authenticateJWT');
const notify = require('./controllers/notificationController');
const envPath = path.join(__dirname, '../', '.env');
require('dotenv').config({ path: envPath });
const cors = require('cors');

const app = express();
const notificationRouter = express.Router();

app.use(express.json());
app.use(cors());
app.use('/', notificationRouter);

notificationRouter.post('/notify', notify);



const PORT = 4004;
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
