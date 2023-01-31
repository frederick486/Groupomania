const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
      type: String,
      required: true
    },    
    pseudo : {
      type: String,
    },
    email : {
      type: String,
    },
    profileImgUrl : {
      type: String
    },
    title: {
      type: String,
    },
    desc: {
      type: String
    },
    postImgUrl: {
        type: String
    },
    likers: {
      type: Array,
      default: []
    },
    unLikers: {
      type: Array,
      default: []
    },
    comments: {
      type: [
        {
          commenterUserId:String,
          commenterPseudo: String,
          commenterProfilImgUrl: String,
          text: String,
          timestamp: Number,
        }
      ],
      // required: true,
    },
  }, 
  {
    timestamps: true
  },
  // {
  //   collection: 'Posts'
  // }
)

module.exports = mongoose.model('posts', PostSchema)