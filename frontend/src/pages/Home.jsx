import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AppSidebar from "@/Helpers/AppSidebar";
import RightSidebar from "@/Helpers/RightSidebar";
import axios from "axios";
import { Search } from "lucide-react";
import PostCard from "@/components/PostCard";
import PostModal from "@/components/PostModal.jsx";
import PostCardSkeleton from "@/components/PostCardSkeleton";


export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/exploreposts`, {
                    headers: { Authorization: `${token}` },
                });
                setPosts(res.data.blogs || []);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        // MODIFICATION: Changed background color
        <div className="min-h-screen flex bg-slate-50 text-black">
            <AppSidebar />

            <main className="flex-1 border-x border-gray-200 min-h-screen">
                <div className="sticky top-0 bg-slate-50/80 backdrop-blur-lg border-b border-gray-200 px-6 py-4 z-10">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-800">Home Feed</h2>
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Search posts by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {loading ? (
                        <>
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                        </>
                    ) : error ? (
                        <div className="text-center py-10">
                            <p className="text-red-500">{error}</p>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-600">No posts found.</p>
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <PostCard key={post._id} post={post} onPostSelect={setSelectedPost} />
                        ))
                    )}
                </div>
            </main>

            <RightSidebar />

            {selectedPost && (
                <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
}
