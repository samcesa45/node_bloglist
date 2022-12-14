import express, { Request, Response, NextFunction } from 'express'
import Blog from '../model/blog'
const blogsRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
blogsRouter.get('/', async(_req: Request, res: Response,_next:NextFunction) => {
  const blog = await Blog.find({})
  return res.json(blog)

})

blogsRouter.get('/:id', async (req: Request<{id:string}>, res: Response, next: NextFunction) => {
  const id = req.params.id

  try {
    const blog = await Blog.findById(id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }

  } catch (error) {
    next(error)
  }
})

// eslint-disable-next-line @typescript-eslint/ban-types
blogsRouter.post('/', async (req: Request<{},{},{title:string,author:string,url:string,likes:number}>, res: Response, next:NextFunction) => {
  const { title, author, url, likes } = req.body

  if (title === undefined || url === undefined) {
    res.status(400).json({ error:'content missing' })
  }


  const blog = new Blog({
    title,
    author,
    url,
    likes:likes || 0
  })

  try {
    const savedBlogs = await blog.save()
    res.status(201).json(savedBlogs)
  } catch (error) {
    next(error)
  }

})

// eslint-disable-next-line @typescript-eslint/ban-types
blogsRouter.put('/:id', async (req: Request<{id:string},{},{title:string,author:string,url:string,likes:number}>, res: Response, next: NextFunction) => {
  const id = req.params.id
  const { title,author,url,likes } = req.body
  const blog = {
    title,
    author,
    url,
    likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })
    res.json(updatedBlog)

  } catch (error) {
    next(error)
  }

})

blogsRouter.delete('/:id', async(req:Request<{id:string}>,res:Response,next:NextFunction) => {
  const id = req.params.id

  try {
    await Blog.findByIdAndRemove(id)
    res.status(204).end()

  } catch (error) {
    next(error)
  }


})

export default blogsRouter