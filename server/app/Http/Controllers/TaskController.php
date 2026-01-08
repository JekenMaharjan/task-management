<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Get logged-in user's tasks
    public function index()
    {
        return response()->json(
            Auth::user()->tasks()->latest()->get()
        );
    }

    // Add task
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:255',
            'priority' => 'required|in:low,medium,high',
        ]);

        $task = Auth::user()->tasks()->create([
            'text' => $request->text,
            'priority' => $request->priority,
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }

    // Toggle complete
    public function update(Request $request, $id)
    {
        $request->validate([
            'completed' => 'required|boolean',
        ]);

        $task = Auth::user()->tasks()->findOrFail($id);
        $task->update([
            'completed' => $request->completed,
        ]);

        return response()->json($task);
    }

    // Delete task
    public function destroy($id)
    {
        $task = Auth::user()->tasks()->findOrFail($id);
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);
    }
}
