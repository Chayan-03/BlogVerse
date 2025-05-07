import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
import verifytoken from './middleware/auth.js';
import Blog from './models/blogModel.js';
import { analyzeSentiment } from './supporters/gemini.js';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.json());

// Enable CORS for your frontend (localhost:5173)
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); // Use CORS middleware
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, { dbName: 'blog_mern' })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("not connect ted to Databse - ", err));




app.post('/viewposts', verifytoken, async (req, res) => {
    const { email } = req.body;
    try {
        //check for existing yuser in the database
        const blogs = await Blog.find({ userEmail: email });
        if (!blogs) {
            return res.status(404).json({ message: 'No blogs found' });
        }
        res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


app.post('/submitblog',verifytoken, async (req, res) => {
    try {
        const { title, content ,email } = req.body;

        const sentiment = await analyzeSentiment(content);
        
        if (!['Positive', 'Neutral', 'Negative'].includes(sentiment)) {
            return res.status(400).json({ message: 'Could not determine sentiment' });
        }
        // if(sentiment == 'Negative'){
        //     return res.status(400).json({ message: 'The Blog Does not seems appropriate for the platform and for other viewers' });
        // }
        
        else{
        const newBlog = new Blog({
            title,
            content,
            sentiment,
            userEmail: email,
        });
        await newBlog.save();
        res.status(200).json({ message: 'Blog submitted successfully', sentiment });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/checkblogs', (req,res)=>{
    //here the blog or text will go to gemini api and the response from gemini api will be sent to the client
    //and the response will be stored in the database

    const { text } = req.body;

})

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        
        const checkUser = await User.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            name,
            email,
            password,
            bio,
        })
        await newUser.save();
        res.status(200).json({
            message: "User created successfully",
            jwt: jwt.sign({ email: email, password: password }, process.env.JWT_SECRET)
        });
        
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.post('/login',  async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        res.status(200).json({
            message: "User logged in successfully",
            jwt: jwt.sign({ email: email, password: password }, process.env.JWT_SECRET)
        });
    } catch (err) {
        
        res.status(500).json({ message: "Internal server error" });
    }

})
//endpoint for deleting the blogsa as  - 
app.delete('/deletepost/:id', verifytoken, async (req, res) => {
    const blogId = req.params.id;
    const userEmail = req.body.email; 
    
    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: "Blog post not found." });
        }

        if (blog.userEmail !== userEmail) {
            return res.status(403).json({ message: "Unauthorized to delete this blog post."});
        }

        await Blog.findByIdAndDelete(blogId);
        res.json({ message: "Blog post deleted successfully." });

    } catch (err) {
        console.error("Delete error:");
        res.status(500).json({ message: "Server error while deleting post." });
    }
})

app.put('/editpost/:id', verifytoken, async (req, res) => {
    const { title, content, email } = req.body;
    const { id } = req.params;

    try {
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userEmail !== email) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error during update" });
    }
});

// app.get('/exploreposts', verifytoken, async (req, res) => {
//     const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 posts

//     try {
//         // Fetch posts with pagination
//         const posts = await Blog.find()
//             .skip((page - 1) * limit)  // Skip the number of posts for the current page
//             .limit(Number(limit));     // Limit the number of posts per page

//         const totalPosts = await Blog.countDocuments(); // Get the total number of posts

//         res.json({
//             blogs: posts,
//             totalPosts,
//             totalPages: Math.ceil(totalPosts / limit), // Calculate the total pages
//             currentPage: Number(page),
//         });
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         res.status(500).json({ message: "Error fetching posts" });
//     }
// });


app.get('/exploreposts', verifytoken, async (req, res) => {
    const userEmail = req.user.email; // From decoded token via verifytoken

    try {
        // Fetch all posts except those by the current user
        const posts = await Blog.find({ userEmail: { $ne: userEmail } });

        res.json({ blogs: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});



app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${PORT}`);
})