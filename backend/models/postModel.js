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

const postBisSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: {
      type: String
    },
    picture: {
        type: String
    },
    likers: {
      type: [String],
      required: true
    }
}, {
    collection: 'postbis'
})

module.exports = mongoose.model('Postbis', postBisSchema)