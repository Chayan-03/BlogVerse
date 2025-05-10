import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {Input}  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";


const EditPost = () => {
  const { id } = useParams(); // post ID from route
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewposts/${id}`, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        });
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching post:", err);
        alert("Could not load post data.");
        navigate("/myposts");
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      const email = localStorage.getItem("email");
      await axios.put(
        `http://localhost:3000/editpost/${id}`,
        { title, content, email },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        }
      );
      navigate("/myposts");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Blog Post</h2>
        <Input
          className="mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
        <textarea
          className="w-full border rounded-md p-2 h-40 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
        />
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/myposts")}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
