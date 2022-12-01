const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('dummy of 1 element number returns one', () => {
  const blogs = [1]

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('dummy of 1 element string returns one', () => {
  const blogs = ['a']

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})