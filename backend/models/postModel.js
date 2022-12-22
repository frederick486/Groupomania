// const mongoose = require('mongoose');

// const PostSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: String,
//       required: true
//     },
//     message: {
//       type: String,
//       trim: true,
//       maxlength: 500,
//     },
//     picture: {
//       type: String,
//       required: true
//     },
//     // video: {
//     //   type: String,
//     // },
//     likers: {
//       type: [String],
//       required: true,
//     },
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
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model('post', PostSchema);

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