<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * All system permissions grouped by module.
     *
     * @var array<string, string[]>
     */
    private array $permissions = [
        'users' => ['view users', 'create users', 'edit users', 'delete users'],
        'roles' => ['view roles', 'create roles', 'edit roles', 'delete roles'],
        'articles' => ['view articles', 'create articles', 'edit articles', 'delete articles'],
        'announcements' => ['view announcements', 'create announcements', 'edit announcements', 'delete announcements'],
        'agendas' => ['view agendas', 'create agendas', 'edit agendas', 'delete agendas'],
        'facilities' => ['view facilities', 'create facilities', 'edit facilities', 'delete facilities'],
        'curricula' => ['view curricula', 'create curricula', 'edit curricula', 'delete curricula'],
        'categories' => ['view categories', 'create categories', 'edit categories', 'delete categories'],
        'achievements' => ['view achievements', 'create achievements', 'edit achievements', 'delete achievements'],
        'extracurriculars' => ['view extracurriculars', 'create extracurriculars', 'edit extracurriculars', 'delete extracurriculars'],
        'teachers' => ['view teachers', 'create teachers', 'edit teachers', 'delete teachers'],
        'students' => ['view students', 'create students', 'edit students', 'delete students'],
        'registrations' => ['view registrations', 'create registrations', 'edit registrations', 'delete registrations'],
        'alumni' => ['view alumni', 'create alumni', 'edit alumni', 'delete alumni'],
        'testimonials' => ['view testimonials', 'create testimonials', 'edit testimonials', 'delete testimonials'],
        'organization' => ['view organization', 'edit organization'],
        'themes' => ['manage themes'],
        'settings' => ['manage settings'],
        'contact-messages' => ['view contact-messages', 'delete contact-messages'],
        'gallery' => ['view gallery', 'create gallery', 'edit gallery', 'delete gallery'],
    ];

    /**
     * Permissions granted to the editor role (content modules only).
     */
    private array $editorPermissions = [
        'view articles', 'create articles', 'edit articles', 'delete articles',
        'view announcements', 'create announcements', 'edit announcements', 'delete announcements',
        'view agendas', 'create agendas', 'edit agendas', 'delete agendas',
        'view facilities', 'create facilities', 'edit facilities', 'delete facilities',
        'view curricula', 'create curricula', 'edit curricula', 'delete curricula',
        'view categories', 'create categories', 'edit categories', 'delete categories',
        'view achievements', 'create achievements', 'edit achievements', 'delete achievements',
        'view extracurriculars', 'create extracurriculars', 'edit extracurriculars', 'delete extracurriculars',
        'view teachers', 'create teachers', 'edit teachers', 'delete teachers',
        'view students', 'create students', 'edit students', 'delete students',
        'view alumni', 'create alumni', 'edit alumni', 'delete alumni',
        'view testimonials', 'create testimonials', 'edit testimonials', 'delete testimonials',
        'view gallery', 'create gallery', 'edit gallery', 'delete gallery',
        'view contact-messages',
    ];

    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $allPermissions = $this->seedPermissions();

        $this->seedRoles($allPermissions);
    }

    /**
     * Seed all system permissions and return a collection of all created permissions.
     *
     * @return \Illuminate\Support\Collection<int, Permission>
     */
    private function seedPermissions(): \Illuminate\Support\Collection
    {
        foreach ($this->permissions as $permissions) {
            foreach ($permissions as $permissionName) {
                Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => 'web']);
            }
        }

        return Permission::all();
    }

    /**
     * Seed default roles with their assigned permissions.
     *
     * @param \Illuminate\Support\Collection<int, Permission> $allPermissions
     */
    private function seedRoles(\Illuminate\Support\Collection $allPermissions): void
    {
        // Super Admin -- all access via Gate::before, no explicit permissions needed
        Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);

        // admin -- receives all permissions explicitly
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $admin->syncPermissions($allPermissions);

        // editor -- content management permissions
        $editor = Role::firstOrCreate(['name' => 'editor', 'guard_name' => 'web']);
        $editorPermissions = Permission::whereIn('name', $this->editorPermissions)->get();
        $editor->syncPermissions($editorPermissions);

        // user -- view-only permissions
        $user = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);
        $viewPermissions = $allPermissions->filter(fn (Permission $p) => str_starts_with($p->name, 'view '));
        $user->syncPermissions($viewPermissions);
    }
}
