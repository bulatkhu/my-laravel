<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\RouletteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SteamAuthController;
use Illuminate\Support\Facades\Redis;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    dd("user");
//    return $request->user();
//});

Route::group(["prefix" => "/auth", "namespace" => "Auth"], function () {
    Route::group(["prefix" => "/steam"], function () {
        Route::get('/', [SteamAuthController::class, 'redirectToSteam']);
        Route::get('/handle', [SteamAuthController::class, 'handle']);
        Route::get('/user', [SteamAuthController::class, "userData"]);
    });
});

Route::group(["prefix" => "/bot"], function() {
    Route::group(["prefix" => "/roulette"], function() {
        Route::get("/state", [RouletteController::class, "getBets"]);
        Route::get("/bets", [RouletteController::class, "getAllCurrentBets"]);
        Route::post("/store", [RouletteController::class, "createBet"]);
        Route::post("/newBet", [RouletteController::class, "newBet"])->middleware("jwt.verify");
    });
});

Route::group([
//    'middleware' => 'auth:api',
    'prefix' => 'user'
], function () {
    Route::get('/get', [SteamAuthController::class, "userData"])->middleware("jwt.verify");
//    Route::post('/login', [AuthController::class, 'login']);
//    Route::post('/register', [AuthController::class, 'register']);
//    Route::post('/logout', [AuthController::class, 'logout']);
//    Route::post('/refresh', [AuthController::class, 'refresh']);
//    Route::get('/user', [AuthController::class, 'userProfile']);
});

Route::group(['prefix' => 'chat'], function () {
    Route::post('/send', [ChatController::class, "store"])->middleware('jwt.verify');
    Route::get('/get', [ChatController::class, "index"]);
});

Route::group([
    'middleware' => 'api',
], function () {
    Route::get('/items', [ItemController::class, 'index']);
    Route::prefix('/item')->group(function() {
        Route::post('/store', [ItemController::class, 'store']);
        Route::put('/{id}', [ItemController::class, 'update']);
        Route::delete('/{id}', [ItemController::class, 'destroy']);
    });
});


//Route::group([
//    'middleware' => 'api',
//    'prefix' => 'auth'
//], function () {
//    Route::post('/login', [AuthController::class, 'login']);
//    Route::post('/register', [AuthController::class, 'register']);
//    Route::post('/logout', [AuthController::class, 'logout']);
//    Route::post('/refresh', [AuthController::class, 'refresh']);
//    Route::get('/user', [AuthController::class, 'userProfile']);
//});

