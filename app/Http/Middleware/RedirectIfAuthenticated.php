<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;

use App\Traits\Getusers;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    use Getusers;
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if(Auth::guard("teacher")->check()){
            return redirect(RouteServiceProvider::TEACHER);
        }
        if(Auth::guard("web")->check()){
            return redirect(RouteServiceProvider::HOME);
        }
        return $next($request);
    }
}
