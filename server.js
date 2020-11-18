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
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
// app.use(cors());

//Connect to Mongo
const MONGODBURI = process.env.MONGODBURI || 'mongodb://localhost:27017/feeds'

// Database Error
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))


// Database connection
mongoose.connect(MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

//set up route
const userController = require('./controllers/user.js')
app.use('/users', userController)



// Controllers/Routes
const feedsController = require('./controllers/feeds.js')
app.use('/feeds', feedsController)

// Index
app.get('/', (req, res) => {
  res.send('hello')
})


//port
app.listen(PORT, () => {
  console.log('listening on', PORT)
})

