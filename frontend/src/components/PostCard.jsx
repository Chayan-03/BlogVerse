import React from 'react';

const PostCard = ({ post, onPostSelect }) => {
    const getSentimentClass = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'text-green-700 bg-green-100';
            case 'Neutral': return 'text-yellow-700 bg-yellow-100';
            case 'Negative': return 'text-red-700 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div
            className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 text-left cursor-pointer group"
            onClick={() => onPostSelect(post)}
        >
            <div className="flex items-center gap-3 mb-4">
                <img className="h-9 w-9 rounded-full" src={post.profileImage || `https://ui-avatars.com/api/?name=${post.userEmail}&background=random`} alt={post.userEmail} />
                <div>
                    <p className="font-semibold text-sm text-gray-800">{post.userEmail}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                {post.content}
            </p>
            <div className="flex items-center justify-end mt-5 pt-4 border-t border-gray-100">
                 <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getSentimentClass(post.sentiment)}`}>
                    {post.sentiment}
                </span>
            </div>
        </div>
    );
};

export default PostCard;
