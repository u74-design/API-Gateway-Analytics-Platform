import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Calendar,
    Shield,
    LogOut,
    Lock,
} from "lucide-react";

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/SideBar";

import { GetProfile } from "../services/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await GetProfile();

                console.log("Profile:", data);

                if (data.success) {
                    setUser(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#09090B] text-white">
                <Sidebar />

                <main className="ml-72">
                    <Navbar />

                    <div className="flex items-center justify-center py-32">
                        <p className="text-gray-400">
                            Loading profile...
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#09090B] text-white">
                <Sidebar />

                <main className="ml-72">
                    <Navbar />

                    <div className="flex items-center justify-center py-32">
                        <p className="text-red-400">
                            Failed to load profile.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString(
              "en-IN",
              {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              }
          )
        : "N/A";

    return (
        <div className="min-h-screen bg-[#09090B] text-white">

            <Sidebar />

            <main className="ml-72">

                <Navbar />

                <div className="p-6">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold">
                            Profile
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Manage your account information and security.
                        </p>
                    </div>


                    {/* Profile Header */}
                    <div className="rounded-2xl border border-white/10 bg-[#111113] p-7">

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                            {/* Avatar */}
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
                                {user.name
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                            </div>


                            {/* User Info */}
                            <div className="flex-1">

                                <h2 className="text-2xl font-semibold">
                                    {user.name}
                                </h2>

                                <p className="mt-1 text-gray-400">
                                    {user.email}
                                </p>

                                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar size={15} />

                                    <span>
                                        Member since {joinedDate}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Account Information */}
                    <div className="mt-6">

                        <div className="mb-4">

                            <h2 className="text-xl font-semibold">
                                Account Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your basic account details.
                            </p>

                        </div>


                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Name */}
                            <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-indigo-500/10 p-2">
                                        <User
                                            size={18}
                                            className="text-indigo-400"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm text-gray-400">
                                            Full Name
                                        </p>

                                        <p className="mt-1 font-medium text-white">
                                            {user.name}
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* Email */}
                            <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">

                                <div className="flex items-center gap-3">

                                    <div className="rounded-lg bg-indigo-500/10 p-2">
                                        <Mail
                                            size={18}
                                            className="text-indigo-400"
                                        />
                                    </div>

                                    <div>

                                        <p className="text-sm text-gray-400">
                                            Email Address
                                        </p>

                                        <p className="mt-1 break-all font-medium text-white">
                                            {user.email}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Security */}
                    <div className="mt-8">

                        <div className="mb-4">

                            <h2 className="text-xl font-semibold">
                                Security
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your account security.
                            </p>

                        </div>


                        <div className="rounded-2xl border border-white/10 bg-[#111113]">

                            {/* Password */}
                            <div className="flex items-center justify-between p-5">

                                <div className="flex items-center gap-4">

                                    <div className="rounded-lg bg-indigo-500/10 p-2">
                                        <Lock
                                            size={18}
                                            className="text-indigo-400"
                                        />
                                    </div>

                                    <div>

                                        <p className="font-medium">
                                            Password
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Your password is securely encrypted.
                                        </p>

                                    </div>

                                </div>


                                <button
                                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    Change Password
                                </button>

                            </div>


                            <div className="border-t border-white/10" />


                            {/* Account status */}
                            <div className="flex items-center gap-4 p-5">

                                <div className="rounded-lg bg-green-500/10 p-2">
                                    <Shield
                                        size={18}
                                        className="text-green-400"
                                    />
                                </div>

                                <div>

                                    <p className="font-medium">
                                        Account Security
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Your account is protected with authentication.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Logout */}
                    <div className="mt-8">

                        <div className="mb-4">

                            <h2 className="text-xl font-semibold">
                                Session
                            </h2>

                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#111113] p-5">

                            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                                <div>

                                    <p className="font-medium">
                                        Sign out
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Sign out of your current account.
                                    </p>

                                </div>


                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
                                >
                                    <LogOut size={17} />

                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Profile;