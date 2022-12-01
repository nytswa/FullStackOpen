
const dummy = (blogs) => {
  // blogs === array
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
}

module.exports = {
  dummy,
  totalLikes
}