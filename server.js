const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const app = express()
//const PORT = 3003
//environment variable port for heroku 
const PORT = process.env.PORT || 3003;


require("dotenv").config()


//middleware
app.use(express.json())
app.use(cors());


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



//port
app.listen(PORT, () => {
  console.log('listening on', PORT)
})

