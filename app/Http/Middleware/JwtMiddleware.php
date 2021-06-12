<?php

namespace App\Http\Middleware;

use App\Http\Controllers\SteamAuthController;
use App\Models\UserSteam;
use Closure;
use Illuminate\Http\Request;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Contracts\Providers\Auth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            JWTAuth::parseToken()->authenticate();
            $userId = JWTAuth::parseToken()->getPayload()["sub"];
            $user = UserSteam::where("id", $userId)->get();
            $request->attributes->set("user", $user);
        } catch (Exception $e) {
            if ($e instanceof TokenInvalidException){
                return response('Token is Invaliddddddd', 401);
            }else if ($e instanceof TokenExpiredException){
                return response('Token is Expired', 401);
            }else{
                return response('Authorization Token not found', 400);
            }
        }
        return $next($request);
    }
}
