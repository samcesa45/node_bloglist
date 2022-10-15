"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    likes: { type: Number, required: true }
});
blogSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
            delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Blog = (0, mongoose_1.model)('Blog', blogSchema);
exports.default = Blog;
