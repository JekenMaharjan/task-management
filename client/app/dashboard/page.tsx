"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Task = {
    id: number;
    text: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
};

const TaskManagerPage = () => {
    const router = useRouter();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:8000/api/tasks";

    // 🔐 Load tasks from backend
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.replace("/signin");
            return;
        }

        fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                setTasks(data);
                setLoading(false);
            })
            .catch(() => {
                localStorage.removeItem("token");
                router.replace("/signin");
            });
    }, [router]);

    // ➕ Add task
    const addTask = async () => {
        if (!task.trim()) return;

        const token = localStorage.getItem("token");

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                text: task,
                priority,
            }),
        });

        const newTask = await res.json();
        setTasks((prev) => [newTask, ...prev]);

        setTask("");
        setPriority("low");
    };

    // ✅ Toggle complete
    const toggleComplete = async (id: number, completed: boolean) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ completed: !completed }),
        });

        const updatedTask = await res.json();

        setTasks((prev) =>
            prev.map((t) => (t.id === id ? updatedTask : t))
        );
    };

    // 🗑 Delete task
    const deleteTask = async (id: number) => {
        const token = localStorage.getItem("token");

        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    // 🚪 Logout
    const logout = () => {
        localStorage.removeItem("token");
        router.replace("/signin");
    };

    // 🔍 Filter tasks
    const filteredTasks = tasks.filter((t) => {
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
    });

    const priorityColors: Record<string, string> = {
        low: "border-l-4 border-green-400",
        medium: "border-l-4 border-yellow-400",
        high: "border-l-4 border-red-400",
    };

    const completedCount = tasks.filter((t) => t.completed).length;

    if (loading) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex flex-col items-center pt-10 px-4">
            {/* Logout */}
            <div className="w-full max-w-xl flex justify-end mb-4">
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
                >
                    Logout
                </button>
            </div>

            {/* Card */}
            <div className="w-full max-w-xl bg-gray-900 text-white rounded-xl shadow-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">My Tasks</h2>
                        <p className="text-gray-400 text-sm">
                            {completedCount} of {tasks.length} completed
                        </p>
                    </div>

                    <button
                        onClick={addTask}
                        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
                    >
                        <span className="text-xl">+</span> Add Task
                    </button>
                </div>

                {/* Input */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="flex-1 rounded-lg px-3 py-2 text-white border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="rounded-lg px-2 py-2 text-white cursor-pointer border border-gray-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option className="text-black" value="low">Low</option>
                        <option className="text-black" value="medium">Medium</option>
                        <option className="text-black" value="high">High</option>
                    </select>
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                    {["all", "active", "completed"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${filter === f
                                    ? "bg-gray-500 text-white"
                                    : "bg-white text-gray-700"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                <ul className="space-y-2">
                    {filteredTasks.length === 0 && (
                        <p className="text-center text-gray-400">No tasks</p>
                    )}

                    {filteredTasks.map((t) => (
                        <li
                            key={t.id}
                            className={`flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg ${priorityColors[t.priority]}`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    className="cursor-pointer"
                                    onChange={() =>
                                        toggleComplete(t.id, t.completed)
                                    }
                                />
                                <span
                                    className={`${t.completed
                                            ? "line-through text-gray-400"
                                            : "text-gray-900"
                                        }`}
                                >
                                    {t.text}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-gray-300 text-black">
                                    {t.priority}
                                </span>
                                <button
                                    onClick={() => deleteTask(t.id)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskManagerPage;
