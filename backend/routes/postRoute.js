const express = require('express');
const router = express.Router();

const multer = require("../middleware/multerMiddleware");
const auth = require('../middleware/authMiddleware');
const postController = require('../controllers/PostController');

router.get('/:id', postController.getPost);
router.get('/', postController.getAllPost);
router.post('/', auth, multer, postController.createPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.put('/like-post/:id', postController.likePost);

// // // comments
router.put('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.updateCommentPost);
router.put('/delete-comment-post/:id',auth, postController.deleteCommentPost);


module.exports = router;