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
const supertest_1 = __importDefault(require("supertest"));
const blog_1 = __importDefault(require("../model/blog"));
const app_1 = __importDefault(require("../app"));
const api = (0, supertest_1.default)(app_1.default);
const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
];
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield blog_1.default.deleteMany({});
    let blogObject = new blog_1.default(initialBlogs[0]);
    yield blogObject.save();
    blogObject = new blog_1.default(initialBlogs[1]);
    yield blogObject.save();
}));
test('it should return the correct amount of blog post in json format', () => __awaiter(void 0, void 0, void 0, function* () {
    yield api
        .get('/api/blogs');
    expect(200);
    expect('Content-Type').toBe(/application\/json/);
}), 100000);
test('it should return all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
}), 100000);
