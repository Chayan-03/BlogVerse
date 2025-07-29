import { Button } from "@/components/ui/button";
import { HomeIcon, SearchIcon, BellIcon, PenLine, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const AppSidebar = () => {
    const navigate = useNavigate();
    return (
        <aside className="w-[250px] border-r px-6 py-4 hidden md:flex flex-col gap-6 sticky top-0 h-screen">
            <h1 className="text-2xl font-bold text-blue-600">BlogVerse</h1>

            <nav className="space-y-4 text-lg font-medium">
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <HomeIcon size={20} /> <Link to="/">
                        Home
                    </Link>
                </div>
                {/* <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <SearchIcon size={20} /> <a href="/explore">
                        Explore
                    </a>
                </div> */}
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <BellIcon size={20} /> <Link to="/myposts">
                        My Posts
                    </Link>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <PenLine size={20} /> <Link to="/write">
                        Write
                    </Link>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:text-blue-600">
                    <User size={20} /> <Link to="/profile">
                        Profile
                    </Link>
                </div>
            </nav>

            <Button
                className="w-full rounded-full mb-auto"
                onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("email");
                        //window.location.href = "/signin";
                        navigate("/signin");
                    }
                }}

            >
                Log Out
            </Button>

        </aside>
    )
}
export default AppSidebar