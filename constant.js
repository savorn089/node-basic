
require('dotenv').config();

const getEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`The ${key} environment variable is required`);
  }
  return value;
};

const JWT_SECRET = getEnv('JWT_SECRET') || 'your-secret-key';
const PORT = getEnv('PORT') || 3000;
const TOKEN_EXPIRATION = getEnv('TOKEN_EXPIRATION') || '1h';


module.exports = {
  JWT_SECRET,
  PORT,
  TOKEN_EXPIRATION,
};
