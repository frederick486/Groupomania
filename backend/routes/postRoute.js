const express = require('express');
const router = express.Router();

const multer = require("../middleware/multerMiddleware");

const postController = require('../controllers/PostController');

// router.get('/:id', postController.getPost);
router.get('/', postController.getAllPost);

// // router.post('/', upload.single("file"), postController.createPost);
router.post('/', multer, postController.createPost);

// router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
// router.put('/like-post/:id', postController.likePost);
// // router.patch('/like-post/:id', postController.likePost);
// // router.patch('/unlike-post/:id', postController.unlikePost);

// // // comments
// // router.patch('/comment-post/:id', postController.commentPost);
// // router.patch('/edit-comment-post/:id', postController.editCommentPost);
// // router.patch('/delete-comment-post/:id', postController.deleteCommentPost);



// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });

module.exports = router;