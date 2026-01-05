<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Get all tasks of logged-in user
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();
        return response()->json($tasks);
    }

    // Add new task
    public function store(Request $request)
    {
        $request->validate(['title'=>'required']);

        $task = Task::create([
            'title'=>$request->title,
            'user_id'=>Auth::id()
        ]);

        return response()->json($task);
    }

    // Update task (mark complete)
    public function update(Request $request, $id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->update(['is_completed'=>$request->is_completed]);
        return response()->json($task);
    }

    // Delete task
    public function destroy($id)
    {
        $task = Task::where('user_id', Auth::id())->findOrFail($id);
        $task->delete();
        return response()->json(['message'=>'Task deleted']);
    }
}
