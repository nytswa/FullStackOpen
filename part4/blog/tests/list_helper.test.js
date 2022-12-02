const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs

const mostBlogsOne = {
  author: 'Edsger W. Dijkstra',
  blogs: 1
}
const mostBlogsThree = {
  author: 'Edsger W. Dijkstra',
  blogs: 3
}
const mostBlogsFive = {
  author: 'Edsger W. Dijkstra',
  blogs: 5
}

const favoriteBlogExample = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  likes: 5
}

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithThreeEqualBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithFiveBlogs = [
  {
    _id: '000-5a422aa71b54a676234d17f8',
    title: 'Go',
    author: 'Edsger W. Dijkstra',
    url: 'http',
    likes: 1,
    __v: 0
  },
  {
    _id: '111-5a422aa71b54a676234d17f8',
    title: 'Go To',
    author: 'Edsger W. Dijkstra',
    url: 'http',
    likes: 2,
    __v: 0
  },
  {
    _id: '222-5a422aa71b54a676234d17f8',
    title: 'Go To Statement',
    author: 'Edsger W. Dijkstra',
    url: 'http',
    likes: 3,
    __v: 0
  },
  {
    _id: '333-5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered',
    author: 'Edsger W. Dijkstra',
    url: 'http',
    likes: 4,
    __v: 0
  },
  {
    _id: '444-5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http',
    likes: 5,
    __v: 0
  }
]


describe('dummy', () => {
  test('returns one', () => {
    const blogs = []
  
    const result = dummy(blogs)
    expect(result).toBe(1)
  })
  
  test('1 element number returns one', () => expect(dummy([0])).toBe(1))
  
  test('1 element string returns one', () => expect(dummy(['a'])).toBe(1))
})

describe('total likes ', () => {
  test('of empty list is zero', () => expect(totalLikes([])).toBe(0))
  test('when list has only blog equals the likes of that', () => expect(totalLikes(listWithOneBlog)).toBe(5))
  test('of a bigger list is calculated right', () => expect(totalLikes(listWithThreeEqualBlogs)).toBe(15))
  test('of 5 blogs', () => expect(totalLikes(listWithFiveBlogs)).toBe(15))
})

describe('favorite blog', () => {
  test('of empty list is undefined', () => expect(favoriteBlog([])).toEqual(undefined))
  test('when list has only blog equals the likes of that', () => expect(favoriteBlog(listWithOneBlog)).toEqual(favoriteBlogExample))
  test('of 3 equal blogs', () => expect(favoriteBlog(listWithThreeEqualBlogs)).toEqual(favoriteBlogExample))
  test('of 5 blogs', () => expect(favoriteBlog(listWithFiveBlogs)).toEqual(favoriteBlogExample))
})

describe('Author with most blogs', () => {
  test('of one', () => expect(mostBlogs(listWithOneBlog)).toEqual(mostBlogsOne))
  test('of 3', () => expect(mostBlogs(listWithThreeEqualBlogs)).toEqual(mostBlogsThree))
  test('of 5', () => expect(mostBlogs(listWithFiveBlogs)).toEqual(mostBlogsFive))
})