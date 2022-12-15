const express = require('express');
const router = express.Router();

const multer = require("../middleware/multerMiddleware");
const auth = require('../middleware/authMiddleware');

const postController = require('../controllers/PostController');

router.get('/:id', postController.getPost);
router.get('/', postController.getAllPost);
router.post('/', multer, postController.createPost);

router.put('/:id', multer, postController.updatePost);
router.delete('/:id', postController.deletePost);
router.put('/like-post/:id', postController.likePost);
// // router.patch('/like-post/:id', postController.likePost);
// // router.patch('/unlike-post/:id', postController.unlikePost);

// // // comments
router.put('/comment-post/:id', postController.commentPost);
// // router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.put('/delete-comment-post/:id', auth, postController.deleteCommentPost);



// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });

module.exports = router;