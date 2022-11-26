const { palindrome } = require('../utils/generalFunctions')

test('palindrome of midudev', () => {
  const result = palindrome('midudev')

  expect(result).toBe('vedudim')
})

test('reverse of react', () => {
  const result = palindrome('react')

  expect(result).toBe('tcaer')
})

test('palindrome of empry string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test('palindrome of empry string', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})

test('palindrome single char A', () => {
  const result = palindrome('A')

  expect(result).toBe('A')
})

test('palindrome ana', () => {
  const result = palindrome('ana')

  expect(result).toBe('ana')
})

