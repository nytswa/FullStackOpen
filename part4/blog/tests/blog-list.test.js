const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index').server_app
const server = require('../index').server
const Blog = require('../models/Blog')

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

beforeEach(async () => {
  await Blog.deleteMany({})

  const blog1 = new Blog(initialBlogs[0])
  await blog1.save()

  const blog2 = new Blog(initialBlogs[1])
  await blog2.save()
})

test('returned values are objects/json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('json returned', async () => {
  const response = await api.get('/api/blogs')
  expect(typeof response.body).toBe('object')
  expect(typeof response.body).not.toBe('array')
})

test('returned length', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('check first blog: author, title, url', async () => {
  const response = await api.get('/api/blogs')
  
  const authors = response.body.map(blog => blog.author)
  const titles = response.body.map(blog => blog.title)
  expect(authors).toContain(initialBlogs[0].author)
  expect(titles).toContain(initialBlogs[0].title)
  
  expect(response.body[0].url).toBe(initialBlogs[0].url)
})

test('a valid blog can be added', async () => {
  const newVBlog = {
    "author": "None",
    "title": "Nothing",
    "url": "333",
    "likes": 3
  }

  await api.post('/api/blogs')
    .send(newVBlog)
    .expect(201)  // Created
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const authors = response.body.map(blog => blog.author)
  const titles = response.body.map(blog => blog.title)
  expect(authors).toContain(newVBlog.author)
  expect(titles).toContain(newVBlog.title)
})

test('an invalid blog with no author is not added', async () => {
  const newInBlog = {
    "title": "Nothing",
    "url": "333",
    "likes": 3
  }

  await api.post('/api/blogs')
    .send(newInBlog)
    .expect(400)  // Created

  const response = await api.get('/api/blogs')

  const authors = response.body.map(blog => blog.author)
  const titles = response.body.map(blog => blog.title)
  expect(authors).not.toContain('None')
  expect(titles).not.toContain(newInBlog.title)
})

test.only('an invalid blog with no title is not added', async () => {
  const newInBlog = {
    "author": "None",
    "url": "333",
    "likes": 3
  }

  await api.post('/api/blogs')
    .send(newInBlog)
    .expect(400)  // Created

  const response = await api.get('/api/blogs')

  const authors = response.body.map(blog => blog.author)
  const titles = response.body.map(blog => blog.title)
  expect(authors).not.toContain(newInBlog.author)
  expect(titles).not.toContain('Nothing')
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})