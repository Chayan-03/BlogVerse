import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Pencil } from "lucide-react";

const MyPostCard = ({ post, onEdit, onDelete }) => {
    const getSentimentClass = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'text-green-700 bg-green-100';
            case 'Neutral': return 'text-yellow-700 bg-yellow-100';
            case 'Negative': return 'text-red-700 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <Card className="shadow-md border rounded-xl overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800">{post.title}</h3>
                        <p className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mt-2 ${getSentimentClass(post.sentiment)}`}>
                            {post.sentiment}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => onEdit(post)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => onDelete(post._id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-gray-100 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </p>
            </CardContent>
        </Card>
    );
};

export default MyPostCard;
