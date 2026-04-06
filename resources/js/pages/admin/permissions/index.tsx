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

interface StatCard {
    title: string;
    value: number;
    icon: React.ElementType;
    iconColor: string;
    bgColor: string;
    valueColor: string;
    sub: string;
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

    const cards: StatCard[] = [
        {
            title: 'Total Permission',
            value: stats.total_permissions,
            icon: Lock,
            iconColor: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-950/50',
            valueColor: '',
            sub: 'Semua permission terdaftar',
        },
        {
            title: 'Total Role',
            value: stats.total_roles,
            icon: ShieldCheck,
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            valueColor: '',
            sub: 'Semua role terdaftar',
        },
    ];

    return (
        <>
            <Head title="Permission" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Permission</h1>
                        <p className="text-sm text-muted-foreground">
                            Daftar semua permission sistem yang tersedia.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 px-2">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                        >
                            <div className="px-4 pt-3 pb-3">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {card.title}
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="flex items-center gap-3 p-4">
                                    <div
                                        className={`shrink-0 rounded-lg p-2.5 ${card.bgColor}`}
                                    >
                                        <card.icon
                                            className={`h-5 w-5 ${card.iconColor}`}
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p
                                            className={`text-2xl leading-tight font-bold ${card.valueColor}`}
                                        >
                                            {card.value}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {card.sub}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-2">
                    <Input
                        placeholder="Cari permission atau modul..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                </div>

                <div className="flex flex-col gap-4 px-2 pb-2">
                    {Object.entries(filtered).map(([module, permissions]) => (
                        <div
                            key={module}
                            className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                        >
                            <div className="px-4 pt-3 pb-3">
                                <h2 className="text-xs font-medium text-muted-foreground capitalize">
                                    {module}
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    {permissions.length} permission
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
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
