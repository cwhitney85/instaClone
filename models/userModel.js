const { ObjectID } = require('bson')
const mongoose = require('mongoose')
// const Feed = require('./feeds')


//user schema 
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type: String},
    avatar: {type: String, default: 'https://eitrawmaterials.eu/wp-content/uploads/2016/09/empty-avatar.jpg'},
    feeds: [{type: String}]
    // feeds: [{type: ObjectID}]
  })
  
module.exports = User = mongoose.model("User", userSchema)
