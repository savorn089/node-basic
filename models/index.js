const { Sequelize } = require('sequelize');

// Set up Sequelize connection
const sequelize = new Sequelize('postgres', 'root', 'savorn1111', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false, // Disable logging of SQL queries, you can enable this if needed.
  pool: {
    max: 5,         // Max number of connections in pool
    min: 0,         // Min number of connections
    acquire: 30000, // Max time (in ms) to wait before throwing an error
    idle: 10000     // Max time (in ms) to wait before a connection is released
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = { sequelize };
