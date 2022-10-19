import supertest from 'supertest'
import Blog from '../model/blog'
import app from '../app'
import { connection } from 'mongoose'
import helper from './test_helper.test'






const api = supertest(app)


beforeEach( async () => {
  await Blog.deleteMany({})

  for(const blog of helper.initialBlogs){
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('it should return the correct amount of blog post in json format', async() => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

},100000)

test('it should return all blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
},100000)

test('it should verify that unique property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

test('it should create new blog post', async () => {
  const newBlog = {

    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,

  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogAtEnd = await helper.blogInDB()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogAtEnd.map( (c:{title:string}) => c.title)
  expect(title).toContain(
    'Type wars'
  )
} )

test('it should check if like property is missing, it will default to zero', async () => {
  const newBlog =  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogInDB()
  console.log(blogAtEnd)
  const created = blogAtEnd.find(l => l.likes)
  if(!Object.keys(newBlog).includes('likes')){
    expect(created?.likes).toBe(0)

  }
})

test('it should respond with status code 400 if title or url is missing', async () => {
  const newBlog ={
    author: 'Michael Chan',
    likes: 3,
  }
  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogAtEnd = await helper.blogInDB()
  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length)

})
afterAll( () => {
  connection.close()
})