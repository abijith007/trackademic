const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });

const { authenticateJWT } = require('./middleware/authenticateJWT');
const { loginUser } = require('./controllers/loginController');
const { signupUser } = require('./controllers/signupController');
const userRouter = express.Router();

const app = express();
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors({origin: process.env.REACT_SERVICE, credentials: true}));
app.use(cookieParser())

app.use('/', userRouter);
// Routes
userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);
userRouter.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
