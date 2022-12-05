const supertest = require('supertest')
const app = require('../index').server_app


const api = supertest(app)

const initialBlogs = [
  {
    "author": "Austin Feltan",
    "title": "My Personal Life",
    "url": "111",
    "likes": 1
  },
  {
    "author": "Austin Feltan",
    "title": "Studies",
    "url": "222",
    "likes": 2
  }
]

const getAllBlogs = async () => {
  const response = await api.get('/api/blogs')
  
  const titles = response.body.map(blog => blog.title)

  return { 
    authors: response.body.map(blog => blog.author),
    titles
  }
}

module.exports = {
  api,
  initialBlogs,
  getAllBlogs
}