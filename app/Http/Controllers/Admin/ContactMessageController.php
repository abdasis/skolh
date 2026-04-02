<?php

namespace App\Http\Controllers\Admin;

use App\Actions\ContactMessage\DeleteContactMessageAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    public function __construct(
        private readonly ContactMessageRepositoryInterface $repository,
        private readonly DeleteContactMessageAction $deleteAction,
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only('search');

        return Inertia::render('admin/contact-messages/index', [
            'contactMessages' => ContactMessageResource::collection(
                $this->repository->getAll($filters)
            ),
            'filters' => $filters,
            'stats' => $this->repository->getStats(),
        ]);
    }

    public function show(ContactMessage $contactMessage): Response
    {
        $contactMessage->markAsRead();

        return Inertia::render('admin/contact-messages/show', [
            'contactMessage' => new ContactMessageResource($contactMessage),
        ]);
    }

    public function destroy(ContactMessage $contactMessage): RedirectResponse
    {
        $this->deleteAction->handle($contactMessage);

        return redirect()->route('admin.contact-messages.index')
            ->with('success', 'Pesan berhasil dihapus.');
    }
}
