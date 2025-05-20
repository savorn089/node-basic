const authService = require('../services/authService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  login,
};
