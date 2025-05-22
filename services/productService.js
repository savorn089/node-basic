const Product = require('../models/product');
const { Op } = require('sequelize');

const createProduct = async (data) => {
  return await Product.create(data);
};


const fields = ['id', 'code', 'name', 'price', 'name_price', 'created_at'];

const getAllProducts = async (offset, limit) => {
  const { count, rows } = await Product.findAndCountAll({
    offset,
    limit,
    order: [['id', 'DESC']],
    attributes: fields,
  });
  return {
    products: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
  };
};

const getProductById = async (id) => {
  // return await Product.findByPk(id, {
  //   attributes: fields,
  // });

  return await Product.findOne({
    where: { id },
    attributes: fields,
  });
};

const updateProduct1 = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return await product.update(data);
};

const updateProduct = async (id, data) =>
  Product.findByPk(id).then((product) => {
    if (!product) return null;
    return product.update(data);
  })

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return product;
};

const getProductByCode = async (code) => {
  return await Product.findOne({ where: { code } });
};

const getProductByName = async (name) => {
  return await Product.findOne({ where: { name } });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCode,
  getProductByName,
};
