const User = require('../models/user');
const bcrypt = require('bcrypt');

const fields = ['id', 'name', 'email', 'updated_at', 'created_at'];
const getAllUsers = async (offset, limit) => {
  const { count, rows } = await User.findAndCountAll({
    offset,
    limit,
    order: [['id', 'DESC']],
    attributes: fields,
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
  const user = await User.create({ ...data, password: hashedPassword, profilePicture: data.profilePicture });
  return user;
};

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: fields,
  });
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
  return await User.findOne({ where: { email } }, {
    attributes: fields,
  });
};

const getUserByName = async (name) => {
  return await User.findOne({ where: { name } }, {
    attributes: fields,
  });
};

const getUserByToken = async (userId) => {
  return await User.findByPk(userId, {
    attributes: fields,
  });
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  getUserByName,
  getUserByToken,
};
