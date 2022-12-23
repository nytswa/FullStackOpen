const mongoose = require('mongoose')
const server = require('../index').server
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash
    })

    await user.save()

    const login = await api
      .post('/api/login')
      .send({
        "username": "root",
        passwordHash
      })
    
    console.log(login)
  
  }, 15000)
  test('Successfully created', async () => {
    // const { body: usersAtStart } = await api.get('/api/users')k
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    // const savedNewUser = await newUser.save()
    const userCreated = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 25000)

  test('Failure: name already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'nomatter'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    const names = usersAtEnd.map(u => u.name)
    expect(names).not.toContain(newUser.name)

    expect(result.body.error).toContain('Username must be unique')
  }, 25000)

  test('Failure: username too short', async () => {
    const newUser = {
      username: 'ro',
      name: 'ro',
      password: 'nomatter'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('Username too short')
  }, 25000)

  test('Failure: password too short', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'roo',
      name: 'roo',
      password: 'no'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    const names = usersAtEnd.map(u => u.name)
    expect(names).not.toContain(newUser.name)

    expect(result.body.error).toContain('Password too short')
  }, 25000)

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})

