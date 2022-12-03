const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index').server_app
const server = require('../index').server

const api = supertest(app)

test('returned values are objects/json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('json returned', async () => {
  const response = await api.get('/api/blogs')
  // expect(response.body).toHaveLenght(2)
  expect(typeof response.body).toBe('object')
  expect(typeof response.body).not.toBe('array')
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})