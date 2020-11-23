const mongoose = require('mongoose')

//feed schema
const feedSchema = mongoose.Schema({
  username: {type: String, required: true },
  image: {type: String, required: true},
  title: {type: String, default: 'HappyStagram!'},
  likes: {type: Number, default: 0},
  tags: [{type: String}]
})

module.exports = mongoose.model('Feed', feedSchema)
