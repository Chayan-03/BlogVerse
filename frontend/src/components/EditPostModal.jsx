import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const EditPostModal = ({ post, isOpen, onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onUpdate(post._id, { title, content });
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative transform animate-scale-in">
                <h3 className="text-2xl mb-6 font-semibold text-slate-800">Edit Post</h3>
                <div className="space-y-4">
                    <div>
                        <Label className="font-medium" htmlFor="edit-title">Title</Label>
                        <Input
                            id="edit-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label className="font-medium" htmlFor="edit-content">Content</Label>
                        <Textarea
                            id="edit-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                        />
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
