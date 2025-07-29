import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/userModel.js';
import verifytoken from './middleware/auth.js';
import Blog from './models/blogModel.js';
import { analyzeSentiment } from './supporters/gemini.js';
import { analyzeCategory } from './supporters/gemini.js';
import bcrypt from 'bcryptjs';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());




const corsOptions = {
  origin: "https://blogverse-eight.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); 
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, { dbName: 'blog_mern' })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("not connect ted to Databse - ", err));



//////////////////////////////////////////////////////////////////////////
//NEW ENFDPOINTS FOR THE PROFILE LOGIN AND REFISTER

app.get('/profile', verifytoken, async (req, res) => {
    try {
        // req.user is attached by the verifytoken middleware
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from the result
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to update user profile (name and bio)
app.put('/profile/update', verifytoken, async (req, res) => {
    try {
        const { name, bio } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, bio },
            { new: true } // This option returns the updated document
        ).select('-password');

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to update user password
app.put('/profile/update-password', verifytoken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // IMPORTANT: Use bcrypt to compare the provided password with the stored hash
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }

        // Hash the new password before saving it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/register', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User({ name, email, password, bio });

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully", jwt: token });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// And your updated /login endpoint:
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "User logged in successfully",
            jwt: token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


//////////////////////////////////////////////////////////////////////////////////////////////

// Enpoint to viewPosts 
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

//endpoint to Submit the blog
// app.post('/submitblog',verifytoken, async (req, res) => {
//     try {
//         const { title, content ,email } = req.body;
//
//         const sentiment = await analyzeSentiment(content);
//
//         if (!['Positive', 'Neutral', 'Negative'].includes(sentiment)) {
//             return res.status(400).json({ message: 'Could not determine sentiment' });
//         }
//
//         else{
//         const newBlog = new Blog({
//             title,
//             content,
//             sentiment,
//             userEmail: email,
//         });
//         await newBlog.save();
//         res.status(200).json({ message: 'Blog submitted successfully', sentiment });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


/////////////////////////////////////////////////////////////
//NEW ENDPOINT FOR SUBMIT BLOGS
app.post('/submitblog', verifytoken, async (req, res) => {
    try {
        const { title, content, email } = req.body;

        // Analyze sentiment and category in parallel
        const [sentiment, category] = await Promise.all([
            analyzeSentiment(content),
            analyzeCategory(content)
        ]);

        if (!['Positive', 'Neutral', 'Negative'].includes(sentiment)) {
            return res.status(400).json({ message: 'Could not determine sentiment' });
        }

        const newBlog = new Blog({
            title,
            content,
            sentiment,
            category, // Save the category
            userEmail: email,
        });
        await newBlog.save();
        res.status(200).json({ message: 'Blog submitted successfully', sentiment, category });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error',error : error });
    }
});
////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////
//OLD ENDPOINTS FOR REGISTER AND LOGIN

// //endpoint to register the user
// app.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, bio } = req.body;
//
//         const checkUser = await User.findOne({ email: email });
//         if (checkUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         const newUser = new User({
//             name,
//             email,
//             password,
//             bio,
//         })
//         await newUser.save();
//         res.status(200).json({
//             message: "User created successfully",
//             jwt: jwt.sign({ email: email, password: password }, process.env.JWT_SECRET)
//         });
//
//     } catch (err) {
//         return res.status(500).json({ message: "Internal server error" });
//     }
// })
//
//
// //endpoint to login the user
// app.post('/login',  async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//         if (user.password !== password) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }
//
//         res.status(200).json({
//             message: "User logged in successfully",
//             jwt: jwt.sign({ email: email, password: password }, process.env.JWT_SECRET)
//         });
//     } catch (err) {
//
//         res.status(500).json({ message: "Internal server error" });
//     }
//
// })

///////////////////////////////////////////////////////////////////////////////////


//endpoint for deleting the blogs
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



//endpoint to fetch all posts for exploration
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

app.get('/blogs/category/:categoryName', verifytoken, async (req, res) => {
    try {
        const { categoryName } = req.params;
        const blogs = await Blog.find({ category: categoryName });
        res.status(200).json({ blogs });
    } catch (error) {
        console.error("Error fetching blogs by category:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})