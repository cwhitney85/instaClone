const express = require('express')
const users = express.Router()
const User = require('../models/userModel.js')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config()

// router.get('/test',(req, res) => {
//     res.send("Hello, it's working")
// })

users.get('/testing', (req, res) => {
    res.send('This is the users router now')
})

users.get('/', (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(users)
    })
})

// Find user for profile display
users.get('/:id', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).send({
      displayName: foundUser.displayName,
      id: foundUser.id,
      avatar: foundUser.avatar,
      feeds: foundUser.feeds
    })
  })
})

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

    const verified = jwt.verify(token, process.env.SECRET)
    if (!verified) return res.json(false)

    return res.json(true)
  } catch(error) {
    res.status(400).json({ error: error.message})
  }
})

// module.exports = router


users.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    console.log(req.body)
    // validate

    if (!email || !password || !passwordCheck )
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

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
  try {
    const { email, password } = req.body;
    console.log(email, password)
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    console.log(user)
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// users.post("/tokenIsValid", async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) return res.json(false);

//     const user = await User.findById(verified.id);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// users.get("/", auth, async (req, res) => {
//   const user = await User.findById(req.user);
//   res.json({
//     displayName: user.displayName,
//     id: user._id,
//   });
// });

module.exports = users;
