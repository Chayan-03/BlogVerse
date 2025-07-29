import Lottie from "lottie-react";
import React from "react";

const AuthLayout = ({ children, animationData }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="hidden lg:flex flex-col items-center justify-center bg-blue-50 p-12 text-center">
                <Lottie animationData={animationData} loop autoplay className="w-full max-w-md" />
                <h2 className="text-3xl font-bold text-gray-800 mt-4">Welcome to BlogVerse</h2>
                <p className="text-gray-600 mt-2">Your new space to write, share, and discover.</p>
            </div>
            <div className="flex items-center justify-center p-8 sm:p-12">
                {children}
            </div>
        </div>
    </div>
);

export default AuthLayout;