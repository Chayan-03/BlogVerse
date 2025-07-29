// import mongoose from "mongoose";
//
//
// const blogSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     sentiment: String,
//     createdAt: { type: Date, default: Date.now },
//     userEmail: String,
// })
// const Blog = mongoose.model('Blog', blogSchema ,'blogs');
// export default Blog;

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    sentiment: String,
    category: { type: String, default: 'General' },
    createdAt: { type: Date, default: Date.now },
    userEmail: String,
});

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
export default Blog;
