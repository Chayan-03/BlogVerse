import React from "react"
import AppSidebar from "@/Helpers/AppSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const Profile = () => {
  return (
    <div className="min-h-screen flex bg-[#f9fafb] text-gray-900">
      <AppSidebar />

      <main className="flex-1 px-6 py-4">
        <div className="max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold">Your Profile</h2>

          <Card className="shadow-lg border border-gray-200 rounded-xl">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-600 text-sm">john.doe@email.com</p>
                </div>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div>
                    <Label>Username</Label>
                    <Input placeholder="@johndoe" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="john.doe@email.com" />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Input placeholder="Passionate writer and tech enthusiast." />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>New Password</Label>
                  <Input type="password" placeholder="********" />
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="********" />
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Profile
