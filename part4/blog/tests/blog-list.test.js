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

afterAll(() => {
  mongoose.connection.close()
  server.close()
})