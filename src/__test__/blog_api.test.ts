import supertest from 'supertest'
import Blog from '../model/blog'
import app from '../app'
import { connection } from 'mongoose'
import helper from './test_helper.test'



const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initailly some blogs saved', () => {

  test('it should return blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('it should return the correct amount of blog post', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})

describe('viewing a specific blog', () => {
  test('it should verify that a unique propety is named id', async () => {
    const blogsAtStart = await helper.blogInDB()
    const blogToView = blogsAtStart[0]
    expect(blogToView.id).toBeDefined()
  })

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogInDB()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exit', async () => {
    const validNonexitingId = await helper.nonExistingId()
    console.log(validNonexitingId)

    await api
      .get(`/api/blogs/${validNonexitingId}`)
      .expect(404)

  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})


describe('addition of a new blog', () => {
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

    const blogsAtEnd = await helper.blogInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'Type wars'
    )
  })

  test('it should test if like property is missing it should default to zero', async () => {
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

    const blogsAtStart = await helper.blogInDB()
    const blogsToView = blogsAtStart[0]
    const content = blogsToView.likes
    expect(content).toBe(0)


  })

  test('fails with statuscode 400 if data is invalid', async () => {
    const newBlog ={
      author: 'Michael Chan',
      likes: 3,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('deletion of a blog', async () => {
    const blogsAtStart = await helper.blogInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogInDB()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const contents = blogsAtEnd.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.title)
  })

  test('updating of an individual blog', async () => {

    const blogsAtStart = await helper.blogInDB()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate, likes:blogToUpdate.likes + 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToUpdate))
    expect(response.body).toEqual(processedBlogToView)



  })


})





afterAll( () => {
  connection.close()
})