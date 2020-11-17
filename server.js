const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3003

//middleware
app.use(express.json())



// Database Error
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


// Database connection
mongoose.connect('mongodb://localhost:27017/feeds', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})


// Controllers/Routes
const feedsController = require('./controllers/feeds.js')
app.use('/feeds', feedsController)


//ROUTE TO GET USERS
app.get('/users', (req, res) => {
  res.json(users)
})


//port
app.listen(PORT, () => {
  console.log('listening on', PORT)
})

