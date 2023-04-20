<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $filters = array(
            'organization_uuid' => 'organizationUuid',
            'status' => 'status',
            'role' => 'role',
            'gender' => 'gender'
        );
        $filterKey = array_search($request->filterKey, $filters); //return key

        if ($request->filterKey && $request->filterValue && $filterKey) {
            $users = User::select(
                'uuid',
                'organization_uuid as organizationUuid',
                'email',
                'email_verified_at as emailVerifiedAt',
                'mobile_number as mobileNumber',
                'mobile_number_verified_at as mobileNumberVerifiedAt',
                'status',
                'role',
                'name_prefix as namePrefix',
                'first_name as firstName',
                'last_name as lastName',
                'date_of_birth as dateOfBirth',
                'gender',
                'created_at as createdAt',
                'updated_at as updatedAt',
            )
            ->where($filterKey, '=', $request->filterValue)
            ->paginate($request->offset ? $request->offset : 10);
        } else {
            $users = User::select(
                'uuid',
                'organization_uuid as organizationUuid',
                'email',
                'email_verified_at as emailVerifiedAt',
                'mobile_number as mobileNumber',
                'mobile_number_verified_at as mobileNumberVerifiedAt',
                'status',
                'role',
                'name_prefix as namePrefix',
                'first_name as firstName',
                'last_name as lastName',
                'date_of_birth as dateOfBirth',
                'gender',
                'created_at as createdAt',
                'updated_at as updatedAt',
            )
            ->paginate($request->offset ? $request->offset : 10);
        }

        if ($request->filterKey && $request->filterValue) {
            $users->appends(['filterKey' => $request->filterKey]);
            $users->appends(['filterValue' => $request->filterValue]);
        }
        $users->appends(['offset' => $request->offset]);
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) { }

    /**
     * Display the specified resource.
     *
     * @param  string  $uuid
     * @return \Illuminate\Http\Response
     */
    public function show($uuid) {
        $user = User::where('uuid', '=', $uuid)->firstOrFail();

        return response()->json([
            'data' => [
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $uuid) {
        $validator = Validator::make($request->all(), [
            'email' => 'email|unique:users,email',
            'emailVerifiedAt' => 'date_format:Y-m-d H:i:s',
            'newPassword' => 'string',
            'oldPassword' => 'string',
            'name' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Bad Request',
                'type' => 'error',
                'errors' =>$validator->errors()
            ], 400);
        }

        $user = User::where('uuid', '=', $uuid)->firstOrFail();
        $token = null;

        if ($request->user()->uuid === $uuid) {
            if ($request->oldPassword && $request->newPassword) {
                if (Hash::check($request->oldPassword, $user->password)) {
                    $user->password = bcrypt($request->newPassword);
                    $user->tokens()->delete();
                    $token = $user->createToken('authToken')->plainTextToken;
                } else {
                    return response()->json([
                        'message' => [
                            'message' => 'Unauthorized',
                            'type' => 'error'
                        ]
                    ], 401);
                }
            } else {
                $user->email = $request->email ? $request->email : $user->email;
                $user->email_verified_at = $request->emailVerifiedAt ? $request->emailVerifiedAt : $user->email_verified_at;
                $user->name = $request->name ? $request->name : $user->name;
                $user->preferences = $request->preferences ? serialize($request->preferences) : $user->preferences;
            }
        }

        if ($user->save()) {
            $data = [
                'uuid' => $user->uuid,
                'email' => $user->email,
                'emailVerifiedAt' => $user->email_verified_at,
                'name' => $user->name,
                'preferences' =>  unserialize($user->preferences),
            ];

            if ($token) {
                $data['token'] = $token;
            }

            return response()->json([
                'data' => $data,
                'message' => [
                    'message' => 'Updated successfully',
                    'type' => 'success'
                ]
            ], 202);
        } else {
            return response()->json([
                'message' => [
                    'message' => 'Internal server error.',
                    'type' => 'error'
                ]
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $reference
     * @return \Illuminate\Http\Response
     */
    public function destroy($reference) { }

}
