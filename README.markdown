# BlogVerse - A Full-Stack Blogging Platform ✍️

![BlogVerse Banner](https://via.placeholder.com/1200x400.png?text=BlogVerse+Banner)

## Overview

**BlogVerse** is a full-stack blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, manage, and explore blogs with features like sentiment analysis, secure authentication, and Excel export. The platform is designed to provide a seamless blogging experience with a responsive UI and a robust backend.

### 🌟 Key Features
- **User Authentication**: Secure signup and login using JWT.
- **Blog Management**: Create, edit, delete, and view blog posts.
- **Sentiment Analysis**: Analyze the tone of blog content (Positive, Neutral, Negative) using the Gemini API.
- **Explore Posts**: Discover blogs from other users.
- **Excel Export**: Download your blog posts as an Excel file.
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS.

## 🚀 Demo & Links

- **Live Demo**: [https://blogverse-eight.vercel.app/](https://blogverse-eight.vercel.app/)
- **Backend API**: [https://blogverse-m7n5.onrender.com/](https://blogverse-m7n5.onrender.com/)
- **Video Demonstration**: Watch the demo on YouTube: [BlogVerse Demo: Build & Share Blogs with MERN Stack!](https://youtu.be/sCVrXPG76Z0)

## 🛠️ Tech Stack

### Frontend
- **React (v18)**: Dynamic and interactive UI.
- **Tailwind CSS**: Responsive styling.
- **Shadcn UI**: Modern UI components.
- **React Router (v6)**: Client-side routing.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Node.js (v18)**: Server runtime environment.
- **Express.js (v4)**: RESTful API framework.
- **MongoDB (v6)**: NoSQL database for storing users and blogs.
- **Mongoose**: ORM for MongoDB.
- **Gemini API**: For sentiment analysis of blog content.
- **JWT**: Secure user authentication.

### Deployment
- **Frontend**: Hosted on Vercel.
- **Backend**: Hosted on Render.
- **Database**: MongoDB Atlas.

## 📐 Architecture

BlogVerse follows a **3-tier architecture**:
1. **Frontend (React)**: Handles the UI and user interactions.
2. **Backend (Node.js, Express.js)**: Manages API endpoints, authentication, and sentiment analysis.
3. **Database (MongoDB)**: Stores user data and blog posts.

The app uses the **MVC pattern**:
- **Model**: Mongoose schemas for users and blogs.
- **View**: React components for rendering the UI.
- **Controller**: Express routes for handling requests.

### Workflow
- The frontend communicates with the backend via HTTP requests using `axios`.
- The backend processes requests, interacts with MongoDB, and returns JSON responses.
- JWT tokens are used for secure authentication and authorization.

## 🖥️ Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400.png?text=BlogVerse+Home+Page)

### Write Blog
![Write Blog](https://via.placeholder.com/800x400.png?text=BlogVerse+Write+Blog)

### My Posts
![My Posts](https://via.placeholder.com/800x400.png?text=BlogVerse+My+Posts)

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Gemini API key
- Vercel and Render accounts for deployment

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/blogverse.git
   cd blogverse
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the following:
     ```env
     MONGODB_URL=your_mongodb_atlas_connection_string
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add the backend API URL:
     ```env
     VITE_API_URL=https://blogverse-m7n5.onrender.com
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Access the App**:
   - Open your browser and go to `http://localhost:5173` to view the app locally.

## 📜 API Endpoints

### Authentication
- **POST /register**: Register a new user.
- **POST /login**: Log in and receive a JWT token.

### Blog Management
- **POST /submitblog**: Create a new blog post with sentiment analysis.
- **GET /viewposts**: Fetch the user’s blog posts.
- **GET /exploreposts**: Fetch posts from other users.
- **PUT /editpost/:id**: Update a blog post.
- **DELETE /deletepost/:id**: Delete a blog post.

## 🔒 Security Features
- **JWT Authentication**: Secure user sessions with JSON Web Tokens.
- **CORS**: Restricted to the frontend domain (`https://blogverse-eight.vercel.app`).
- **User Validation**: Ensures users can only edit or delete their own posts.

## 🛠️ Challenges Faced
- **CORS Issues**: Resolved by configuring CORS middleware.
- **Sentiment Analysis**: Added validation for Gemini API responses.
- **Security**: Plain-text passwords identified; recommended `bcrypt` for hashing.
- **Deployment**: Fixed routing issues on Vercel with `vercel.json`.

## 📈 Future Improvements
- **Enhanced Security**: Implement `bcrypt` for password hashing and add rate limiting.
- **Community Features**: Add comments and likes on blog posts.
- **Markdown Support**: Integrate a markdown editor for blog content.
- **Recommendations**: Suggest posts based on user interests.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project’s style guidelines.

## 📧 Contact
For any inquiries, reach out to me at [chayankhetan36@gmail.com](mailto:chayankhetan36@gmail.com).

## 📜 License
This project is licensed under the MIT License.

---

**Made with ❤️ by Chayan Khetan**