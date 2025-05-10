import React, { useEffect, useState } from "react"
import AppSidebar from "@/Helpers/AppSidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Pencil } from "lucide-react"
import axios from "axios"
import { ExportToExcel } from "@/utils/Exporttoecxel";





const Myposts = () => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState("")
    const [filteredPosts, setFilteredPosts] = useState([])

    // State for modal visibility and the post being edited
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [postToEdit, setPostToEdit] = useState(null)
    const [updatedTitle, setUpdatedTitle] = useState("")
    const [updatedContent, setUpdatedContent] = useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const email = localStorage.getItem("email");

                const res = await axios.post(
                    "http://localhost:3000/viewposts",
                    { email },
                    {
                        headers: {
                            Authorization: `${token}`
                        }
                    }
                );
                const userBlogs = res.data.blogs;
                setPosts(userBlogs);
                setFilteredPosts(userBlogs);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };
        fetchPosts()
    }, [])

    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase())
        )
        setFilteredPosts(results)
    }, [search, posts])

    const handleDelete = async (id) => {
        const email = localStorage.getItem("email");
        const confirmed = window.confirm("Are you sure you want to delete this blog post?");

        if (!confirmed) return;

        try {
            const res = axios.delete(`http://localhost:3000/deletepost/${id}`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                },
                data: { email }
            });

            setPosts(prev => prev.filter(post => post._id !== id));
        } catch (err) {
            console.error("Error deleting post:", err);
            alert("Failed to delete the post.");
        }
    };

    // Modal open/close and form handling
    const openModal = (post) => {
        setPostToEdit(post);
        setUpdatedTitle(post.title);
        setUpdatedContent(post.content);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setPostToEdit(null);
        setUpdatedTitle("");
        setUpdatedContent("");
    }

    const handleUpdatePost = async () => {
        try {
            const email = localStorage.getItem("email"); // Get the email from local storage
            const res = await axios.put(
                `http://localhost:3000/editpost/${postToEdit._id}`,
                {
                    title: updatedTitle,
                    content: updatedContent,
                    email: email, // Send email as part of the body
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem("token")}`, // Send the token for authorization
                    },
                }
            );

            // If update is successful, update the UI to reflect the changes
            setPosts(prev => prev.map(post =>
                post._id === postToEdit._id
                    ? { ...post, title: updatedTitle, content: updatedContent }
                    : post
            ));

            closeModal(); // Close the modal after successful update
        } catch (err) {
            console.error("Error updating post:", err);
            alert("Failed to update the post.");
        }
    }


    return (
        <div className="min-h-screen flex bg-[#f9fafb] text-black">
            <AppSidebar />

            <main className="flex-1 px-6 py-10">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl font-bold">My Posts</h2>
                    <div className="flex justify-between items-center">
                        <Input
                            placeholder="Search your posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-64"
                        />
                        <Button
                            variant="outline"
                            onClick={() => ExportToExcel(posts)}
                        >
                            Download Posts
                        </Button>
                    </div>

                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <Card key={post._id} className="shadow-md border rounded-lg p-4 space-y-2">
                                <CardContent>
                                    <h3 className="text-xl font-bold text-left">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2 text-left">{post.content.slice(0, 120)}...</p>
                                    <div className="flex justify-end space-x-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => openModal(post)}
                                        >
                                            <Pencil className="w-4 h-4 mr-1" /> Edit
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                                        </Button>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 mt-1 text-left">
                                        Sentiment: <span className="capitalize">{post.sentiment}</span>
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center">No posts found.</p>
                    )}
                </div>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                        <h3 className="text-2xl mb-4">Edit Post</h3>
                        <div>
                            <label className="block mb-2" htmlFor="title">Title</label>
                            <input
                                id="title"
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2" htmlFor="content">Content</label>
                            <textarea
                                id="content"
                                value={updatedContent}
                                onChange={(e) => setUpdatedContent(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                            <Button variant="outline" onClick={closeModal}>Cancel</Button>
                            <Button variant="primary" onClick={handleUpdatePost}>Confirm</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Myposts
