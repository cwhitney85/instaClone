// Much of the authentication done with the help of Devistry tutorial: https://www.youtube.com/watch?v=Rdbs2W6R23c&t=740s&ab_channel=Devistry

const express = require('express')
const users = express.Router()
const User = require('../models/userModel.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config()

// Create Route
users.post('/', async (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(user)
        console.log('new user:', user)
    })
})

// Check Token
users.post('/VerifyToken', async (req, res) => {
  try {
    const token = req.header("x-auth-token")
    if (!token) return res.json(false)


    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) return res.json(false)

    const user = await User.findById(verified.id)
    console.log(user)
    if (!user) return res.json(false)

    return res.json(true)
  } catch(error) {
    res.status(400).json({ error: error.message})
  }

})



users.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    console.log(req.body)
    
    if (!email || !password || !passwordCheck )
      return res.status(400).json({ msg: "Not all fields were completed." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Password must be a minimum 5 characters." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Password verification failed." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

users.post("/login", async (req, res) => {
  console.log(req.body)
  try {
    const { displayName, password } = req.body;
    console.log(displayName, password)
    // validate
    if (!displayName || !password)
      return res.status(400).json({ msg: "Not all fields were completed." });

    const user = await User.findOne({ displayName: displayName });
    console.log(user)
    if (!user)
      return res
        .status(400)
        .json({ msg: "This account does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        user: user,
        id: user._id,
        displayName: user.displayName,
      },
    });
    console.log(token)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


users.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    user: user
  });
});

module.exports = users;
