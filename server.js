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

//route for signup and activating an account
const {signip, activateAccount} = require("./controllers/user.js")

router.post('/signip', signup);
router.post('/email-activate', activateAccount)
router.put('/forgot-password', forgotPassword)



// Controllers/Routes
const feedsController = require('./controllers/feeds.js');
const router = require('./controllers/user.js');
app.use('/feeds', feedsController)


// Index
app.get('/', (req, res) => {
  res.send('hello')
})


//port
app.listen(PORT, () => {
  console.log('listening on', PORT)
})

module.exports = router