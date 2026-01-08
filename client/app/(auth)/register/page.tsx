"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/24/outline"; // npm install @heroicons/react
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import EyeSlashIcon from "@heroicons/react/24/outline/EyeSlashIcon";


const RegisterPage = () => {
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // Password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // UI state
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0];
                    setError(Array.isArray(firstError) ? firstError[0] : firstError);
                } else {
                    setError(data.message || "Registration failed");
                }
                return;
            }

            router.push("/signin");

        } catch (err) {
            console.error(err);
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-green-500">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-900 text-white p-8 rounded-xl shadow w-96 space-y-4"
            >
                <h2 className="text-center text-2xl font-bold text-green-500">
                    Register
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Name */}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400"
                    required
                />

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400"
                    required
                />

                {/* Password with show/hide */}
                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border p-2 rounded text-white focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400 pr-10"
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

                {/* Confirm Password with show/hide */}
                <div className="relative w-full">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="w-full border p-2 rounded text-white focus:border-green-400 focus:outline-none focus:ring focus:ring-green-400 pr-10"
                        required
                    />
                    {passwordConfirmation && (
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeSlashIcon className="w-6 h-6 text-white" />
                            ) : (
                                <EyeIcon className="w-6 h-6 text-white" />
                            )}
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded text-white ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600"
                        }`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-green-500 font-medium">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
