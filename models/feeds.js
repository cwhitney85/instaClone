const mongoose = require('mongoose')
//const {ObjectId} = mongoose.Schema.Types

// //comments schema
// const Comments = mongoose.Schema({
//   text: {type: String, required: true},
//   date: {type: Date},
//   postedBy:{type:ObjectId,ref:"User"}
// })

//feed schema
const feedSchema = mongoose.Schema({
  image: {type: String, required: true},
  title: {type: String, default: 'HappyStagram!'},
  likes: {type: Number, default: 0},
  tags: [{type: String}],
  // comments: [comments]
})

module.exports = mongoose.model('Feed', feedSchema)
