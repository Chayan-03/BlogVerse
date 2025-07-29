import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppSidebar from "@/Helpers/AppSidebar";
import RightSidebar from "@/Helpers/RightSidebar";
import PostModal from "@/components/PostModal";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/blogs/category/${categoryName}`, {
                    headers: { Authorization: `${token}` },
                });
                setPosts(res.data.blogs || []);
            } catch (err) {
                console.error(`Failed to fetch posts for category ${categoryName}:`, err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategoryPosts();
    }, [categoryName]); // Re-run effect when the category name changes

    const getSentimentClass = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'text-green-600';
            case 'Neutral': return 'text-yellow-600';
            case 'Negative': return 'text-red-600';
            default: return 'text-gray-500';
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f9fafb] text-black p-0">
            <AppSidebar />
            <main className="flex-1 border-x min-h-screen p-6">
                <h2 className="text-2xl font-bold mb-4">
                    Posts in <span className="text-blue-600">#{categoryName}</span>
                </h2>
                <div className="space-y-6">
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : posts.length === 0 ? (
                        <p className="text-gray-600 text-center">No posts found in this category.</p>
                    ) : (
                        posts.map((post) => (
                            <div
                                key={post._id}
                                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 text-left cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="flex flex-col gap-1 w-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-white">
                                            {post.userEmail?.[0]?.toUpperCase() || "U"}
                                        </div>
                                        <span className="text-xs text-gray-800">{post.userEmail}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
                                        {post.content.slice(0, 250)}...
                                    </p>
                                    <div className="mt-4 text-xs text-gray-500">
                                        Sentiment:{" "}
                                        <span className={`capitalize font-semibold ${getSentimentClass(post.sentiment)}`}>
                                            {post.sentiment ?? "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
            <RightSidebar />
            {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
        </div>
    );
}
