const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../constant');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
  return token;
};

module.exports = {
  login,
};
