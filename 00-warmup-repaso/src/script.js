
const message = 'Hello world' // Try edit me
const list = []
const anotherList = list.concat(100)

//object creation + access object
const persona = {
  name: 'Austin',
  twitter: '@Nytswa',
  age: 27,
  isDev: true
}
// persona.name === persona[name]
console.log(persona['name'])  // persona.name






// Update header text
document.querySelector('#header').innerHTML = message

// Log to console
console.log(anotherList[0])
