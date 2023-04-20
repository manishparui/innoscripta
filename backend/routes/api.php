<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::permanentRedirect('/', 'https://example.com/');

// articles
Route::get('/articles', [ArticleController::class, 'index']);
// end articles

// auth
Route::post('/auth/signUp/isEligible', [AuthController::class, 'isSignUpEligible']); // verified
Route::post('/auth/signUp', [AuthController::class, 'signUp']); // verified
Route::post('/auth/signIn/isEligible', [AuthController::class, 'isSignInEligible']); // verified
Route::post('/auth/signIn', [AuthController::class, 'signIn']); // verified
// end auth

// preference
Route::get('/preferences', [PreferenceController::class, 'preference']);
// end preference

// test
Route::post('/test', [TestController::class, 'test']);
Route::get('/storeArticlesFromSources', [ArticleController::class, 'storeFromSources']);
// end test

Route::group(['middleware' => 'auth:sanctum'], function () {
    // auth
    Route::post('/auth/isSignedIn', [AuthController::class, 'isSignedIn']); // verified, looks good
    Route::post('/auth/signOut', [AuthController::class, 'signOut']); // verified, looks good
    // end auth

    // users
    Route::get('/users/{uuid}', [UserController::class, 'show']);
    Route::patch('/users/{uuid}', [UserController::class, 'update']);
    // end users

    // articles
    Route::post('/articles', [ArticleController::class, 'store']);
    // end articles

    // search
    Route::get('/search', [SearchController::class, 'search']);
    // end articles
});
