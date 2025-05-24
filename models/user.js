const { DataTypes } = require('sequelize');
const { sequelize } = require('./index'); // Assuming you have an index.js for Sequelize configuration
const AccessToken = require('./accessToken'); // Adjust the path as necessary
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other user-related fields as needed
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true, // Or false, depending on your requirements
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;

//User.hasMany(AccessToken, { foreignKey: 'userId', as: 'accessTokens' });
//AccessToken.belongsTo(User, { foreignKey: 'userId', as: 'user' });
