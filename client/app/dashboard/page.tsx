"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Task = {
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

    // Protect dashboard: check for token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.replace("/signin");
        } else {
            // Load tasks if token exists
            const storedTasks = localStorage.getItem("tasks");
            if (storedTasks) setTasks(JSON.parse(storedTasks));
            setLoading(false);
        }
    }, []);

    // Save tasks to localStorage whenever updated
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!task.trim()) return;
        setTasks([...tasks, { text: task, priority: priority || "low", completed: false }]);
        setTask("");
        setPriority("low");
    };

    const toggleComplete = (index: number) => {
        const updated = [...tasks];
        updated[index].completed = !updated[index].completed;
        setTasks(updated);
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const logout = () => {
        // Clear all auth and session data
        localStorage.removeItem("token"); // main auth token
        localStorage.removeItem("tasks"); // task data
        router.replace("/signin"); // redirect to signin
    };

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

    // Wait until loading is done
    if (loading) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex flex-col items-center pt-10 px-4">
            {/* Logout Button */}
            <div className="w-full max-w-xl flex justify-end mb-4">
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
                >
                    Logout
                </button>
            </div>

            {/* Card Container */}
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
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
                    >
                        <span className="text-xl">+</span> Add Task
                    </button>
                </div>

                {/* Input Section */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                        className="border border-gray-300 rounded-lg px-2 py-2 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                    >
                        <option className="text-black" value="low">Low</option>
                        <option className="text-black" value="medium">Medium</option>
                        <option className="text-black" value="high">High</option>
                    </select>
                </div>

                {/* Filter Buttons */}
                <div className="flex justify-start gap-2">
                    {["all", "active", "completed"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${filter === f
                                    ? "bg-gray-500 text-gray-100"
                                    : "bg-white text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Task List */}
                <ul className="space-y-2">
                    {filteredTasks.length === 0 && (
                        <p className="text-center text-gray-300">No tasks</p>
                    )}
                    {filteredTasks.map((t, index) => (
                        <li
                            key={index}
                            className={`flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg ${priorityColors[t.priority]}`}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={t.completed}
                                    onChange={() => toggleComplete(index)}
                                    className="w-5 h-5 cursor-pointer"
                                />
                                <span
                                    className={`${t.completed ? "line-through text-gray-400" : "text-gray-900"}`}
                                >
                                    {t.text}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`${t.priority === "low" ? "bg-green-400" : t.priority === "medium" ? "bg-yellow-400" : "bg-red-400"} text-xs font-semibold px-2 py-1 rounded-lg text-black`}>
                                    {t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                                </span>

                                <button
                                    onClick={() => deleteTask(index)}
                                    className="text-gray-400 hover:text-red-500 transition"
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
