const productService = require('../services/productService');
// const { sequelize } = require('../models/index');

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      data: product,
      message: 'Product created successfully',
      status: 201,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: 'Error creating product',
      status: 400,
      error: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {

    const user = req.user;

    console.log('user ===', user);
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit; // Calculate offset for pagination
    const limitValue = parseInt(limit, 10);
    const { products, total, totalPages } = await productService.getAllProducts(offset, limitValue);

    /*

    const currencyData = await sequelize.query('SELECT * FROM currency', {
      type: sequelize.QueryTypes.SELECT,
    });
    console.log('currencyData', currencyData);

    */

    res.json({
      data: {
        list: products,
        pagination: {
          page: parseInt(page, 10),
          limit: limitValue,
          total,
          totalPages,
        }
      },
      message: products.length === 0 ? 'No products found' : 'OK',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      data: null,
      message: 'Error retrieving products',
      status: 500,
      error: err.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({
      data: product,
      message: 'Product retrieved successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: 'Error retrieving product',
      status: 500,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({
      data: product,
      message: 'Product updated successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: 'Error updating product',
      status: 400,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({
      message: 'Not found',
      status: 404,
      error: {},
    });
    res.json({
      message: 'Product deleted successfully',
      status: 200,
      error: null,
    });

  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: 'Error deleting product',
      status: 400,
    });
  }
};

const getProductByCode = async (req, res) => {
  try {
    const product = await productService.getProductByCode(req.params.code);
    if (!product) res.status(404).json({
      data: null,
      message: 'Not found',
      status: 404,
      error: {},
    });
    res.json({
      data: product,
      message: 'Product retrieved successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      error: err.message,
      message: 'Error retrieving product',
      status: 400,
    });
  }
};

const getProductByName = async (req, res) => {
  try {
    const product = await productService.getProductByName(req.params.name);
    if (!product) res.status(404).json({
      data: null,
      message: 'Not found',
      status: 404,
      error: {},
    });
    res.json({
      data: product,
      message: 'Product retrieved successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      error: err.message,
      message: 'Error retrieving product',
      status: 400,
    });
  }
};


const showProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({
      data: product,
      message: 'Product retrieved successfully',
      status: 200,
      error: null,
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      error: err.message,
      message: 'Error retrieving product',
      status: 500,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCode,
  getProductByName,
  showProduct,
};
