const config = require('./utils/config')
const logger = require('./utils/logger')
// const middleware = require('./utils/middleware')
const express = require('express')
// Express APP
const app = express()
const cors = require('cors')

// Mongo DB
logger.info('connecting to', config.MONGODB_URI)
require('./mongo')

const blogsRouter = require('./controllers/blogs')


app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
// app.use(middleware.requestLogger)

app.use('api/blogs', blogsRouter)

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)


module.exports = app
