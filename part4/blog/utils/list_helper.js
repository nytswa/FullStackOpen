
const dummy = (blogs) => {
  // blogs === array
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {return undefined}
  
  let maxliked = [0, undefined, false]

  blogs.forEach(blog => {
    if (maxliked[0] < blog.likes)
      maxliked[0] = blog.likes
      maxliked[1] = blog
      if (!maxliked[2]) {
        maxliked[2] = true 
      } 
  })
  
  // title, author, likes
  return {
    title: maxliked[1].title,
    author: maxliked[1].author,
    likes: maxliked[1].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}