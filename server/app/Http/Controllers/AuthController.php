<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\SignupRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Register
    public function register(SignupRequest $request)
    {
        $data = $request->validated();

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=> bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    // Login
    public function signin(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401); // Proper status code
        }

        $user = Auth::user();

        // Optional but recommended: revoke old tokens
        $user->tokens()->delete();

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }


    // Logout
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response([
            'message'=>'Logged out successfully!'
        ]);
    }
}
