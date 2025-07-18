// controllers/authController.js

const { findUser } = require('../services/userService');
const { generateToken } = require('../utils/token');

const login = (req, res) => {
  const { username, password } = req.body;

  const user = findUser(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = generateToken(user);

  res.json({ token });
};

module.exports = { login };