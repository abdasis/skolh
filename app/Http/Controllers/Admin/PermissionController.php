<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionController extends Controller
{
    /**
     * T024 [US4]: Display all permissions grouped by module with roles info.
     */
    public function index(): Response
    {
        $permissions = Permission::with('roles:id,name')->get(['id', 'name', 'guard_name']);

        $groupedPermissions = $permissions->groupBy(function ($permission) {
            $parts = explode(' ', $permission->name);

            return end($parts);
        })->map(fn ($group) => $group->map(fn ($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'roles' => $p->roles->map(fn ($r) => ['id' => $r->id, 'name' => $r->name])->values(),
        ])->values());

        $stats = [
            'total_permissions' => $permissions->count(),
            'total_roles' => Role::count(),
        ];

        return Inertia::render('admin/permissions/index', [
            'grouped_permissions' => $groupedPermissions,
            'stats' => $stats,
        ]);
    }
}
