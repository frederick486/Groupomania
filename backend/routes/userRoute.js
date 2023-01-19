const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const multer = require('../middleware/multer-user')
const auth = require('../middleware/auth')

router.post('/signup', multer, userController.signup);
// router.delete('/', auth, userController.deleteUser); // ! attention au format des requêtes delete
router.put('/delete-user', auth, userController.deleteUser);
router.post('/login', userController.login);
router.get('/', userController.getAllUser);


module.exports = router;