import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HomeIcon, SearchIcon, BellIcon, PenLine, User } from "lucide-react";
import AppSidebar from "@/Helpers/AppSidebar";
import RightSidebar from "@/Helpers/RightSidebar";
import axios from "axios";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const userEmail = localStorage.getItem("email");

                const res = await axios.get("http://localhost:3000/exploreposts", {
                    headers: {
                        Authorization: token,
                    },
                });

                const allPosts = res.data.blogs || [];
                const otherUsersPosts = allPosts.filter(post => post.userEmail !== userEmail);

                setPosts(otherUsersPosts);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    return (
        
        <div className="min-h-screen flex bg-[#f9fafb] text-black p-0">
            {/* Left Sidebar */}
            <AppSidebar />

            {/* Center Feed */}
            <main className="flex-1 border-x min-h-screen p-6">
                <h2 className="text-2xl font-bold mb-4">Home</h2>

                {/* Blog Post Composer */}
                {/* <div className="bg-gray-100 rounded-xl p-4 mb-6">
                    <div className="flex gap-4 items-center mb-2">
                        <Avatar>
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Input placeholder="What's on your mind?" />
                    </div>
                    <Button className="ml-auto mt-2 rounded-full">Post</Button>
                </div> */}

                {/* Blog Feed */}
                <div className="space-y-6">
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : posts.length === 0 ? (
                        <p className="text-gray-600">No posts to show.</p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
                            >
                                <div className="flex flex-col gap-1 w-full">
                                    {/* Avatar and Email */}
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-white">
                                            {post.userEmail?.[0]?.toUpperCase() || "U"}
                                        </div>
                                        <span className="text-xs text-gray-800">{post.userEmail}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900">{post.title}</h3>
                                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                                        {post.content.length > 250
                                            ? `${post.content.slice(0, 250)}...`
                                            : post.content}
                                    </p>
                                    <div className="mt-4 text-xs text-gray-500">
                                        Sentiment:{" "}
                                        <span className="capitalize font-medium text-gray-600">
                                            {post.sentiment ?? "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            {/* Right Sidebar */}
            <RightSidebar/>
        </div>
        
    );
}
