"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";

const SigninPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // new: wait until token check is done

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.replace("/dashboard"); // user already logged in → go dashboard
        } else {
            setLoading(false); // no token → allow signin page to render
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://localhost:8000/api/signin", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                router.replace("/dashboard"); // redirect immediately
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong");
        }
    };

    // Wait until token check is done before rendering
    if (loading) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-blue-500">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 text-white p-6 rounded-xl shadow w-100 space-y-4"
            >
                <h2 className="text-center text-2xl font-bold text-blue-500">Sign In</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />

                {/* Password with show/hide */}
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded text-white focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 pr-10"
                        required
                    />
                    {password && (
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-6 h-6 text-white" />
                            ) : (
                                <EyeIcon className="w-6 h-6 text-white" />
                            )}
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                    Sign In
                </button>

                <p className="text-center text-sm text-gray-400">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-500 font-medium">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SigninPage;
