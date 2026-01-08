"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // UI state
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Simple client-side check (traditional UX)
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

            // Success
            router.push("/signin");

        } catch (err) {
            console.error(err);
            setError("Server error. Please try again.");
        } finally {
            setLoading(false);
        }
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

                {error && <p className="text-red-500 text-center">{error}</p>}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded text-white ${loading
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600"
                        }`}
                >
                    {loading ? "Registering..." : "Register"}
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

export default RegisterPage;
