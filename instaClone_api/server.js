const express = require('express')
const app = express()
const PORT = 3003

app.get('/', (req, res) => {
  res.send('index')
})

app.listen(PORT, () => {
  console.log('listening on', PORT)
})