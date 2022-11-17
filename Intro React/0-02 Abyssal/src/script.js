
// const message = '' // Try edit me
const list = []
const anotherList = list.concat(100)

//object creation + access object
const module = {
  cpu: 30,
  damage: 1.103,
  RoF: 11.09
}
// persona.name === persona[name]
// console.log(persona['name'])  // persona.name

const calculatePercentage = (module) => {
  const result = (module.damage + (module.RoF / 100) - 1) * 100;
  return result.toFixed(3)
}


// Update header text
const headerElement = document.querySelector('#header');
headerElement.innerHTML = calculatePercentage(module)
