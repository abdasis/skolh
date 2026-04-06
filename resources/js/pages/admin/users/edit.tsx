import { Head, useForm } from '@inertiajs/react';
import * as UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import type { User } from '@/types/auth';
import type { Permission } from '@/types/permission';
import {
    UserForm,
    type UserFormData,
    type RoleOption,
} from './components/user-form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface GroupedPermissions {
    [module: string]: Array<{ id: number; name: string }>;
}

interface Props {
    user: User;
    roles: RoleOption[];
    all_permissions: Permission[];
    grouped_permissions: GroupedPermissions;
}

interface UserEditFormData extends UserFormData {
    direct_permissions: number[];
}

const AdminUsersEdit = ({ user, roles, grouped_permissions }: Props) => {
    const form = useForm<UserEditFormData>({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.roles?.[0]?.name ?? '',
        is_active: user.is_active,
        direct_permissions: user.direct_permissions?.map((p) => p.id) ?? [],
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.put(UserController.update.url({ user: user.id }));
    }

    function handleRoleChange(_roleName: string, permissionIds: number[]) {
        form.setData('direct_permissions', permissionIds);
    }

    function togglePermission(permissionId: number) {
        const current = form.data.direct_permissions;
        const updated = current.includes(permissionId)
            ? current.filter((id) => id !== permissionId)
            : [...current, permissionId];
        form.setData('direct_permissions', updated);
    }

    const selectedRole = roles.find((r) => r.name === form.data.role);
    const rolePermissionIds = new Set(selectedRole?.permissions ?? []);

    return (
        <>
            <Head title="Edit User" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Edit User</h1>
                        <p className="text-sm text-muted-foreground">
                            Ubah informasi akun dan hak akses pengguna.
                        </p>
                    </div>
                </div>

                <div className="px-2">
                    <div className="mx-auto max-w-5xl space-y-4">
                        {/* Card: Informasi Akun */}
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                                <div className="space-y-0.5">
                                    <p className="text-base font-medium">
                                        Informasi Akun
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Perbarui nama, email, password, role,
                                        dan status aktif pengguna.
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="p-5">
                                    <UserForm
                                        form={form}
                                        roles={roles}
                                        onSubmit={handleSubmit}
                                        onRoleChange={handleRoleChange}
                                        cancelHref={UserController.index.url()}
                                        submitLabel="Simpan Perubahan"
                                        passwordRequired={false}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Card: Permission Langsung */}
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="flex items-center justify-between gap-2 px-5 py-4">
                                <div className="space-y-0.5">
                                    <p className="text-base font-medium">
                                        Permission Langsung
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Tambahkan permission ekstra di luar
                                        role. Permission dari role dicentang
                                        otomatis saat role dipilih.
                                    </p>
                                </div>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="p-5">
                                    <div className="flex flex-col gap-6">
                                        {Object.entries(
                                            grouped_permissions,
                                        ).map(([module, permissions]) => (
                                            <div key={module}>
                                                <p className="mb-3 text-sm font-medium capitalize">
                                                    {module}
                                                </p>
                                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                    {permissions.map(
                                                        (permission) => {
                                                            const fromRole =
                                                                rolePermissionIds.has(
                                                                    permission.id,
                                                                );
                                                            const isDirect =
                                                                form.data.direct_permissions.includes(
                                                                    permission.id,
                                                                );

                                                            return (
                                                                <div
                                                                    key={
                                                                        permission.id
                                                                    }
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <Checkbox
                                                                        id={`perm-${permission.id}`}
                                                                        checked={
                                                                            isDirect ||
                                                                            fromRole
                                                                        }
                                                                        disabled={
                                                                            fromRole
                                                                        }
                                                                        onCheckedChange={() =>
                                                                            togglePermission(
                                                                                permission.id,
                                                                            )
                                                                        }
                                                                    />
                                                                    <Label
                                                                        htmlFor={`perm-${permission.id}`}
                                                                        className="cursor-pointer text-sm font-normal"
                                                                    >
                                                                        {
                                                                            permission.name
                                                                        }
                                                                    </Label>
                                                                    {fromRole && (
                                                                        <Badge
                                                                            variant="secondary"
                                                                            className="text-xs"
                                                                        >
                                                                            dari
                                                                            role
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUsersEdit;

AdminUsersEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manajemen User', href: UserController.index.url() },
        { title: 'Edit User', href: '#' },
    ],
};
