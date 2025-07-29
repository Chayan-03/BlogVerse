import React from 'react';

const PostCardSkeleton = () => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
                <div className="h-3 w-16 rounded bg-gray-200 animate-pulse"></div>
            </div>
        </div>
        <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse"></div>
        </div>
    </div>
);

export default PostCardSkeleton;
