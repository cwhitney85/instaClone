const mongoose = require('mongoose')

//feed schema
const feedSchema = mongoose.Schema({
  image: {type: String, required: true},
  description: {type: String, default: 'HappyStagram!'},
  likes: {type: Number, default: 0},
  tags: [{type: String}]
})

module.exports = mongoose.model('Feed', feedSchema)
