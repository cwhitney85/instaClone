const mongoose = require('mongoose')

//feed schema
const feedSchema = mongoose.Schema({
  image: {type: String, required: true},
  description: {type: String, default: 'HappyStagram!'},
  likes: {type: Number, default: 0},
  tags: [{type: String}]
})

module.exports = mongoose.model('Feed', feedSchema)

//user schema 
const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true, minlength: 5},
  displayName: {type:String}, 
})

module.exports = User = mongoose.model("user", userSchema)