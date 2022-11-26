const suma = (a, b) => {
  return a + b
}

const palindrome = (string) => {
  if (typeof string === undefined) return

  return string
    .split('')  // Array ['s', 't', 'r', 'i', 'n', 'g']
    .reverse()  // Reverse Array order
    .join('')   // Put each array element into a single string joined by '' (no space)
}

const average1 = array => {
  if (array.lenth === 0) return 0

  let sum = 0

  array.forEach(n => sum+= n)
  return sum / array.length
}

const average = array => {
  return array.reducer((sum, num) => sum + num, 0) / array.length
}

module.exports = {
  suma,
  palindrome,
  average
}