const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  console.log('JwtSecret:', JWT_SECRET); // Log the token for debugging

  jwt.verify(token, JWT_SECRET, (err, decoded) => { // Replace 'your-secret-key' with a strong secret
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
