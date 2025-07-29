import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import animationData from "@/assets/animations/signin_animation.json";
import { Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';



const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors on a new submission

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Instead of alert, set the error state
        setError(data.message || "Login failed. Please check your credentials.");
        return;
      }

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (err) {
      console.error(err);
      // Set a generic error message for network or other issues
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <AuthLayout animationData={animationData}>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">BlogVerse</h1>
            <h2 className="text-2xl font-semibold text-gray-800">Sign In to Your Account</h2>
            <p className="text-gray-500 mt-1">Welcome back! Please enter your details.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Conditionally render the error message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full py-3" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </AuthLayout>
  );
};

export default Signin;

