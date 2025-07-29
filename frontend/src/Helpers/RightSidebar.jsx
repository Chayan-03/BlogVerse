import React, { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link

export default function RightSidebar() {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = ['AI', 'Tech', 'Blockchain', 'Web Dev', 'Programming', 'Life', 'Nature', 'Exploration','General','Finance','Politics','World','Trade','Religion'];

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/users/suggestions`, {
                    headers: { Authorization: `${token}` },
                });
                setSuggestions(res.data);
            } catch (error) {
                console.error("Failed to fetch suggestions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, []);

    return (
        <aside className="w-[350px] hidden lg:block px-6 py-4 space-y-6 sticky top-0 h-screen">
            {/* "Who to Follow" Section */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold mb-4">Who to Follow</h4>
                <div className="space-y-4">
                    {loading ? (
                        <p className="text-sm text-gray-500">Loading suggestions...</p>
                    ) : suggestions.length > 0 ? (
                        suggestions.map((user) => (
                            <div key={user._id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                                        <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-sm">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline">Follow</Button>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No new users to suggest.</p>
                    )}
                </div>
            </div>

            {/* "Categories" Section */}
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h4 className="font-semibold mb-3">Categories</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                    {categories.map(category => (
                        <li key={category}>
                            <Link to={`/category/${category}`} className="hover:text-blue-600 hover:underline">
                                #{category.replace(' ', '')}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

