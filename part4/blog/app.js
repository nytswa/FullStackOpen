const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')

require('./mongo')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


module.exports = app