const mongoose = require('mongoose')


//user schema 
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type:String}, 
    resetLink: { data: String, default: ' '}
  })
  
module.exports = User = mongoose.model("User", userSchema)
