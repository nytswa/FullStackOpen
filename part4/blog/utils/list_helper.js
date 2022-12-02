
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

const mostBlogs = (blogs) => {
  // returns the author who has the largest amount of blogs.
  // return value also contains the number of blogs the top author has in an object.
  const result = {
    author: 'none',
    blogs: 0
  }

  let authors = []
  let authorsOb = {}

  blogs.forEach((blog, i) => {
    // adding unique authors to list
    if (!authors.includes(blog.author)) {
      authors.concat([blog.author, 0])
      authorsOb = {[blog.author]: 0}
    }
  })

  blogs.forEach((blog, i) => {
    // counting blogs

    // with Object
    authorsOb[blog.author] += 1

    // with array and double loop
    authors.forEach(author => {
      if (author[0] === blog.author) {
        author[1] += 1
      }
    })
  })

  // Choosing most blogs' author
  for (const keys in authorsOb) {
    if (authorsOb[keys] > result.blogs) {
      result.blogs = authorsOb[keys]
      result.author = keys
    }
  }
  
  // result.author = counters.key.max
  // result.blogs = counters.values.max
  return result
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}