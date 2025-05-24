const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');
const AccessToken = require('../models/accessToken');
const User = require('../models/user'); // Import the User model

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Get token from Authorization header or cookies
  let token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const accessToken = await AccessToken.findOne({ where: { token, userId: decoded.id } });
    if (!accessToken) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ message: 'Invalid token or user not found' });
  }
};

module.exports = verifyToken;
