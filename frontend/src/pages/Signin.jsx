
// // export default Signin
// import React, { useState } from 'react';
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// const Signin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:3000/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
      

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         return;
//       }

//       // Save JWT to localStorage
//       localStorage.setItem("token", data.jwt);
//       localStorage.setItem("email", email); // Optional: for use in blog submissions, etc.

//       // Redirect to profile or homepage
//       navigate("/"); // or "/home", adjust as needed
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong during sign in.",err);
//     }
//   };

//   return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    //   <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    //     <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
    //       Sign In to Your Account
    //     </h2>

    //     <form className="space-y-6" onSubmit={handleSubmit}>
    //       <div>
    //         <Label htmlFor="email">Email</Label>
    //         <Input
    //           id="email"
    //           type="email"
    //           placeholder="you@example.com"
    //           className="mt-1"
    //           required
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>

    //       <div>
    //         <Label htmlFor="password">Password</Label>
    //         <Input
    //           id="password"
    //           type="password"
    //           placeholder="••••••••"
    //           className="mt-1"
    //           required
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>

    //       <Button type="submit" className="w-full mt-4">
    //         Sign In
    //       </Button>
    //     </form>

    //     <p className="text-sm text-center text-gray-500 mt-6">
    //       Don't have an account?{" "}
    //       <a href="/signup" className="text-blue-600 hover:underline">
    //         Sign up here
    //       </a>
    //     </p>
    //   </div>
    // </div>
//   );
// };

// export default Signin;




import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import animationData from "@/assets/animations/signin_animation.json";

import { useEffect } from 'react';  

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.jwt);
      localStorage.setItem("email", email);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during sign in.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 m-20px-4">
      {/* Left - Form */}
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-gray-100">
        <Lottie animationData={animationData} loop autoplay className="w-3/4 h-auto" />
      </div>
      

      {/* Right - Form */}
      <div className=" min-h-screen flex items-center justify-center bg-gray-100 px-0 lg:w-1/2 p-8 lg:p-0">
      <div className="w-full max-w-md  bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Sign In to Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
    
      {/* <div className="w-[100px] lg:w-1/2 p-8 lg:p-16 bg-white shadow-xl rounded-none lg:rounded-l-2xl z-10 ">
      <div className='  items-center justify-center  px-4'>
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center lg:text-left">
          Sign In to Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full mt-4">
            Sign In
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
      </div> */}
      
    </div> 
  );
};

export default Signin;

