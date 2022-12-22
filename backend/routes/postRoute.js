const express = require('express');
const router = express.Router();

const multer = require("../middleware/multerMiddleware");
const auth = require('../middleware/authMiddleware');

const postController = require('../controllers/PostController');

router.get('/:id', postController.getPost);
router.get('/', postController.getAllPost);
router.post('/', auth, multer, postController.createPost);

router.put('/:id', auth, multer, postController.updatePost);
router.put('/updatePostWithoutImg/:id', auth, postController.updatePostWithoutImg);
router.delete('/:id', auth, postController.deletePost);
router.put('/like-post/:id', postController.likePost);
// // router.patch('/like-post/:id', postController.likePost);
// // router.patch('/unlike-post/:id', postController.unlikePost);

// // // comments
router.put('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.updateCommentPost);
router.put('/delete-comment-post/:id',auth, postController.deleteCommentPost);



// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });

module.exports = router;