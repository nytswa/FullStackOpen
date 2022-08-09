
const message = 'Watch' // Try edit me
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


// Data
const rawTime = new Date();
let hh = rawTime.getHours().toString();
let mm = rawTime.getMinutes().toString();
let ss = rawTime.getSeconds().toString();

let watch = ''
const clock = document.querySelector('#clock');

// Update clock
function updateClock() {
  watch = hh + ':' + mm + ':' + ss;
  clock.innerHTML = watch;
  ss = (1 + parseInt(ss)).toString();
}
updateClock();
setInterval(updateClock, 1000);


// Log to console
console.log(anotherList[0])
