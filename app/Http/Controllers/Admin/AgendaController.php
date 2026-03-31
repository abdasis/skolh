<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAgendaRequest;
use App\Http\Requests\Admin\UpdateAgendaRequest;
use App\Models\Agenda;

class AgendaController extends Controller
{
    // TODO: fetch all agendas ordered by date asc, pass as 'agendas' prop (AgendaIndexProps in contracts/inertia-props.md)
    public function index()
    {
        //
    }

    // TODO: return Inertia::render('admin/agendas/create') with no props
    public function create()
    {
        //
    }

    // TODO: create agenda from validated request, redirect to admin.agendas.index with success flash
    public function store(StoreAgendaRequest $request)
    {
        //
    }

    public function show(Agenda $agenda)
    {
        // not used
    }

    // TODO: return Inertia::render('admin/agendas/edit', ['agenda' => $agenda]) (AgendaEditProps in contracts/inertia-props.md)
    public function edit(Agenda $agenda)
    {
        //
    }

    // TODO: update from validated request, redirect to admin.agendas.index with success flash
    public function update(UpdateAgendaRequest $request, Agenda $agenda)
    {
        //
    }

    // TODO: delete record, redirect to admin.agendas.index with success flash
    public function destroy(Agenda $agenda)
    {
        //
    }
}
