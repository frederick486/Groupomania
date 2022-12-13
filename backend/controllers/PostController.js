const PostModel = require('../models/postModel');
// const fs = require("fs"); //Permet de modifier le système de fichiers
let mongoose = require('mongoose')

// const { json } = require("express");

// // creating a post

// module.exports.createPost = async (req, res) => {
//   const newPost = new PostModel(req.body);

//   try {
//     await newPost.save();
//     res.status(200).json(newPost);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// //create a post
module.exports.createPost = (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const post = new PostModel({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      desc: req.body.desc,
      img: url + '/images/' + req.file.filename,
      likes:[],
      comments: [],
    });
  post.save().then(result => {
      res.status(201).json({
          message: "Post registered successfully!",   
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  })
}

// //create a post
// module.exports.createPost = async (req, res) => {
//   const newPost = new PostModel(req.body)
//   try {
//       const savedPost = await newPost.save();
//       res.status(200).json(savedPost);
//   } catch (err) {
//       res.status(500).json(err);
//   }
// }

// get a post
module.exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all posts
module.exports.getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
module.exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  const url = req.protocol + '://' + req.get('host')

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne(
        { 
          $set: req.body,
          img: url + '/images/' + req.file.filename, 
        }
      );
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// // update post
// module.exports.updatePost = async (req, res) => {
//   const sauceObject = req.file ? {
//       ...JSON.parse(req.body.sauce),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   } : { ...req.body };

//   delete sauceObject._userId;
//   Sauce.findOne({_id: req.params.id})
//       .then((sauce) => {
//           if (sauce.userId != req.auth.userId) {
//               res.status(403).json({ message : 'unauthorized request'});
//           } else {
//               Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
//               .then(() => res.status(200).json({message : 'Sauce modifiée !'}))
//               .catch(error => res.status(401).json({ error }));
//           }
//       })
//       .catch((error) => {
//           res.status(400).json({ error });
//       });
// };

// delete a post
module.exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
module.exports.likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likers.includes(userId)) {
      await post.updateOne({ $pull: { likers: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likers: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// comment a post
module.exports.commentPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id)
    await post.updateOne (
      { 
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
    );
    res.status(200).json("Commentaire ajouté");
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete a comment post
module.exports.deleteCommentPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id)
    await post.updateOne (
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
    );
    res.status(200).json("Commentaire supprimé");
  } catch (error) {
    res.status(500).json(error);
  }
};

// // Get timeline posts
// export const getTimelinePosts = async (req, res) => {
//   const userId = req.params.id
//   try {
//     const currentUserPosts = await PostModel.find({ userId: userId });

//     const followingPosts = await UserModel.aggregate([
//       { 
//         $match: {
//           _id: new mongoose.Types.ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "posts",
//           localField: "following",
//           foreignField: "userId",
//           as: "followingPosts",
//         },
//       },
//       {
//         $project: {
//           followingPosts: 1,
//           _id: 0,
//         },
//       },
//     ]);

//     res.status(200).json(
//       currentUserPosts
//         .concat(...followingPosts[0].followingPosts)
//         .sort((a, b) => {
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         })
//     );
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };