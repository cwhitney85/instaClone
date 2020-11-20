const express = require('express')
const feeds = express.Router()


// MODELS
const Feed = require('../models/feeds.js')
const feedSeed = require('../models/seed.js')

// SEED rout
feeds.get('/seed', (req, res) => {
  Feed.remove(() => {
      Feed.create(feedSeed, (err, data) => {
          if (err) console.log(err.message);
          console.log('added provided seed data')
          res.redirect('/feeds/');
      })
  })
})



//Create Index Route
feeds.get('/', (req, res) => {
    Feed.find({}, (err, foundFeeds) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(foundFeeds)
    })
})

// Test Route
feeds.get('/test', (req, res) => {
  res.send('test')
})


//Create Create Route
feeds.post('/', async (req, res) => {
    Feed.create(req.body, (error, createdFeed) => {
        if (error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).send(createdFeed)
    })
})


//Create Delete Route
feeds.delete('/:id', (req, res) => {
    Feed.findByIdAndRemove(req.params.id, (err, deletedFeed) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedFeed)
    })
})

//Create Update Route
feeds.put('/:id', (req, res) => {
    Feed.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedFeed) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedFeed)
    })
})

// show route
feeds.get('/:id', (req, res) => {
  Feed.findById(req.params.id, (error, foundFeed) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    res.status(200).json(foundFeed)
  })
})


module.exports = feeds