import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface PermissionWithRoles {
    id: number;
    name: string;
    roles: Array<{ id: number; name: string }>;
}

interface GroupedPermissions {
    [module: string]: PermissionWithRoles[];
}

interface Stats {
    total_permissions: number;
    total_roles: number;
}

interface Props {
    grouped_permissions: GroupedPermissions;
    stats: Stats;
}

const AdminPermissionsIndex = ({ grouped_permissions, stats }: Props) => {
    const [search, setSearch] = useState('');

    const filtered = Object.entries(
        grouped_permissions,
    ).reduce<GroupedPermissions>((acc, [module, permissions]) => {
        const matched = permissions.filter(
            (p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                module.toLowerCase().includes(search.toLowerCase()),
        );
        if (matched.length > 0) {
            acc[module] = matched;
        }
        return acc;
    }, {});

    return (
        <>
            <Head title="Permission" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between p-4">
                    <div>
                        <h1 className="text-xl font-semibold">Permission</h1>
                        <p className="text-sm text-muted-foreground">
                            Daftar semua permission sistem yang tersedia.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 px-4">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="flex items-center gap-4 overflow-hidden rounded-xl bg-background/90 p-4 ring-1 ring-foreground/6">
                            <div className="rounded-full bg-purple-50 p-2 dark:bg-purple-950/50">
                                <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Permission
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total_permissions}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="flex items-center gap-4 overflow-hidden rounded-xl bg-background/90 p-4 ring-1 ring-foreground/6">
                            <div className="rounded-full bg-blue-50 p-2 dark:bg-blue-950/50">
                                <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Total Role
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total_roles}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <Input
                        placeholder="Cari permission atau modul..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                <div className="flex flex-col gap-4 px-4 pb-4">
                    {Object.entries(filtered).map(([module, permissions]) => (
                        <div
                            key={module}
                            className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                        >
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="border-b px-4 py-3">
                                    <h2 className="font-medium capitalize">
                                        {module}
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        {permissions.length} permission
                                    </p>
                                </div>
                                <div className="divide-y">
                                    {permissions.map((permission) => (
                                        <div
                                            key={permission.id}
                                            className="flex items-center justify-between px-4 py-3"
                                        >
                                            <span className="text-sm">
                                                {permission.name}
                                            </span>
                                            <div className="flex flex-wrap gap-1">
                                                {permission.roles.length > 0 ? (
                                                    permission.roles.map(
                                                        (role) => (
                                                            <Badge
                                                                key={role.id}
                                                                variant="secondary"
                                                                className="text-xs"
                                                            >
                                                                {role.name}
                                                            </Badge>
                                                        ),
                                                    )
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        Tidak ada role
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {Object.keys(filtered).length === 0 && (
                        <div className="py-12 text-center text-muted-foreground">
                            Tidak ada permission yang cocok.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPermissionsIndex;

AdminPermissionsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Permission', href: '/admin/permissions' },
    ],
};
