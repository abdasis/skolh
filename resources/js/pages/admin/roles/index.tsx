import { useState } from 'react';
import { Head, router, setLayoutProps } from '@inertiajs/react';
import { ShieldCheck, ShieldOff, Lock, Plus, XIcon } from 'lucide-react';
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
import * as RoleController from '@/actions/App/Http/Controllers/Admin/RoleController';
import type { Role } from '@/types';
import { roleColumns } from './components/role-columns';

interface Stats {
    total_roles: number;
    total_permissions: number;
}

interface Props {
    roles: Role[];
    stats: Stats;
}

const AdminRolesIndex = ({ roles, stats }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Manajemen Role', href: RoleController.index.url() },
        ],
    });

    const [deletingRole, setDeletingRole] = useState<Role | null>(null);

    const handleDelete = () => {
        if (!deletingRole) {
            return;
        }
        router.delete(RoleController.destroy.url({ role: deletingRole.id }), {
            onSuccess: () => setDeletingRole(null),
        });
    };

    const columns = roleColumns({ onDeleteRequest: setDeletingRole });

    return (
        <>
            <Head title="Manajemen Role" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Manajemen Role
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola role dan permission sistem.
                        </p>
                    </div>
                    <Button asChild>
                        <a href={RoleController.create.url()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Role
                        </a>
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-2 px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-4 pt-3 pb-3">
                            <p className="text-xs font-medium text-muted-foreground">
                                Total Role
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="flex items-center gap-3 p-4">
                                <div className="shrink-0 rounded-lg bg-blue-50 p-2.5 dark:bg-blue-950/50">
                                    <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-2xl leading-tight font-bold">
                                        {stats.total_roles}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        Role terdaftar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="px-4 pt-3 pb-3">
                            <p className="text-xs font-medium text-muted-foreground">
                                Total Permission
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="flex items-center gap-3 p-4">
                                <div className="shrink-0 rounded-lg bg-purple-50 p-2.5 dark:bg-purple-950/50">
                                    <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-2xl leading-tight font-bold">
                                        {stats.total_permissions}
                                    </p>
                                    <p className="truncate text-xs text-muted-foreground">
                                        Permission aktif
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={roles}
                        searchPlaceholder="Cari nama role..."
                    />
                </div>
            </div>

            <Dialog
                open={!!deletingRole}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletingRole(null);
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-md overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
                >
                    <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Hapus Role</DialogTitle>
                                <DialogDescription>
                                    Yakin ingin menghapus role{' '}
                                    <strong>{deletingRole?.name}</strong>?
                                    {(deletingRole?.users_count ?? 0) > 0 && (
                                        <span className="mt-1 block text-destructive">
                                            Role ini digunakan oleh{' '}
                                            {deletingRole?.users_count} user.
                                        </span>
                                    )}
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7 shrink-0"
                                >
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                            >
                                <ShieldOff className="mr-2 h-4 w-4" />
                                Hapus Role
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminRolesIndex;
