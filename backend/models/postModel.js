
//     message: {
//       type: String,
//       trim: true,
//       maxlength: 500,
//     },

//     // video: {
//     //   type: String,
//     // },


//     comments: {
//       type: [
//         {
//           commenterId:String,
//           commenterPseudo: String,
//           text: String,
//           timestamp: Number,
//         }
//       ],
//       required: true,
//     },
//   },


// //------------------------------------------------------------
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
          commentatorUserId:String,
          commentatorPseudo: String,
          commentatorProfilImgUrl: String,
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