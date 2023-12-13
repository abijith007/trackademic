const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Credentials, Users } = require("../ORM/models/models");
const SECRET_KEY = process.env.SECRET_KEY;

async function loginUser(req, res) {
    const { email, password } = req.body;
    console.log("LOGIN")
    try {
        let user = await Credentials.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' }); // Use generic error message
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid email or password' }); // Use generic error message
        }

        const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '12h' });
        let userDetails = await Users.findOne({ where: { userID: user.userID } })
        // Set the token in the cookie
        res.cookie('token', token, {
            httpOnly: true, // The cookie is not accessible via client-side script
            secure: false, // The cookie is sent over HTTPS only in production
            sameSite: 'None', // The cookie is not sent with cross-site requests
            maxAge: 12 * 60 * 60 * 1000 // 12 hours in milliseconds
        });        
        // Send response
        const userFromDB = await Users.findByPk(userDetails.userID);
        res.json({ message: 'Logged in successfully', userDetails: userFromDB });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = loginUser;
