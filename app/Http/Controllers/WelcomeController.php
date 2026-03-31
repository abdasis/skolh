<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class WelcomeController extends Controller
{
    public function __invoke(): Response
    {
        $agendas = Agenda::whereDate('date', '>=', today())
            ->orderBy('date')
            ->limit(6)
            ->get(['id', 'date', 'title', 'description']);

        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'agendas' => $agendas,
        ]);
    }
}
