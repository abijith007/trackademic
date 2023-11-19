const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authenticateJWT } = require('./middleware/authenticateJWT');
const { userLogin, adminLogin } = require('./controllers/loginController');
const { userSignup, adminSignup } = require('./controllers/signupController');

const app = express();
const PORT = 4001;
const userReducer = express.Router();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser())
app.use('/', userRouter);

// Routes
app.post('/signup', userSignup);
app.post('/login', userLogin);

app.post('/admin/signup', authenticateJWT, adminSignup);
app.post('/admin/login', authenticateJWT, adminLogin);

app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
