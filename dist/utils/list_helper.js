"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummy = (blogs) => {
    return blogs.length === 1;
};
const totalLikes = (blogs) => {
    return blogs.reduce((item, acc) => {
        return item + acc.likes;
    }, 0);
};
const favoriteBlog = (blogs) => {
    return blogs.reduce((prevBlog, currentBlog) => {
        return prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog;
    });
};
const authorWithMostBlogs = (blogs) => {
    const result = blogs.reduce((prevBlog, currentBlog) => {
        let knownBlog = prevBlog.find((found) => {
            return found.author === currentBlog.author;
        });
        if (!knownBlog) {
            return prevBlog.concat({ author: currentBlog.author, blogs: 1 });
        }
        knownBlog.blogs++;
        return prevBlog;
    }, []);
    return result.reduce((a, b) => { a.blogs > b.blogs ? a : b; });
};
// const getMostLikes = (blogs:IBlog[]) => {
//     return blogs.reduce(({sums,most}, {likes, author}) => {
//         sums[author as keyof typeof sums]  = likes = (sums[author as keyof typeof sums] || 0) + likes
//         if(likes > most.likes) most = {author, likes}
//         return {sums, most}
//     }, {sums:{}, most:{likes:0}}).most
// }
const mostLikes = (blogs) => {
    const result = blogs.reduce((prevBlog, currentBlog) => {
        let knownBlog = prevBlog.find((found) => {
            return found.author === currentBlog.author;
        });
        if (!knownBlog) {
            return prevBlog.concat({ author: currentBlog.author, likes: currentBlog.likes });
        }
        knownBlog.likes += currentBlog.likes;
        return prevBlog;
    }, []);
    return result.reduce((a, b) => (a.likes > b.likes ? a : b));
};
exports.default = {
    dummy,
    totalLikes,
    favoriteBlog,
    authorWithMostBlogs,
    mostLikes
};
