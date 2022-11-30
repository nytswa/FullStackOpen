const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')

const config = require('./utils/config')
const logger = require('./utils/logger')


mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to Mongo DB:', error.message)
  })


app.use(cors())
app.use(express.json())


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app