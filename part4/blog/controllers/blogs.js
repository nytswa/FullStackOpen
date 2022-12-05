const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

console.log('Logging inside Controllers')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  // No input Control
  if (!blog) {
    response.status(400).json({
      error: 'Unexpected error: No blog data'
    })
  } else if (!blog.author || !blog.title) {
    response.status(400).json({
      error: 'Author or Title is missing'
    })
  } else {
    Blog.exists({ title: blog.title })
      .then(blogFind => {
        if (blogFind) {
          console.log('Blog Title already Exists', blogFind)
          response.status(400).json({
            error: 'Title must be unique'
          })
        } else {
        // Add
        // Create ID: Not anymore since MongoDB creates its own IDs

          // Create new Person/Contact
          const newblog = new Blog({
            title: blog.title,
            author: blog.author,
            url: blog.url || 'http',
            likes: blog.likes || 0
          })
          // save
          blog
            .save()
            .then(savedBlog => {
              response.status(201).json(savedBlog)
            })
        }
      })
      // .catch(err => next(err))
  }
})


module.exports = blogsRouter