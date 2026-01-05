"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call your Laravel API here
        // Example using fetch
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Login successful → redirect to home
                router.push("/");
            } else {
                // Show error message from backend
                setError(data.message || "Invalid credentials");
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="text-center text-xl font-bold text-blue-700">
                    Sign In
                </h2>

                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Sign In
                </button>

                <p className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 font-medium">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default page;
