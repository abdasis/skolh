<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(): Response
    {
        $roles = Role::withCount(['permissions', 'users'])->latest()->get();

        $stats = [
            'total_roles' => Role::count(),
            'total_permissions' => Permission::count(),
        ];

        return Inertia::render('admin/roles/index', [
            'roles' => $roles,
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        $permissions = Permission::orderBy('name')->get(['id', 'name', 'guard_name']);

        $groupedPermissions = $permissions->groupBy(function (Permission $permission) {
            return explode(' ', $permission->name)[1] ?? 'other';
        })->map(fn ($group) => $group->values());

        return Inertia::render('admin/roles/create', [
            'permissions' => $permissions,
            'grouped_permissions' => $groupedPermissions,
        ]);
    }

    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $role = Role::create(['name' => $request->validated('name')]);
        $role->syncPermissions($request->validated('permissions'));

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role berhasil dibuat.');
    }

    public function edit(Role $role): Response
    {
        $permissions = Permission::orderBy('name')->get(['id', 'name', 'guard_name']);

        $groupedPermissions = $permissions->groupBy(function (Permission $permission) {
            return explode(' ', $permission->name)[1] ?? 'other';
        })->map(fn ($group) => $group->values());

        return Inertia::render('admin/roles/edit', [
            'role' => $role->load('permissions:id,name'),
            'permissions' => $permissions,
            'grouped_permissions' => $groupedPermissions,
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        $role->update(['name' => $request->validated('name')]);
        $role->syncPermissions($request->validated('permissions'));

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role berhasil diperbarui.');
    }

    public function destroy(Role $role): RedirectResponse
    {
        abort_if($role->name === 'Super Admin', 403, 'Role Super Admin tidak dapat dihapus.');

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'Role berhasil dihapus.');
    }
}
