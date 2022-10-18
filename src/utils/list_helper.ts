import { IBlog } from "../../types/types";

const dummy = (blogs:IBlog[]) => {
   return blogs.length === 1
}

const totalLikes = (blogs:IBlog[]) => {
    return blogs.reduce((item, acc)=>{
        return item + acc.likes
    },0)
}

const favoriteBlog = (blogs:IBlog[]) => {
   return blogs.reduce((prevBlog,currentBlog)=>{
    return prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog
   })
}

const authorWithMostBlogs = (blogs:IBlog[]) => {
    const result = blogs.reduce((prevBlog:any,currentBlog) => {
        let knownBlog = prevBlog.find((found: {author:string}) => {
            return found.author === currentBlog.author
        })

        if(!knownBlog) {
            return prevBlog.concat({author:currentBlog.author, blogs:1})
        }

        knownBlog.blogs++;
        return prevBlog
    },[])

    return result.reduce((a: { blogs: number; },b: { blogs: number; }) => {a.blogs > b.blogs ? a : b})
}
// const getMostLikes = (blogs:IBlog[]) => {
//     return blogs.reduce(({sums,most}, {likes, author}) => {
//         sums[author as keyof typeof sums]  = likes = (sums[author as keyof typeof sums] || 0) + likes
//         if(likes > most.likes) most = {author, likes}
//         return {sums, most}
//     }, {sums:{}, most:{likes:0}}).most
// }
const mostLikes = (blogs:IBlog[]) => {
   const result = blogs.reduce((prevBlog:any,currentBlog) => {
    
    let knownBlog = prevBlog.find((found: { author: string; }) => {
        return found.author === currentBlog.author
    })

    if(!knownBlog) {
        return prevBlog.concat({author:currentBlog.author, likes:currentBlog.likes})
    }

    knownBlog.likes += currentBlog.likes
    return prevBlog
   },[])

   return result.reduce((a: { likes: number; }, b: { likes: number; }) => (a.likes > b.likes ? a : b))
}






export default {
    dummy,
    totalLikes,
    favoriteBlog,
    authorWithMostBlogs,
    mostLikes
}