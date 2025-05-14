const Product = require('../models/product');

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProducts = () => {
  return Product.findAll({
    limit: 10,
    order: [['id', 'DESC']],
    attributes: ['id', 'code', 'name', 'price', 'created_at'],
  });
};

const getProductById = async (id) => {
  return await Product.findByPk(id);
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
