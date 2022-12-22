const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
// Middlewares
const tokenExtractor = require('./middleware/tokenExtractor')
const userExtractor = require('./middleware/userExtractor')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')


require('./mongo')

app.use(cors())
app.use(express.json())

app.use('*', tokenExtractor)

app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// Middlewares
app.use(errorHandler)
app.use(notFound)

module.exports = app