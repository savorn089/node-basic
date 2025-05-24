const authService = require('../services/authService');
const AccessToken  = require('../models/accessToken');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) {
      return res.status(401).json({
        message: 'Invalid email or password',
        status: 401,
        error: 'Invalid email or password',
       });
    }

    // Set the token in a cookie
    res.cookie('accessToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Store the token in the database
    const decoded = jwt.decode(token);
    const user = await User.findOne({ where: { email: decoded.email } });
    await AccessToken.create({ token, userId: user.id });

    res.json({
      data: { token },
      message: 'Login successful',
      status: 200,
      error: null,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.status(200).json({ message: 'Logout successful' }); // Already logged out
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    await AccessToken.destroy({ where: { token, userId: decoded.id } });

    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  login,
  logout,
};
