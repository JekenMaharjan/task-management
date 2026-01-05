"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Next.js router

const page = () => {
    const router = useRouter(); // router instance
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Here, normally you would send data to Laravel API
        // For now, we simulate success
        console.log("Registered:", { name, email, password });

        // Redirect to Sign In page
        router.push("/signin");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="text-center text-xl font-bold text-green-700">
                    Register
                </h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />

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
                    className="w-full bg-green-600 text-white p-2 rounded"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-green-600 font-medium">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default page;
