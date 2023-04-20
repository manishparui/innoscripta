<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AuthController extends Controller {

    public function isSignUpEligible(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Bad Request'
            ], 400);
        }

        if ($request->email && User::where('email', '=', $request->email)->exists()) {
            return response()->json([
                'data' => [
                    'isEligible' => false
                ],
                'message' => [
                    'message' => 'User already exists.',
                    'type' => 'error'
                ]
            ]);
        } else {
            return response()->json([
                'data' => [
                    'isEligible' => true
                ],
                'message' => [
                    'message' => 'Eligible for sign up',
                    'type' => 'success'
                ]
            ]);
        }
    }

    public function isSignInEligible(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Bad Request'
            ], 400);
        }

        if ($request->email && User::where('email', '=', $request->email)->exists()) {
            return response()->json([
                'data' => [
                    'isEligible' => true
                ],
                'message' => [
                    'message' => 'Eligible for sign in',
                    'type' => 'success'
                ]
            ]);
        } else {
            return response()->json([
                'data' => [
                    'isEligible' => false
                ],
                'message' => [
                    'message' => 'Not eligible for sign in',
                    'type' => 'error'
                ]
            ]);
        }
    }

    public function signUp(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'name' => 'required|string|max:255',
            'preferences' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => [
                    'message' => 'Bad Request',
                    'type' => 'error'
                ]
            ], 400);
        }

        $user = new User();
        $user->uuid = Str::uuid();
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->name = $request->name;
        $user->preferences = serialize($request->preferences);;


        if ($user->save()) {
            return response()->json([
                'data' => [
                    'token' => $user->createToken('authToken')->plainTextToken,
                    'uuid' => $user->uuid,
                    'email' =>  $user->email,
                    'emailVerifiedAt' => $user->email_verified_at,
                    'name' =>  $user->name,
                    'preferences' =>  unserialize($user->preferences),
                    'createdAt' => $user->created_at,
                    'updatedAt' => $user->updated_at
                ]
            ], 201);
        } else {
            return response()->json([
                'message' => [
                    'message' => 'Internal server error.',
                    'type' => 'error'
                ]
            ], 500);
        }
    }

    public function signIn(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Bad Request',
                'type' => 'error'
            ], 400);
        }

        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => [
                    'message' => 'Unauthorized',
                    'type' => 'error'
                ]
            ], 401);
        } else {
            $user = User::where('email', '=', $request->email)->first();

            return response()->json([
                'data' => [
                    'token' => $user->createToken('authToken')->plainTextToken,
                    'uuid' => $user->uuid,
                    'email' =>  $user->email,
                    'emailVerifiedAt' => $user->email_verified_at,
                    'name' =>  $user->name,
                    'preferences' =>  unserialize($user->preferences),
                    'createdAt' => $user->created_at,
                    'updatedAt' => $user->updated_at
                ]
            ]);
        }
    }

    public function isSignedIn(Request $request) {
        if ($request->uuid) {
            return response()->json([
                'data' => [
                    'isSignedIn' => $request->user()->uuid == $request->uuid ? true : false
                ]
            ]);
        } else {
            return response()->json([
                'message' => [
                    'message' => 'Uuid required',
                    'type' => 'error'
                ]
            ]);
        }
    }

    public function signOut(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => [
                'message' => 'Logged out successfully',
                'type' => 'success'
            ]
        ]);
    }

}
