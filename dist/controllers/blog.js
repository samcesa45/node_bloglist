"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = __importDefault(require("../model/blog"));
const blogsRouter = express_1.default.Router();
blogsRouter.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.find({});
        res.json(blogs);
    }
    catch (error) {
        next(error);
    }
}));
blogsRouter.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const blog = yield blog_1.default.findById(id);
        if (blog) {
            res.json(blog);
        }
        else {
            res.status(404);
        }
    }
    catch (error) {
        next(error);
    }
}));
blogsRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, url, likes } = req.body;
    if (title || author === undefined) {
        res.json(400).send({ error: 'title and author are missing' });
    }
    const blogs = new blog_1.default({
        title,
        author,
        url,
        likes
    });
    try {
        const savedBlogs = yield blogs.save();
        res.json(savedBlogs);
    }
    catch (error) {
        next(error);
    }
}));
blogsRouter.put('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, author, url, likes } = req.body;
    const blog = {
        title,
        author,
        url,
        likes
    };
    try {
        const updatedBlog = yield blog_1.default.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' });
        res.json(updatedBlog);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = blogsRouter;
