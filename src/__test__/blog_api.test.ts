import supertest from 'supertest'
import Blog from "../model/blog"
import app from '../app' 
import { connection } from 'mongoose'


const api = supertest(app)

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

beforeEach( async () => {
   await Blog.deleteMany({})

  for(let blog of initialBlogs){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('it should return the correct amount of blog post in json format', async() => {
 await api
 .get('/api/blogs')
  expect(200)
  expect('Content-Type').toBe(/application\/json/)

},100000)

test('it should return all blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
},100000)

test('it should verify that unique property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

afterAll( () => {
 return connection.close()
})