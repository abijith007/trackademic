const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { authenticateJWT } = require('./middleware/authenticateJWT');
const notify = require('./controllers/notificationController');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });


const app = express();

app.use(bodyParser.json());
app.use(cors({origin: process.env.REACT_SERVICE, credentials: true}));
app.use(cookieParser())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

app.use('/', authenticateJWT, notificationRouter);
notificationRouter.post('/notify', notify);

const PORT = 4003;
notificationRouter.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
