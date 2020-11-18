// const router = require("express").Router()
const express = require('express')
const users = express.Router()
const User = require('../models/userModel.js')

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

// module.exports = router

module.exports = users