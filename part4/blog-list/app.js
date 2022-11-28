const config = require('./utils/config')
const logger = require('./utils/logger')
// const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')  // ¿?
const mongoose = require('mongoose')

// Express APP
const app = express()

logger.info('connecting to', congif.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to Mongo DB')
  })
  .catch(error => {
    logger.error('error connecting to Mongo DB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('api/blogs', blogsRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

module.exports = app