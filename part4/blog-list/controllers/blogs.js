const blogsRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(e => next(e))
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      console.log(result)
      mongoose.connection.close()
      response.status(201).json(result)
    })
    .catch(e => next(e))
})

module.exports = blogsRouter