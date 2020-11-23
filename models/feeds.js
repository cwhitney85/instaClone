const mongoose = require('mongoose')

//feed schema
const feedSchema = mongoose.Schema({
  // displayName: {type: String, required: true},
  image: {type: String, required: true},
  title: {type: String, default: 'HappyStagram!'},
  likes: [{type:String}],
  tags: [{type: String}],
  description: {type: String}
})

module.exports = mongoose.model('Feed', feedSchema)
