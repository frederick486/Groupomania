const PostModel = require('../models/postModel');
// const fs = require("fs"); //Permet de modifier le système de fichiers
let mongoose = require('mongoose')

// const { json } = require("express");

// const { promisify } = require("util");
// const pipeline = promisify(require("stream").pipeline);

// import PostModel from "../models/postModel.js";
// import UserModel from "../models/userModel.js";
// import mongoose from "mongoose";



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


module.exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host')
  const post = new PostModel({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      comment: req.body.comment,
      picture: url + '/images/' + req.file.filename,
      likers:[]
  });
  post.save().then(result => {
      res.status(201).json({
          message: "Post registered successfully!",
          // userCreated: {
          //     _id: result._id,
          //     profileImg: result.profileImg
          // }
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  })
}

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

// module.exports.getAllPost = async (req, res) => {
//   try {
//     // const posts = await PostModel.find();
//     const posts = await Postbis.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

exports.getAllPost = (req, res, next) => {
  PostModel.find()
      .then(PostModel => res.status(200).json(PostModel))
      .catch(error => res.status(400).json({ error: error }))
  };

// update post
module.exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

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