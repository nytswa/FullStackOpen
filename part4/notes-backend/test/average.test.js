const { average } = require('../utils/generalFunctions')

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1)
  })

  test('of many is calculated correctly', () => {
    expect(average([1, 2, 3])).toBe(2)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})