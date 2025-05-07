
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { HomeIcon, SearchIcon, BellIcon, PenLine, User } from "lucide-react";
const AppSidebar = () => {
    return (
        <aside className="w-[250px] border-r px-6 py-4 hidden md:flex flex-col gap-6 sticky top-0 h-screen">
            <h1 className="text-2xl font-bold text-blue-600">BlogVerse</h1>

            <nav className="space-y-4 text-lg font-medium">
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <HomeIcon size={20} /> <a href="/">
                        Home
                    </a>
                </div>
                {/* <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <SearchIcon size={20} /> <a href="/explore">
                        Explore
                    </a>
                </div> */}
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <BellIcon size={20} /> <a href="/myposts">
                        My Posts
                    </a>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <PenLine size={20} /> <a href="/write">
                        Write
                    </a>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <User size={20} /> <a href="/profile">
                        Profile
                    </a>
                </div>
            </nav>

            <Button
                className="w-full rounded-full mt-auto"
                onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("email");
                        window.location.href = "/signin";
                    }
                }}

            >
                Log Out
            </Button>

        </aside>
    )
}
export default AppSidebar