import Blog from '../model/blog'

const initialBlogs = [

  {
    'title':'Canonical string reduction',
    'author':'Edsger W. Dijkstra',
    'url': 'Edsger W.Dijkstra-Wikipediahttps://en.wikipedia.org',
    'likes':10
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
]


const blogInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog)
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'React patterns',
    author: 'Iamagoggler',
    url: 'https://google.com/',
    likes: 3, })
  await blog.save()

  await blog.remove()

  return blog._id.toString()
}


export default{
  initialBlogs,
  nonExistingId,
  blogInDB
}