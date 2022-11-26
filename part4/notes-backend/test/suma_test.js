const { suma } = require('../utils/generalFunctions')


new Error('printing some error')


const condition = true
const message = `assertion fail message`
console.assert(condition, message)

const checks = [
  { a: 0, b: 0, result: 0 },
  { a: 0, b: 1, result: 1 },
  { a: 1, b: 0, result: 1 },
  { a: 1, b: 1, result: 2 },
  { a: 2, b: 2, result: 4 },
  { a: 9, b: 1, result: 10 },
  { a: 1, b: 9, result: 10 },
  { a: 5, b: 5, result: 10 }
]

const alt = [
  { a: 0, b: 0, result: 1 },
  { a: -1, b: -1, result: -1 },
  { a: -100, b: -100, result: 200 },
  { a: 10, b: 0, result: 0 },
  { a: 0, b: -10, result: 0 }
]

checks.forEach( (check, i) => {
  const { a, b, result } = check
  console.assert(
    suma(a, b) === result,
    `${i+1}) Sum of ${a} + ${b} expected to be ${result} instead got ${suma(a, b)}`
  )
})


console.log(`${checks.length} checks performed ...`)
