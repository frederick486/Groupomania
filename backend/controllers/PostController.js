const PostModel = require('../models/postModel');
const fs = require("fs"); //<<< Permet de modifier le système de fichiers
let mongoose = require('mongoose')


// //create a post
module.exports.createPost = async (req, res) => {
  const url = req.protocol + '://' + req.get('host')

  try {
    const post = new PostModel({
      _id: new mongoose.Types.ObjectId(),
      userId: req.auth.userId,
      pseudo: req.body.pseudo,
      email: req.body.email,
      profileImgUrl: req.body.profileImgUrl,
      title: req.body.title,
      desc: req.body.desc,
      postImgUrl: req.file != null
        ? url + '/images/post/' + req.file.filename
        : url + '/images/default/no-picture.png',
      likers:[],
      comments: [],
    });
    await post.save();
    res.status(201).json({ message: "Post créé avec succès !", })       
  } catch (error) {
    res.status(500).json(error);
  }
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
  const userId = req.auth.userId;
  const url = req.protocol + '://' + req.get('host')

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {        

      if (req.file != null) {
        const oldFilename = post.postImgUrl.split('/images/post/')[1]
        fs.unlink(`images/post/${oldFilename}`, ()=> {}) 

        await post.updateOne(
          { 
            $set: req.body,
            postImgUrl: url + '/images/post/' + req.file.filename
          }
        );
        res.status(200).json("Post mis à jour");        

      } else {

        await post.updateOne(
          { 
            title: req.body.title,
            desc: req.body.desc,
          }
        );
        res.status(200).json("Post mis à jour");   
      }        
    } else {
      res.status(403).json("Echec Authentication");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// delete a post
module.exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;
  const isAdmin = req.auth.isAdmin;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId || isAdmin) {
      const filename = post.postImgUrl.split('/images/post/')[1]
      fs.unlink(`images/post/${filename}`, async () => {
        await post.deleteOne();
        res.status(200).json("Post supprimé.");
      })
    } else {
      res.status(403).json("Action interdite");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like / dislike a post
module.exports.likePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;
  const like = req.body.like;
  
  try {
    const post = await PostModel.findById(id);

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
          res.status(200).json("Like post reset");
      }
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
            commenterUserId: req.body.commenterUserId,
            commenterPseudo: req.body.commenterPseudo,
            commenterProfilImgUrl:req.body.commenterProfilImgUrl,
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
  const userId = req.auth.userId;
  const isAdmin = req.auth.isAdmin;

  const commentIdToDelete = req.body.commentId;

  try {
    const post = await PostModel.findById(id)
    const {comments} = post;

    const comment = comments.find(c => c._id == commentIdToDelete );

    if (comment.commenterUserId === userId || isAdmin) {

      await post.updateOne( { $pull: { comments: { _id: commentIdToDelete } } } );
      res.status(200).json("Commentaire supprimé");  

    } else {
      res.status(403).json("Action interdite");
    }
  } catch (err) {    
    res.status(500).json(err)
  }
};


// update a comment post
module.exports.updateCommentPost = (req, res) => {
  const id = req.params.id;
  const userId = req.auth.userId;

  try {
    return PostModel.findById(id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");

      if(theComment.commenterUserId === userId) {
        theComment.text = req.body.text;
      } else {
        res.status(403).json("Action interdite");
      }

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};