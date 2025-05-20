const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleWare');
//router.use(verifyToken);

router.get('/', verifyToken, userController.getAllUsers);
router.post('/',verifyToken, userController.createUser);
router.get('/:id', verifyToken, userController.getUserById);
router.put('/:id', verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;
