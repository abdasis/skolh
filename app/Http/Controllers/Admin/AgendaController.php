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
        $agendas = Agenda::orderBy('date')->get();

        return Inertia::render('admin/agendas/index', [
            'agendas' => $agendas,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/agendas/create');
    }

    public function store(StoreAgendaRequest $request): RedirectResponse
    {
        Agenda::create($request->validated());

        return redirect()->route('admin.agendas.index')
            ->with('success', 'Agenda berhasil ditambahkan.');
    }

    public function show(Agenda $agenda): RedirectResponse
    {
        return redirect()->route('admin.agendas.index');
    }

    public function edit(Agenda $agenda): Response
    {
        return Inertia::render('admin/agendas/edit', [
            'agenda' => $agenda,
        ]);
    }

    public function update(UpdateAgendaRequest $request, Agenda $agenda): RedirectResponse
    {
        $agenda->update($request->validated());

        return redirect()->route('admin.agendas.index')
            ->with('success', 'Agenda berhasil diperbarui.');
    }

    public function destroy(Agenda $agenda): RedirectResponse
    {
        $agenda->delete();

        return redirect()->route('admin.agendas.index')
            ->with('success', 'Agenda berhasil dihapus.');
    }
}
