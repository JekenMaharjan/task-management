<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Fruitcake\Cors\HandleCors as BaseCors;

class HandleCors extends BaseCors
{
    // This extends the CORS handling from Fruitcake package
}
