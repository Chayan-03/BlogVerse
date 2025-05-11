// import React from 'react'
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from '@/components/ui/button';
// const Signup = () => {
//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//             <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//                     Create an Account
//                 </h2>

//                 <form className="space-y-5">
//                     <div>
//                         <Label htmlFor="name">Full Name</Label>
//                         <Input id="name" type="text" placeholder="John Doe" required />
//                     </div>

//                     <div>
//                         <Label htmlFor="username">Username</Label>
//                         <Input id="username" type="text" placeholder="johndoe123" required />
//                     </div>

//                     <div>
//                         <Label htmlFor="email">Email</Label>
//                         <Input id="email" type="email" placeholder="you@example.com" required />
//                     </div>

//                     <div>
//                         <Label htmlFor="password">Password</Label>
//                         <Input id="password" type="password" placeholder="••••••••" required />
//                     </div>

//                     <div>
//                         <Label htmlFor="confirmPassword">Confirm Password</Label>
//                         <Input id="confirmPassword" type="password" placeholder="••••••••" required />
//                     </div>

//                     <Button type="submit" className="w-full mt-2">
//                         Sign Up
//                     </Button>
//                 </form>

//                 <p className="text-sm text-center text-gray-500 mt-6">
//                     Already have an account?{" "}
//                     <a href="/signin" className="text-blue-600 hover:underline">
//                         Sign in here
//                     </a>
//                 </p>
//             </div>
//         </div>

//     )
// }

// export default Signup

import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import animationData from "@/assets/animations/signin_animation.json";
import Lottie from "lottie-react";



const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                bio: formData.username, // Using 'username' as 'bio' for now
            });

            // Save the JWT token to localStorage or sessionStorage
            localStorage.setItem('token', response.data.jwt);

            // Redirect to the login page or dashboard
            navigate('/signin');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (

        // <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        //     <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        //         <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        //             Create an Account
        //         </h2>

        //         {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        //         <form className="space-y-5" onSubmit={handleSubmit}>
        //             <div>
        //                 <Label htmlFor="name">Full Name</Label>
        //                 <Input
        //                     id="name"
        //                     type="text"
        //                     placeholder="John Doe"
        //                     value={formData.name}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>

        //             <div>
        //                 <Label htmlFor="username">Username</Label>
        //                 <Input
        //                     id="username"
        //                     type="text"
        //                     placeholder="johndoe123"
        //                     value={formData.username}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>

        //             <div>
        //                 <Label htmlFor="email">Email</Label>
        //                 <Input
        //                     id="email"
        //                     type="email"
        //                     placeholder="you@example.com"
        //                     value={formData.email}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>

        //             <div>
        //                 <Label htmlFor="password">Password</Label>
        //                 <Input
        //                     id="password"
        //                     type="password"
        //                     placeholder="••••••••"
        //                     value={formData.password}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>

        //             <div>
        //                 <Label htmlFor="confirmPassword">Confirm Password</Label>
        //                 <Input
        //                     id="confirmPassword"
        //                     type="password"
        //                     placeholder="••••••••"
        //                     value={formData.confirmPassword}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </div>

        //             <Button type="submit" className="w-full mt-2">
        //                 Sign Up
        //             </Button>
        //         </form>

        //         <p className="text-sm text-center text-gray-500 mt-6">
        //             Already have an account?{" "}
        //             <a href="/signin" className="text-blue-600 hover:underline">
        //                 Sign in here
        //             </a>
        //         </p>
        //     </div>
        // </div>
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-4">
            {/* Left - Form */}
            <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-gray-100">
                <Lottie animationData={animationData} loop autoplay className="w-3/4 h-auto" />
            </div>
            {/* Right - Form */}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 lg:w-1/2 p-8 lg:p-0">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                        Create an Account
                    </h2>

                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe123"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full mt-2">
                            Sign Up
                        </Button>
                    </form>

                    <p className="text-sm text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <a href="/signin" className="text-blue-600 hover:underline">
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
