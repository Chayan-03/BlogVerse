import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import animationData from "@/assets/animations/signin_animation.json";
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import AuthLayout from "@/components/AuthLayout.jsx";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // State for success message
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/register`, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                bio: `A new author on BlogVerse.`,
            });

            // Set success message and redirect after a short delay
            setSuccess("Account created successfully! Redirecting to sign in...");
            setTimeout(() => {
                navigate('/signin');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout animationData={animationData}>
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600 mb-2">BlogVerse</h1>
                    <h2 className="text-2xl font-semibold text-gray-800">Create Your Account</h2>
                    <p className="text-gray-500 mt-1">It's quick and easy.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="block sm:inline">{success}</span>
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required disabled={loading} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required disabled={loading} />
                    </div>
                    <Button type="submit" className="w-full py-3" disabled={loading || success}>
                        {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
                    </Button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-8">
                    Already have an account?{" "}
                    <Link to="/signin" className="font-semibold text-blue-600 hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Signup;
