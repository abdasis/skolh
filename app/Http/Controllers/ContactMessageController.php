<?php

namespace App\Http\Controllers;

use App\Actions\ContactMessage\CreateContactMessageAction;
use App\Http\Requests\StoreContactMessageRequest;
use Illuminate\Http\RedirectResponse;

class ContactMessageController extends Controller
{
    public function __construct(
        private readonly CreateContactMessageAction $createAction,
    ) {}

    public function store(StoreContactMessageRequest $request): RedirectResponse
    {
        $this->createAction->handle($request->validated());

        return redirect()->back()->with('success', 'Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda.');
    }
}
