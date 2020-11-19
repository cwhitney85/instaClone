const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
var multer = require('multer')
const app = express()

//const PORT = 3003
//environment variable port for heroku 
const PORT = process.env.PORT || 3003;


require("dotenv").config()


//middleware
app.use(express.json())
app.use(cors());

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

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = multer({ storage: storage }).array('file')


app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    // A Multer error occurred when uploading.
    } else if (err) {
      return res.status(500).json(err)
    // An unknown error occurred when uploading.
  }
  return res.status(200).send(req.file)
  })
})


//port
app.listen(PORT, () => {
  console.log('listening on', PORT)
})

