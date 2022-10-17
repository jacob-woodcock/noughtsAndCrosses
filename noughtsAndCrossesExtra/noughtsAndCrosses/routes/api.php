<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GamesController;

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


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::prefix('games')->group(function () {
        Route::get('/latest/{id}', [GamesController::class, 'latest']);
        Route::post('/', [GamesController::class, 'store']);
        Route::get('/', [GamesController::class, 'index']);
        Route::delete('/{id}', [GamesController::class, 'destroy']);
    });
});



Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
