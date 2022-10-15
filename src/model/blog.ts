import { model, Schema } from 'mongoose'
import { IBlog } from '../../types/types'

const blogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes:{type:Number,required:true}
})

blogSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id 
        delete returnedObject.__v
    }
})

const Blog = model<IBlog>('Blog', blogSchema)

export default Blog


