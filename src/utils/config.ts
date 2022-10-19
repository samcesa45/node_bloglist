import dotenv from 'dotenv'
dotenv.config()


// type IPROCESS = {
//   MONGODB_URI:[key:string]:string;
//   PORT:[key:string]:string
// }

// process.env as {
//     [key:string]:string
// }
const PORT = process.env.PORT
const MONGODB_URI =process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI

export default{
  PORT,
  MONGODB_URI
}