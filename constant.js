
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
const DB_HOST = getEnv('DB_HOST');
const DB_NAME = getEnv('DB_NAME');
const DB_USER = getEnv('DB_USER');
const DB_PASSWORD = getEnv('DB_PASSWORD');
//const DB_PORT = getEnv('DB_PORT') || 5432;


module.exports = {
  JWT_SECRET,
  PORT,
  TOKEN_EXPIRATION,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  //DB_PORT,
};
