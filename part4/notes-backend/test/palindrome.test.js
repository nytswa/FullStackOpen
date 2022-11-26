const { palindrome } = require('../utils/generalFunctions')

test('palindrome of midudev', () => {
  const result = palindrome('midudev')

  expect(result).toBe('vedudim')
})

test('palindrome of empry string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test('palindrome a', () => {
  const result = palindrome('a')

  expect(result).toBe('a')
})

test('palindrome ana', () => {
  const result = palindrome('ana')

  expect(result).toBe('ana')
})

test('reverse of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})