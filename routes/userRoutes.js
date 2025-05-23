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
router.get('/me', verifyToken, userController.getUserByToken);
router.put('/me/profile-picture', verifyToken, userController.updateProfilePicture);

module.exports = router;
