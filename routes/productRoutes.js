const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/authMiddleWare');
//const authenticate = require('../middlewares/authMiddleWare');

//router.use(authenticate);

router.post('/',verifyToken, productController.createProduct);
router.get('/',verifyToken, productController.getAllProducts);
router.get('/:id',verifyToken, productController.getProductById);
router.put('/:id',verifyToken, productController.updateProduct);
router.delete('/:id',verifyToken,  productController.deleteProduct);

module.exports = router;
