const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3003;


require("dotenv").config()


//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const whitelist = ['http://localhost:3000', 'https://stark-ocean-08311.herokuapp.com']

const corsOptions = {
  origin: ["https://stark-ocean-08311.herokuapp.com"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions))


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

