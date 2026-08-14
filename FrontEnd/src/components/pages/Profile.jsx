import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Calendar,
    Shield,
    LogOut,
    Lock,
    X,
    Eye,
    EyeOff,
} from "lucide-react";

import Navbar from "../layout/Navbar";
import Sidebar from "../layout/SideBar";

import {
    GetProfile,
    ChangePassword,
} from "../services/api";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Change password modal
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changingPassword, setChangingPassword] = useState(false);

    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState("");

    // Fetch profile
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

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    // Open password modal
    const handleOpenPasswordModal = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setPasswordError("");
        setPasswordSuccess("");

        setShowPasswordModal(true);
    };

    // Close password modal
    const handleClosePasswordModal = () => {
        if (changingPassword) return;

        setShowPasswordModal(false);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setPasswordError("");
        setPasswordSuccess("");
    };

    // Change password
    const handleChangePassword = async (e) => {
        e.preventDefault();

        setPasswordError("");
        setPasswordSuccess("");

        // Basic validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("All fields are required.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError(
                "New password must be at least 8 characters long."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "New password and confirm password do not match."
            );
            return;
        }

        if (currentPassword === newPassword) {
            setPasswordError(
                "New password must be different from your current password."
            );
            return;
        }

        try {
            setChangingPassword(true);

            const data = await ChangePassword({
                currentPassword,
                newPassword,
                confirmPassword,
            });

            if (!data.success) {
                setPasswordError(
                    data.message || "Failed to change password."
                );
                return;
            }

            setPasswordSuccess(
                data.message || "Password changed successfully."
            );

            // Clear fields
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            // Close modal after success
            setTimeout(() => {
                setShowPasswordModal(false);
                setPasswordSuccess("");
            }, 1500);

        } catch (error) {
            console.error(
                "Change password error:",
                error
            );

            setPasswordError(
                error.response?.data?.message ||
                "Something went wrong while changing your password."
            );
        } finally {
            setChangingPassword(false);
        }
    };

    // Loading
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

    // Profile failed
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

                            <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">

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
                                    onClick={handleOpenPasswordModal}
                                    className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    Change Password
                                </button>

                            </div>


                            <div className="border-t border-white/10" />


                            {/* Account Status */}

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


            {/* =============================== */}
            {/* CHANGE PASSWORD MODAL */}
            {/* =============================== */}

            {showPasswordModal && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            handleClosePasswordModal();
                        }
                    }}
                >

                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111113] p-6 shadow-2xl">

                        {/* Modal Header */}

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold text-white">
                                    Change Password
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update your account password.
                                </p>

                            </div>


                            <button
                                onClick={handleClosePasswordModal}
                                disabled={changingPassword}
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                            >

                                <X size={20} />

                            </button>

                        </div>


                        {/* Error */}

                        {passwordError && (

                            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

                                {passwordError}

                            </div>

                        )}


                        {/* Success */}

                        {passwordSuccess && (

                            <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">

                                {passwordSuccess}

                            </div>

                        )}


                        <form onSubmit={handleChangePassword}>

                            {/* Current Password */}

                            <div className="mb-4">

                                <label className="mb-2 block text-sm text-gray-400">
                                    Current Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showCurrentPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(e.target.value)
                                        }
                                        placeholder="Enter current password"
                                        disabled={changingPassword}
                                        className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 disabled:opacity-50"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >

                                        {showCurrentPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* New Password */}

                            <div className="mb-4">

                                <label className="mb-2 block text-sm text-gray-400">
                                    New Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="Enter new password"
                                        disabled={changingPassword}
                                        className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 disabled:opacity-50"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >

                                        {showNewPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}

                                    </button>

                                </div>

                                <p className="mt-2 text-xs text-gray-600">
                                    Minimum 8 characters with a letter, number and special character.
                                </p>

                            </div>


                            {/* Confirm Password */}

                            <div className="mb-6">

                                <label className="mb-2 block text-sm text-gray-400">
                                    Confirm New Password
                                </label>

                                <div className="relative">

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="Confirm new password"
                                        disabled={changingPassword}
                                        className="w-full rounded-xl border border-white/10 bg-[#09090B] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-indigo-500 disabled:opacity-50"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >

                                        {showConfirmPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Buttons */}

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={handleClosePasswordModal}
                                    disabled={changingPassword}
                                    className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {changingPassword
                                        ? "Changing..."
                                        : "Change Password"}

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Profile;