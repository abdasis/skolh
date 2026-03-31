<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAgendaRequest;
use App\Http\Requests\Admin\UpdateAgendaRequest;
use App\Models\Agenda;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AgendaController extends Controller
{
    public function index(): Response
    {
        //
    }

    public function create(): Response
    {
        //
    }

    public function store(StoreAgendaRequest $request): RedirectResponse
    {
        //
    }

    public function show(Agenda $agenda): RedirectResponse
    {
        return redirect()->route('admin.agendas.index');
    }

    public function edit(Agenda $agenda): Response
    {
        //
    }

    public function update(UpdateAgendaRequest $request, Agenda $agenda): RedirectResponse
    {
        //
    }

    public function destroy(Agenda $agenda): RedirectResponse
    {
        //
    }
}
