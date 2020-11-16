const express = require('express')
const feeds = express.Router()



const Feed = require('../models/feeds.js')



//Create Index Route
feeds.get('/', (req, res) => {
    Feed.find({}, (err, foundFeeds) => {
        if (err) {
            res.status(400).json({error: err.message})
        }
        res.status(200).json(foundFeeds)
    })
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


module.exports = feeds