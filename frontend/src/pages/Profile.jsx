import React, { useState, useEffect, useRef } from "react";
import AppSidebar from "@/Helpers/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { Pencil } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const fileInputRef = useRef(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile`, {
          headers: { Authorization: `${token}` },
        });
        setUser(res.data);
        setFormData({ name: res.data.name, bio: res.data.bio || "" });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile/update`, formData, {
        headers: { Authorization: `${token}` },
      });
      setUser(res.data.user);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
      console.error("Profile update error:", error);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile/update-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }, {
        headers: { Authorization: `${token}` },
      });
      alert("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password.");
      console.error("Password update error:", error);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('profileImage', file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/profile/upload-image`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });
      setUser(res.data.user); // Update user state with new image URL
      alert('Profile image updated!');
    } catch (error) {
      alert('Failed to upload image.');
      console.error('Image upload error:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
      <div className="min-h-screen flex bg-[#f9fafb] text-gray-900">
        <AppSidebar />

        <main className="flex-1 px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Your Profile</h2>

            <Card className="shadow-lg border border-gray-200 rounded-xl">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                      <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-0 right-0 bg-white rounded-full p-1 border shadow-md hover:bg-gray-100"
                    >
                      <Pencil size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={formData.name} onChange={handleFormChange} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user.email} disabled />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" value={formData.bio} onChange={handleFormChange} placeholder="Tell us about yourself..." />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4 w-full md:w-auto">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="shadow-md border border-gray-200 rounded-xl">
              <CardContent className="p-6 space-y-4">
                <h4 className="text-lg font-medium">Change Password</h4>
                <form className="space-y-4" onSubmit={handlePasswordUpdate}>
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} required />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />
                    </div>
                  </div>
                  <Button variant="outline" type="submit" className="mt-4">
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
  );
};

export default Profile;

