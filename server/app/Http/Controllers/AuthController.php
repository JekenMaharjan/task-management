<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|min:6'
        ]);

        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        return response()->json(['message'=>'User registered']);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email','password');

        if(!Auth::attempt($credentials)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }

        return response()->json(['message'=>'Login successful']);
    }
}
