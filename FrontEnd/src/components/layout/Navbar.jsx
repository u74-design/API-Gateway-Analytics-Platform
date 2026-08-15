import {
    Bell,
    Moon,
    ChevronDown,
    User,
    LogOut,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const navigate = useNavigate();

    // Get user from localStorage safely
    const getStoredUser = () => {
        try {
            const storedUser = localStorage.getItem("user");

            if (!storedUser || storedUser === "undefined") {
                return null;
            }

            return JSON.parse(storedUser);
        } catch (error) {
            console.error("Invalid user data in localStorage:", error);

            // Remove corrupted data
            localStorage.removeItem("user");

            return null;
        }
    };

    const user = getStoredUser();

    const userName = user?.name || "User";

    const firstLetter = userName
        .charAt(0)
        .toUpperCase();


    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };


    // Profile
    const handleProfile = () => {
        setOpenDropdown(false);

        navigate("/profile");
    };


    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#09090B]/80 px-6 backdrop-blur-md">

            {/* Left */}

            <div>
                <p className="text-sm text-gray-400">
                    API Gateway & Analytics Platform
                </p>
            </div>


            {/* Right */}

            <div className="flex items-center gap-4">

                {/* Theme */}

                <button
                    className="
                    rounded-xl
                    border
                    border-white/10
                    p-2.5
                    text-gray-400
                    transition
                    hover:border-indigo-500
                    hover:text-white
                    "
                >
                    <Moon size={18} />
                </button>


                {/* Notifications */}

                <button
                    className="
                    relative
                    rounded-xl
                    border
                    border-white/10
                    p-2.5
                    text-gray-400
                    transition
                    hover:border-indigo-500
                    hover:text-white
                    "
                >
                    <Bell size={18} />

                    <span
                        className="
                        absolute
                        right-2
                        top-2
                        h-2
                        w-2
                        rounded-full
                        bg-red-500
                        "
                    />
                </button>


                {/* User */}

                <div className="relative">

                    {/* User Button */}

                    <button
                        onClick={() =>
                            setOpenDropdown((prev) => !prev)
                        }
                        className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-white/10
                        px-3
                        py-2
                        transition
                        hover:border-indigo-500
                        "
                    >

                        {/* Avatar */}

                        <div
                            className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-indigo-600
                            font-semibold
                            "
                        >
                            {firstLetter}
                        </div>


                        {/* User Information */}

                        <div className="text-left">

                            <h2 className="text-sm font-medium text-white">
                                {userName}
                            </h2>

                            <p className="text-xs text-gray-400">
                                Developer
                            </p>

                        </div>


                        {/* Arrow */}

                        <ChevronDown
                            size={16}
                            className={`text-gray-500 transition-transform ${
                                openDropdown
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />

                    </button>


                    {/* Dropdown */}

                    {openDropdown && (

                        <div
                            className="
                            absolute
                            right-0
                            mt-2
                            w-48
                            overflow-hidden
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111113]
                            shadow-2xl
                            "
                        >

                            {/* Profile */}

                            <button
                                onClick={handleProfile}
                                className="
                                flex
                                w-full
                                items-center
                                gap-3
                                px-4
                                py-3
                                text-sm
                                text-gray-300
                                transition
                                hover:bg-white/5
                                hover:text-white
                                "
                            >

                                <User size={17} />

                                <span>
                                    Profile
                                </span>

                            </button>


                            {/* Divider */}

                            <div className="border-t border-white/10" />


                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="
                                flex
                                w-full
                                items-center
                                gap-3
                                px-4
                                py-3
                                text-sm
                                text-red-400
                                transition
                                hover:bg-red-500/10
                                "
                            >

                                <LogOut size={17} />

                                <span>
                                    Logout
                                </span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

        </header>
    );
};

export default Navbar;



