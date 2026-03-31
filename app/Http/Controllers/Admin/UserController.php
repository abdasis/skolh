<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * T013 [US1]: Display a listing of users with roles.
     * Query all users with roles relation, pass to Inertia view admin/users/index.
     */
    public function index(): Response
    {
        $users = User::with('roles')->latest()->get();

        $stats = [
            'total' => User::count(),
            'active' => User::where('is_active', true)->count(),
            'inactive' => User::where('is_active', false)->count(),
            'new_this_month' => User::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
        ];

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'stats' => $stats,
        ]);
    }

    /**
     * T018 [US2]: Show form for creating a new user.
     * Pass list of roles to view.
     */
    public function create(): Response
    {
        $roles = Role::pluck('name');

        return Inertia::render('admin/users/create', [
            'roles' => $roles,
        ]);
    }

    /**
     * T018 [US2]: Store a newly created user.
     * Create user + assignRole() + redirect with flash.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'password' => bcrypt($request->validated('password')),
            'is_active' => $request->validated('is_active'),
        ]);

        $user->assignRole($request->validated('role'));

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil dibuat.');
    }

    /**
     * Not used (SPA) — redirect to index.
     */
    public function show(User $user): RedirectResponse
    {
        return redirect()->route('admin.users.index');
    }

    /**
     * T023 [US3]: Show form for editing a user.
     * Pass user + list of roles to view.
     */
    public function edit(User $user): Response
    {
        $roles = Role::pluck('name');

        return Inertia::render('admin/users/edit', [
            'user' => $user->load('roles'),
            'roles' => $roles,
        ]);
    }

    /**
     * T023 [US3]: Update the specified user.
     * Use syncRoles() + redirect with flash.
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = [
            'name' => $request->validated('name'),
            'email' => $request->validated('email'),
            'is_active' => $request->validated('is_active'),
        ];

        if ($request->filled('password')) {
            $data['password'] = bcrypt($request->validated('password'));
        }

        $user->update($data);
        $user->syncRoles([$request->validated('role')]);

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil diperbarui.');
    }

    /**
     * T026 [US4]: Delete a user.
     * Prevent admin from deleting own account. Redirect with flash.
     */
    public function destroy(User $user): RedirectResponse
    {
        abort_if(auth()->id() === $user->id, 403, 'Tidak dapat menghapus akun sendiri.');

        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User berhasil dihapus.');
    }
}
