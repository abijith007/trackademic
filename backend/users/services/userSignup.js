const bcrypt = require("bcrypt");
const { Users, Credentials } = require("../ORM/models/models");
const sequelize = require("../ORM/sequelize");
const { saltRounds } = require('../controllers/signupController');


async function signupUser(req, res) {
  const userDetails = {
    email: req.body.userDetails.email,
    firstName: req.body.userDetails.firstName,
    lastName: req.body.userDetails.lastName,
    password: req.body.userDetails.password,
  };

  try {
    const hashedPassword = await bcrypt.hash(userDetails.password, saltRounds);
    console.log(sequelize);
    const transaction = await sequelize.transaction();

    try {
      await Credentials.create({
        email: userDetails.email,
        password: hashedPassword
      }, { transaction });

      await Users.create({
        email: userDetails.email,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName
      }, { transaction });
      await transaction.commit();

      return res.status(201).json({ message: 'User registered' });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(400).json({ message: "Registration failed" });
  }
}

module.exports = signupUser;