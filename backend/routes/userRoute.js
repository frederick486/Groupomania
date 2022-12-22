const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const multer = require('../middleware/userMulter')
const auth = require('../middleware/authMiddleware')

router.post('/signup', multer, userController.signup);
router.delete('/', auth, userController.deleteUser);
router.post('/login', userController.login);


module.exports = router;