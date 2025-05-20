const User = require('../models/user');
const bcrypt = require('bcrypt');

const getAllUsers = async (offset, limit) => {
  const { count, rows } = await User.findAndCountAll({
    offset,
    limit,
    order: [['id', 'DESC']],
    attributes: ['id', 'name', 'email', 'updated_at', 'created_at'],
  });
  return {
    users: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
  };
};

const createUser = async (data) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const user = await User.create({ ...data, password: hashedPassword });
  return user;
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUser = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  return await user.update(data);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

const getUserByName = async (name) => {
  return await User.findOne({ where: { name } });
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByName
};
