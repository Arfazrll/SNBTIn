<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Tambahkan di bagian atas file routes/api.php
Route::get('/', function () {
    return ['message' => 'API Home'];
});

// Test route untuk debugging
Route::get('test', function () {
    return ['message' => 'API works!'];
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

// Protected routes
Route::group(['middleware' => 'auth:api'], function () {
    // Tambahkan route yang memerlukan autentikasi di sini
});