import cors from 'cors'
import express from 'express'
import blogsRouter from './controllers/blogs'
import config from './utils/config'
import { connect } from 'http2'
import logger from './utils/logger'
import middleware from './utils/middleware'

const app = express()

//connect to mongoose
const password = config.MONGODB_URI
const url = `mongodb+srv://samcesa45:${password}@cluster0.lumxc.mongodb.net/blogApp?retryWrites=true&w=majority`

const run = async () => {
    await connect(url)
    logger.info('mongodb connected')
    logger.info('blogs saved!')
}

run().catch(err => logger.error(err))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)


app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

export default app