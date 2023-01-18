const express = require('express');
const router = express.Router();

const multer = require("../middleware/multer-post");
const auth = require('../middleware/auth');
const postController = require('../controllers/PostController');

// post
router.get('/:id', postController.getPost);
router.get('/', postController.getAllPost);
router.post('/', auth, multer, postController.createPost);
router.put('/:id', auth, multer, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);
router.put('/like-post/:id',auth, postController.likePost);

// comments
router.put('/comment-post/:id',auth, postController.commentPost);
router.patch('/edit-comment-post/:id',auth, postController.updateCommentPost);
router.put('/delete-comment-post/:id',auth, postController.deleteCommentPost);


module.exports = router;