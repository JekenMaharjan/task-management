"use client";

import React, { useState } from "react";

const page = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [task, setTask] = useState("");

    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, task]);
        setTask("");
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">

                <h2 className="text-xl font-bold text-center text-blue-700">
                    Task Management App
                </h2>

                {/* Input section */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter task"
                        className="flex-1 border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <button
                        onClick={addTask}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>

                {/* Task list */}
                <ul className="space-y-2">
                    {tasks.length === 0 && (
                        <p className="text-center text-gray-400">
                            No tasks added
                        </p>
                    )}

                    {tasks.map((t, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded px-3 py-2"
                        >
                            <span className="text-gray-800">{t}</span>

                            <button
                                onClick={() => deleteTask(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default page;
