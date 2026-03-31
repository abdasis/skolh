<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFacilityRequest;
use App\Http\Requests\Admin\UpdateFacilityRequest;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(): Response
    {
        //
    }

    public function create(): Response
    {
        //
    }

    public function store(StoreFacilityRequest $request): RedirectResponse
    {
        //
    }

    public function show(Facility $facility): RedirectResponse
    {
        return redirect()->route('admin.facilities.index');
    }

    public function edit(Facility $facility): Response
    {
        //
    }

    public function update(UpdateFacilityRequest $request, Facility $facility): RedirectResponse
    {
        //
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        //
    }
}
