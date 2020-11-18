const { ObjectID } = require('bson')
const mongoose = require('mongoose')
// const Feed = require('./feeds')


//user schema 
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type:String}, 
    // feeds: [{type: ObjectID}]
  })
  
module.exports = User = mongoose.model("User", userSchema)
