import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Users, UserCheck, UserX, UserPlus, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/data-table/data-table';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import * as UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import type { User } from '@/types/auth';
import { userColumns } from './components/user-columns';

interface Stats {
    total: number;
    active: number;
    inactive: number;
    new_this_month: number;
}

interface Props {
    users: User[];
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

function UserStatsCards({ stats }: { stats: Stats }) {
    const cards: StatCard[] = [
        {
            title: 'Total User',
            value: stats.total,
            icon: Users,
            iconColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-950/50',
            valueColor: '',
            sub: 'Semua pengguna terdaftar',
        },
        {
            title: 'User Aktif',
            value: stats.active,
            icon: UserCheck,
            iconColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-950/50',
            valueColor: 'text-green-700 dark:text-green-400',
            sub: 'Dapat mengakses sistem',
        },
        {
            title: 'User Nonaktif',
            value: stats.inactive,
            icon: UserX,
            iconColor: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-950/50',
            valueColor: 'text-red-700 dark:text-red-400',
            sub: 'Akses dibatasi',
        },
        {
            title: 'Baru Bulan Ini',
            value: stats.new_this_month,
            icon: UserPlus,
            iconColor: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-50 dark:bg-amber-950/50',
            valueColor: 'text-amber-700 dark:text-amber-400',
            sub: 'Bergabung bulan ini',
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-2 px-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8"
                >
                    <div className="px-4 pt-3 pb-3">
                        <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="flex items-center gap-3 p-4">
                            <div className={`shrink-0 rounded-lg p-2.5 ${card.bgColor}`}>
                                <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={`text-2xl font-bold leading-tight ${card.valueColor}`}>{card.value}</p>
                                <p className="truncate text-xs text-muted-foreground">{card.sub}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AdminUsersIndex({ users, stats }: Props) {
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    function handleDeleteConfirm() {
        if (!userToDelete) {
            return;
        }
        router.delete(UserController.destroy.url({ user: userToDelete.id }), {
            preserveScroll: true,
            onFinish: () => setUserToDelete(null),
        });
    }

    const columns = userColumns({ onDeleteRequest: setUserToDelete });

    return (
        <>
            <Head title="Manajemen User" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen User</h1>
                        <p className="text-sm text-muted-foreground">Kelola akun pengguna dan role mereka.</p>
                    </div>
                    <Button asChild>
                        <Link href={UserController.create.url()}>Tambah User</Link>
                    </Button>
                </div>

                <UserStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={users}
                        title="Daftar Pengguna"
                        description="Semua akun yang terdaftar di sistem"
                    />
                </div>
            </div>

            <Dialog
                open={userToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setUserToDelete(null);
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-md overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-destructive/10 to-destructive/5 p-2 shadow-xl ring-1 ring-destructive/20 backdrop-blur-sm"
                >
                    <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-red-50/90 ring-1 ring-destructive/10 dark:bg-red-950/40">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-destructive/15 bg-red-100/60 px-5 py-4 dark:bg-red-900/30">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle className="text-destructive dark:text-red-400">Hapus User</DialogTitle>
                                <DialogDescription className="text-destructive/70 dark:text-red-400/70">
                                    Tindakan ini tidak dapat dibatalkan.
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="size-7 shrink-0 text-destructive/70 hover:bg-destructive/10 hover:text-destructive">
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Tutup</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        <div className="p-5">
                            <p className="text-sm text-red-700/80 dark:text-red-300/80">
                                Apakah Anda yakin ingin menghapus pengguna{' '}
                                <span className="font-semibold text-red-800 dark:text-red-200">
                                    {userToDelete?.name}
                                </span>
                                ? Semua data terkait akan ikut terhapus.
                            </p>
                        </div>

                        <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-destructive/15 bg-red-100/60 px-5 py-4 dark:bg-red-900/30">
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manajemen User', href: UserController.index.url() },
    ],
};
