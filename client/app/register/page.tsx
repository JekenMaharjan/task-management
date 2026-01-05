"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });


            const data = await res.json();

            if (res.ok) {
                // Redirect to Sign In
                router.push("/signin");
            } else {
                setError(data.message || "Registration failed");
            }

        } catch (err) {
            setError("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
                <h2 className="text-center text-xl font-bold text-green-700">Register</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />

                <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>

                <p className="text-center text-sm text-gray-500">
                    Already have an account? <Link href="/signin" className="text-green-600 font-medium">Sign In</Link>
                </p>
            </form>
        </div>
    )
}

export default page;
