const productService = require('../services/productService');

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit; // Calculate offset for pagination
    const limitValue = parseInt(limit, 10);
    const products = await productService.getAllProducts();
    res.json({
      data: products,
      message: 'Products retrieved successfully',
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      status: 500,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProductByCode = async (req, res) => {
  try {
    const product = await productService.getProductByCode(req.params.code);
    if (!product) res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getProductByName = async (req, res) => {
  try {
    const product = await productService.getProductByName(req.params.name);
    if (!product) res.status(404).json({ message: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getProductInactive = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit; // Calculate offset for pagination
    const limitValue = parseInt(limit, 10);
    const products = await productService.getAllProducts();
    res.json({
      data: products,
      message: 'Products retrieved successfully',
      status: 200,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  getProductInactive,
  showProduct,
};
