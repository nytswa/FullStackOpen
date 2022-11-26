const suma = (a, b) => {
  return a + b
}

const palindrome = (string) => {
  return string
    .split('')  // Array ['s', 't', 'r', 'i', 'n', 'g']
    .reverse()  // Reverse Array order
    .join('')   // Put each array element into a single string joined by '' (no space)
}

const average1 = array => {
  let sum = 0

  array.forEach(n => sum+= n)
  return sum / array.length
}

const average = array => {
  return array.reducer((sum, num) => sum + num) / array.length
}

module.exports = {
  suma,
  palindrome,
  average
}