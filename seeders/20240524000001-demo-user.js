'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    const users = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
      },
      {
        username: 'admin1',
        email: 'admin1@gmail.com',
        password: hashedPassword,
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
