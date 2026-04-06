<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAppInstalled
{
    /**
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isInstalled = User::exists();

        if (! $isInstalled && ! $request->routeIs('install.*')) {
            return redirect()->route('install.index');
        }

        if ($isInstalled && $request->routeIs('install.*')) {
            return redirect('/');
        }

        return $next($request);
    }
}
