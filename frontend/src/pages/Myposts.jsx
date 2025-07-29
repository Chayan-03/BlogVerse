import React, { useEffect, useState } from "react";
import AppSidebar from "@/Helpers/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ExportToExcel } from "@/utils/Exporttoecxel";
import { Search } from "lucide-react";

// Import the new components
import MyPostCard from "@/components/MyPostCard";
import EditPostModal from "@/components/EditPostModal";
import ConfirmationModal from "@/components/ConfirmationModal";

const Myposts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // State for modals
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // State for data handling
    const [postToEdit, setPostToEdit] = useState(null);
    const [postToDeleteId, setPostToDeleteId] = useState(null);

    // State for UI messages
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Helper to clear messages after a delay
    const showTemporaryMessage = (setter, message) => {
        setter(message);
        setTimeout(() => {
            setter('');
        }, 3000); // Message disappears after 3 seconds
    };

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const email = localStorage.getItem("email");
                const res = await axios.post(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/viewposts`,
                    { email },
                    { headers: { Authorization: `${token}` } }
                );
                setPosts(res.data.blogs || []);
            } catch (err) {
                setErrorMessage("Failed to load your posts.");
                console.error("Error fetching posts:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleDeleteRequest = (id) => {
        setPostToDeleteId(id);
        setIsConfirmModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const email = localStorage.getItem("email");
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/deletepost/${postToDeleteId}`, {
                headers: { Authorization: `${localStorage.getItem("token")}` },
                data: { email }
            });
            setPosts(prev => prev.filter(post => post._id !== postToDeleteId));
            showTemporaryMessage(setSuccessMessage, "Post deleted successfully!");
        } catch (err) {
            showTemporaryMessage(setErrorMessage, "Failed to delete the post.");
            console.error("Error deleting post:", err);
        } finally {
            setIsConfirmModalOpen(false);
            setPostToDeleteId(null);
        }
    };

    const handleUpdatePost = async (id, updatedData) => {
        try {
            const email = localStorage.getItem("email");
            await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/editpost/${id}`,
                { ...updatedData, email },
                { headers: { Authorization: `${localStorage.getItem("token")}` } }
            );
            setPosts(prev => prev.map(post =>
                post._id === id ? { ...post, ...updatedData } : post
            ));
            closeEditModal();
            showTemporaryMessage(setSuccessMessage, "Post updated successfully!");
        } catch (err) {
            showTemporaryMessage(setErrorMessage, "Failed to update the post.");
            console.error("Error updating post:", err);
        }
    };

    const openEditModal = (post) => {
        setPostToEdit(post);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setPostToEdit(null);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex bg-slate-50 text-black">
            <AppSidebar />

            <main className="flex-1 px-6 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <h2 className="text-3xl font-bold text-slate-800">My Posts</h2>
                        <div className="flex items-center gap-4">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Search your posts..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Button variant="outline" onClick={() => ExportToExcel(posts)}>
                                Download
                            </Button>
                        </div>
                    </div>

                    {/* Success and Error Messages */}
                    {successMessage && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                            <p className="font-bold">Success</p>
                            <p>{successMessage}</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {loading ? (
                        <p>Loading your posts...</p>
                    ) : filteredPosts.length > 0 ? (
                        <div className="space-y-6">
                            {filteredPosts.map(post => (
                                <MyPostCard
                                    key={post._id}
                                    post={post}
                                    onEdit={openEditModal}
                                    onDelete={handleDeleteRequest}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl border">
                            <p className="text-gray-600">You haven't written any posts yet.</p>
                        </div>
                    )}
                </div>
            </main>

            <EditPostModal
                isOpen={isEditModalOpen}
                post={postToEdit}
                onClose={closeEditModal}
                onUpdate={handleUpdatePost}
            />

            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Post"
                message="Are you sure you want to delete this post? This action cannot be undone."
            />
        </div>
    );
};

export default Myposts;
