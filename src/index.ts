import dotenv from 'dotenv'
import http from 'http'
dotenv.config()
import app from './app'
const server = http.createServer(app)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})