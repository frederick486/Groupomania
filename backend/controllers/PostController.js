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
      userId: req.auth.userId,
      pseudo: req.body.pseudo,
      email: req.body.email,
      profileImgUrl: req.body.profileImgUrl,
      title: req.body.title,
      desc: req.body.desc,
      postImgUrl: url + '/images/post/' + req.file.filename,
      // likes:[],
      likers:[],
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

// //create a post without post img
module.exports.createPostWwithoutPostImg = (req, res) => {
  const url = req.protocol + '://' + req.get('host')

  const post = new PostModel({
      _id: new mongoose.Types.ObjectId(),
      userId: req.auth.userId,
      pseudo: req.body.pseudo,
      email: req.body.email,
      profileImgUrl: req.body.profileImgUrl,
      title: req.body.title,
      desc: req.body.desc,
      postImgUrl: url + "/images/default/noAvatar.png",
      likers:[],
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
module.exports.updatePostWithoutImg = async (req, res) => {
  const postId = req.params.id;
  const userId = req.auth.userId;
 
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne(
        { 
          $set: req.body
        }
      );
      res.status(200).json("Post modifié avec updatePostWithoutImg");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
module.exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.auth.userId;
  const url = req.protocol + '://' + req.get('host')

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne(
        { 
          $set: req.body,
          postImgUrl: url + '/images/post/' + req.file.filename,
        }
      );
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// // update post
// module.exports.updatePost = async (req, res) => {
//   const postObject = req.file ? {
//       ...JSON.parse(req.body.post),
//       postImgUrl: url + '/images/post/' + req.file.filename,
//     } : { ...req.body };

//   delete postObject._userId;

//   PostModel.findOne({_id: req.params.id})
//       .then((post) => {
//           if (post.userId != req.auth.userId) {
//               res.status(403).json({ message : 'unauthorized request'});
//           } else {
//               post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
//               .then(() => res.status(200).json({message : 'post modifié !'}))
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
  const userId = req.auth.userId;

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

// // like/dislike a post
// module.exports.likePost = async (req, res) => {
//   const id = req.params.id;
//   const { userId } = req.body;
//   try {
//     const post = await PostModel.findById(id);
//     if (post.likers.includes(userId)) {
//       await post.updateOne({ $pull: { likers: userId } });
//       res.status(200).json("Post disliked");
//     } else {
//       await post.updateOne({ $push: { likers: userId } });
//       res.status(200).json("Post liked");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// like / dislike a post
module.exports.likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  const like = req.body.like;

  
    try {
      const post = await PostModel.findById(id);


      // if (like === 1 && post.likers.includes(userId)) {
      //   await post.updateOne({ $pull: { likers: userId } });
      //   res.status(200).json("Post disliked");
      // } else {
      //   await post.updateOne({ $push: { likers: userId } });
      //   res.status(200).json("Post liked");
      // }

      if (like === 1) {
        if ( !post.likers.includes(userId) && !post.unLikers.includes(userId) ) {
          await post.updateOne(
          { 
            $push: { likers: userId } 
          });
          res.status(200).json("Post liked");
        }
        if ( post.likers.includes(userId) && !post.unLikers.includes(userId) ) {
          await post.updateOne(
          { 
            $pull: { likers: userId } 
          });
          res.status(200).json("Post disliked");
        }
        if ( !post.likers.includes(userId) && post.unLikers.includes(userId)) {
          await post.updateOne(
          { 
            $pull: { unLikers: userId },
            $push: { likers: userId } 
          });
          res.status(200).json("Post liked");
        }
      }        
      else if (like === -1) {
        if( !post.likers.includes(userId) && !post.unLikers.includes(userId) ) {
          await post.updateOne(
            { 
              $push: { unLikers: userId },
            });
            res.status(200).json("Post unliked");
          }
        
        if( post.likers.includes(userId) && !post.unLikers.includes(userId) ) {
          await post.updateOne(
            { 
              $pull: { likers: userId },
              $push: { unLikers: userId } 
            });
            res.status(200).json("Post unliked");
          }
        
        if( !post.likers.includes(userId) && post.unLikers.includes(userId) ) {
          await post.updateOne(
            { 
              $pull: { unLikers: userId },
            });
            res.status(200).json("Post reset");
        }
      }    


    } catch (error) {
      res.status(500).json(error);
    }
  


    
    // 0 | 0 >>> 1 | 0
    // like === 1 && !post.likers.includes(userId) && !post.unLikers.includes(userId)

    // 0 | 0 >>> 0 | - 1
    // like === -1 && !post.likers.includes(userId) && !post.unLikers.includes(userId) 

    // 1 | 0 >>> 0 | 0
    // like === 1 && post.likers.includes(userId) && !post.unLikers.includes(userId)

    // 1 | 0 >>> 0 | - 1
    // like === - 1 && post.likers.includes(userId) && !post.unLikers.includes(userId)

    // 0 | - 1 >>> 0 | 0
    // like === -1 && !post.likers.includes(userId) && post.unLikers.includes(userId)

    // 0 | - 1 >>> 1 | 0
    // like === 1 && !post.likers.includes(userId) && post.unLikers.includes(userId)


    // like === 1
    // !post.likers.includes(userId) && !post.unLikers.includes(userId)
    // post.likers.includes(userId) && !post.unLikers.includes(userId)
    // !post.likers.includes(userId) && post.unLikers.includes(userId)

    // like === -1
    // !post.likers.includes(userId) && !post.unLikers.includes(userId) 
    // post.likers.includes(userId) && !post.unLikers.includes(userId)
    // !post.likers.includes(userId) && post.unLikers.includes(userId)



    // if (like === 1) {
    //   if ( !post.likers.includes(userId) && !post.unLikers.includes(userId) ) {}
    //   if ( post.likers.includes(userId) && !post.unLikers.includes(userId) ) {}
    //   if ( !post.likers.includes(userId) && post.unLikers.includes(userId)) {}
    // }        
    // else if (like === -1) {
    //   if( !post.likers.includes(userId) && !post.unLikers.includes(userId) ) {}
    //   if( post.likers.includes(userId) && !post.unLikers.includes(userId) ) {}
    //   if( !post.likers.includes(userId) && post.unLikers.includes(userId) ) {}
    // }    
    
    
    




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
            commentatorUserId: req.body.commentatorUserId,
            commentatorPseudo: req.body.commentatorPseudo,
            commentatorProfilImgUrl:req.body.commentatorProfilImgUrl,
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
  // console.log("req.auth.userId :", req.auth.userId)

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
  } catch (err) {    
    res.status(500).json(err)
  }

};


// update a comment post
module.exports.updateCommentPost = (req, res) => {

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
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