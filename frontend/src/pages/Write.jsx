
import React, { useState } from "react"
import AppSidebar from "@/Helpers/AppSidebar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import axios from "axios"
const Write = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email") // <-- user email must be included
        

       
        const contentdata = {
            title,
            content,
            email, // <-- include email
        }
        

        try {

            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/submitblog`,  // ✅ correct endpoint
                contentdata,
                {
                    headers: {
                        Authorization: `${token}`,
                        "Content-Type": "application/json"
                    },
                }
            )
            const data = res.data  // ✅ correct way for Axios

        alert(`✅ Blog submitted successfully with ${data.sentiment} sentiment!`)
        setTitle("")
        setContent("")
        setImage(null)

    } catch (err) {
        console.error("Blog submission error:", err)
        if (err.response?.data?.message) {
            alert(`❌ ${err.response.data.message}`)
        } else {
            alert("Something went wrong while submitting the blog.")
        }
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="min-h-screen flex bg-[#f9fafb] text-gray-800">
            <AppSidebar />
            <main className="flex-1 px-8 py-5">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8 pt-0">
                    <h1 className="text-3xl font-bold text-gray-900">Create a Blog</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="title">Blog Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. The Future of AI"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-2"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Start writing your thoughts here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mt-2 min-h-[200px] resize-y"
                                required
                            />
                        </div>

                        

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-40 text-lg py-6 font-semibold tracking-wide rounded-full"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin w-5 h-5" /> Submitting...
                                </span>
                            ) : (
                                "Publish Blog"
                            )}
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Write
