const config = require('./utils/config')
const logger = require('./utils/logger')
// const middleware = require('./utils/middleware')
const express = require('express')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

// Express APP
const app = express()

// Mongo DB
logger.info('connecting to', config.MONGODB_URI)
require('./mongo')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('api/blogs', blogsRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)


module.exports = app
