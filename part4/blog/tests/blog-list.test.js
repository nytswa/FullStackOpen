const mongoose = require('mongoose')
const server = require('../index').server
const Blog = require('../models/Blog')
const { api, initialBlogs, getAllBlogs } = require('./helpers')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blog1 = new Blog(initialBlogs[0])
  await blog1.save()

  const blog2 = new Blog(initialBlogs[1])
  await blog2.save()
})

test.skip('returned values are objects/json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(typeof response.body).toBe('object')
    .expect(typeof response.body).not.toBe('array')
}, 12000)

test.skip('returned length', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
  expect(response.body).toHaveLength(initialBlogs.length)  // same as above
}, 12000)

test('ID unique identifier property named correctly', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
}, 12000)

test('check first blog: author, title, url', async () => {
  const response = await api.get('/api/blogs')
  
  const authors = response.body.map(blog => blog.author)
  const titles = response.body.map(blog => blog.title)
  expect(authors).toContain(initialBlogs[0].author)
  expect(titles).toContain(initialBlogs[0].title)
  
  expect(response.body[0].url).toBe(initialBlogs[0].url)
}, 12000)

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
}, 22000)

test('an invalid blog with no author is not added', async () => {
  const newInBlog = {
    "title": "Nothing",
    "url": "333",
    "likes": 3
  }

  await api.post('/api/blogs')
    .send(newInBlog)
    .expect(400)  // Created

  const { authors, titles } = await getAllBlogs()
  expect(authors).not.toContain('None')
  expect(titles).not.toContain(newInBlog.title)
}, 22000)

test('an invalid blog with no title is not added', async () => {
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
}, 22000)

test('an invalid blog with no url is not added', async () => {
  const newInBlog = {
    "title": "Nothing",
    "author": "None",
    "likes": 4
  }

  const responsePost = await api.post('/api/blogs')
    .send(newInBlog)
    .expect(400)  // Created
  
  expect(responsePost.body).toEqual({ error: 'URL or Title/Author is missing' })

  const response = await api.get('/api/blogs')
  
  const authors = response.body.map(blog => blog.author)
  const titles = response.body.map(blog => blog.title)
  expect(authors).not.toContain(newInBlog.author)
  expect(titles).not.toContain(newInBlog.title)
}, 22000)

test('likes missing from request will still be 0', async () => {
  const newInBlog = {
    "author": "None",
    "title": "Nothing",
    "url": "333"
  }

  const createdBlog = await api.post('/api/blogs')
    .send(newInBlog)
    .expect(201)  // Created

  expect(createdBlog.body.url).toBe('333')
  expect(createdBlog.body.likes).toBe(0)
}, 22000)




afterAll(() => {
  mongoose.connection.close()
  server.close()
})