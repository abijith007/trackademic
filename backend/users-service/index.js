const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });

const { authenticateJWT } = require('./middleware/authenticateJWT');
const { userLogin, adminLogin } = require('./controllers/loginController');
const { userSignup, adminSignup } = require('./controllers/signupController');
const { getUsers } = require('./controllers/userController');

const app = express();
const PORT = 4001;
const userRouter = express.Router();

app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use(cookieParser())
app.use('/users',userRouter);

// Routes
userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.get('/getUsers', getUsers);
userRouter.get('/check')

userRouter.post('/admin/signup', adminSignup);
userRouter.post('/admin/login', adminLogin);

userRouter.get('/protected', (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
