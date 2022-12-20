const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


console.log('Logging inside Controllers')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    blogs: 1
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const blog = await Blog.findById(id).populate('user')
    response.status(200).json(blog)
  } catch (error) {
    console.error(error)
    // next(error)
  }
})

// .THEN
// blogsRouter.post('/', (request, response, next) => {
//   const blog = new Blog(request.body)

//   // No input Control
//   if (!blog) {
//     response.status(400).json({
//       error: 'Unexpected error: No blog data'
//     })
//   } else if (!blog.author || !blog.title) {
//     response.status(400).json({
//       error: 'Author or Title is missing'
//     })
//   } else {
//     Blog.exists({ title: blog.title })
//       .then(blogFind => {
//         if (blogFind) {
//           console.log('Blog Title already Exists', blogFind)
//           response.status(400).json({
//             error: 'Title must be unique'
//           })
//         } else {
//         // Add
//         // Create ID: Not anymore since MongoDB creates its own IDs

//           // Create new Person/Contact
//           const newblog = new Blog({
//             title: blog.title,
//             author: blog.author,
//             url: blog.url || 'http',
//             likes: blog.likes || 0
//           })
//           // save
//           blog
//             .save()
//             .then(savedBlog => {
//               response.status(201).json(savedBlog)
//             })
//         }
//       })
//       // .catch(err => next(err))
//   }
// })


// await POST
blogsRouter.post('/', async (request, response) => {
  const { userId } = request.body
  const blog = new Blog(request.body)

  const user = await User.findById(userId)
  // console.log('__HERE__', user, user._id, user.id)

  // TOKEN Authentication
  const authorization = request.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }


  // No input Control
  if (!blog) {
    response.status(400).json({
      error: 'Unexpected error: No blog data'
    })
  } else if (!blog.author || !blog.title || !blog.url) {
    response.status(400).json({
      error: 'URL or Title/Author is missing'
    })
  } else if (!userId) {
    response.status(400).json({
      error: 'User/owner missing'
    })
  } else {
    const blogFind = await Blog.exists({ title: blog.title })
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
        likes: blog.likes || 0,
        user: user._id
      })

      try {
        // save blog + 'updating' user with blog
        const savedBlog = await newblog.save()
        user.blogs = user.blogs.concat(savedBlog._id)  // or savedBlog.toJSON().id
        await user.save()

        response.status(201).json(savedBlog)
      } catch (error) {
        console.error(error)
        response.status(400).json({ error })
      }
    }
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id } = request.params
  try {
    const blog = await Blog.findByIdAndDelete(id)
    response.status(204).json(blog)
  }
  catch (error) {
    console.error(error)
    // next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const updatedData = request.body

  const blog = {
    title: updatedData.title,
    author:updatedData.author,
    url: updatedData.url,
    likes: updatedData.likes
  }

  try {
    const update = await Blog.findByIdAndUpdate(id, blog, {new:true})
    response.status(200).json(blog)
  } catch (error) {
    response.status(404)
    console.error(error)
    // next(error)
  }
})


module.exports = blogsRouter