<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeacherResource;
use App\Models\Teacher;
use Inertia\Inertia;
use Inertia\Response;

final class PublicTeacherController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('public/teachers', [
            'teachers' => TeacherResource::collection(
                Teacher::active()->with(['socials', 'media'])->get(),
            ),
        ]);
    }
}
