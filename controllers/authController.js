const authService = require('../services/authService');

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

module.exports = {
  login,
};
