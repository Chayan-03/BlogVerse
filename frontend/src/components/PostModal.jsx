//
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
//
//
//
// const PostModal = ({ post, onClose }) => {
//     if (!post) return null;
//
//     const getSentimentClass = (sentiment) => {
//         switch (sentiment) {
//             case 'Positive':
//                 return 'text-green-600';
//             case 'Neutral':
//                 return 'text-yellow-600';
//             case 'Negative':
//                 return 'text-red-600';
//             default:
//                 return 'text-gray-500';
//         }
//     };
//
//     return (
//         // MODIFICATION: Changed the background to be blurry and semi-transparent
//         <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4">
//             <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative">
//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute top-4 right-4 rounded-full"
//                     onClick={onClose}
//                 >
//                     &times;
//                 </Button>
//                 <div className="flex items-center gap-3 mb-4">
//                     <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
//                         {post.userEmail?.[0]?.toUpperCase() || "U"}
//                     </div>
//                     <span className="text-sm text-gray-800 font-medium">{post.userEmail}</span>
//                 </div>
//                 <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
//                 <p className="text-gray-700 whitespace-pre-wrap mb-6">{post.content}</p>
//                 <div className="text-sm font-medium text-gray-700">
//                     Sentiment:{" "}
//                     <span className={`capitalize font-semibold ${getSentimentClass(post.sentiment)}`}>
//                         {post.sentiment}
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default PostModal;


import React from 'react';
import { Button } from "@/components/ui/button";

const PostModal = ({ post, onClose }) => {
    if (!post) return null;

    const getSentimentClass = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'text-green-700 bg-green-100';
            case 'Neutral': return 'text-yellow-700 bg-yellow-100';
            case 'Negative': return 'text-red-700 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm z-50 p-4 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative transform animate-scale-in">
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 rounded-full" onClick={onClose}>
                    &times;
                </Button>
                <div className="flex items-center gap-3 mb-4">
                    <img className="h-9 w-9 rounded-full" src={post.profileImage || `https://ui-avatars.com/api/?name=${post.userEmail}&background=random`} alt={post.userEmail} />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{post.userEmail}</p>
                        <p className="text-xs text-gray-500">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4 text-slate-800">{post.title}</h2>
                <p className="text-gray-700 whitespace-pre-wrap mb-6 leading-relaxed">{post.content}</p>
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getSentimentClass(post.sentiment)}`}>
                        {post.sentiment}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostModal;
