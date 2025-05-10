import React from 'react'
import AppSidebar from '@/Helpers/AppSidebar'






const Explore = () => {
  return (
    <div className="min-h-screen flex bg-white text-black p-0 ">
    {/* Left Sidebar */}
    {/* <AppSidebar/> */}
    {/* Main Contebnt */}
    Explore 
</div>
  )
}

export default Explore




// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { useHistory } from "react-router-dom"; // Use this for navigation
// import AppSidebar from "@/Helpers/AppSidebar"; // Import AppSidebar

// const Explore = () => {
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const history = useHistory();

//     // Fetch posts from the backend
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const res = await axios.get("http://localhost:3000/exploreposts"); // Endpoint for fetching all posts
//                 setPosts(res.data.blogs); // Assuming the data has the `blogs` property
//             } catch (err) {
//                 setError("Error fetching posts.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);

//     // Navigate to post details page
//     const viewPostDetails = (postId) => {
//         history.push(`/post/${postId}`);
//     };

//     return (
//         <div className="min-h-screen flex bg-white text-black p-0">
//             {/* App Sidebar */}
//             <AppSidebar />

//             <main className="flex-1 px-6 py-10">
//                 <div className="max-w-4xl mx-auto space-y-8">
//                     <h2 className="text-3xl font-bold">Explore Posts</h2>

//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : error ? (
//                         <p className="text-red-500">{error}</p>
//                     ) : (
//                         <div>
//                             {posts.length > 0 ? (
//                                 posts.map((post) => (
//                                     <Card key={post._id} className="shadow-md border rounded-lg p-4 space-y-2">
//                                         <CardContent>
//                                             <h3 className="text-xl font-semibold">{post.title}</h3>
//                                             <p className="text-gray-600 text-sm mb-2">{post.content.slice(0, 120)}...</p>
//                                             <Button
//                                                 variant="outline"
//                                                 onClick={() => viewPostDetails(post._id)} // Navigate to post details
//                                             >
//                                                 View Details
//                                             </Button>
//                                         </CardContent>
//                                     </Card>
//                                 ))
//                             ) : (
//                                 <p className="text-gray-600">No posts found.</p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Explore;
