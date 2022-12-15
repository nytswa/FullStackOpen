const supertest = require('supertest')
const app = require('../index').server_app
const User = require('../models/User')

// Testing api
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
  },
  {
    "author": "Austin",
    "title": "My Life",
    "url": "333",
    "likes": 10
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

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(u => u.toJSON())
}

module.exports = {
  api,
  initialBlogs,
  getAllBlogs,
  getUsers
}