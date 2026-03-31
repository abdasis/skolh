import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import * as AgendaController from '@/actions/App/Http/Controllers/Admin/AgendaController';

interface AgendaResource {
    id: number;
    date: string;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    agendas: AgendaResource[];
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function AdminAgendasIndex({ agendas }: Props) {
    const [agendaToDelete, setAgendaToDelete] = useState<AgendaResource | null>(null);

    function handleDeleteConfirm() {
        if (!agendaToDelete) {
            return;
        }
        router.delete(AgendaController.destroy.url({ agenda: agendaToDelete.id }), {
            preserveScroll: true,
            onFinish: () => setAgendaToDelete(null),
        });
    }

    return (
        <>
            <Head title="Manajemen Agenda" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Agenda</h1>
                        <p className="text-sm text-muted-foreground">Kelola jadwal agenda dan kegiatan sekolah.</p>
                    </div>
                    <Button asChild>
                        <Link href={AgendaController.create.url()}>Tambah Agenda</Link>
                    </Button>
                </div>

                <div className="px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            {agendas.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                                    <CalendarDays className="h-10 w-10 text-muted-foreground/40" />
                                    <p className="text-sm text-muted-foreground">Belum ada agenda. Tambahkan agenda pertama.</p>
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={AgendaController.create.url()}>Tambah Agenda</Link>
                                    </Button>
                                </div>
                            ) : (
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-foreground/6 text-left text-xs font-medium text-muted-foreground">
                                            <th className="px-4 py-3">Tanggal</th>
                                            <th className="px-4 py-3">Judul</th>
                                            <th className="hidden px-4 py-3 md:table-cell">Deskripsi</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-foreground/6">
                                        {agendas.map((agenda) => (
                                            <tr key={agenda.id} className="hover:bg-muted/30">
                                                <td className="px-4 py-3 whitespace-nowrap font-medium">
                                                    {formatDate(agenda.date)}
                                                </td>
                                                <td className="px-4 py-3 font-medium">
                                                    {agenda.title}
                                                </td>
                                                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                                                    {agenda.description
                                                        ? agenda.description.length > 80
                                                            ? agenda.description.slice(0, 80) + '…'
                                                            : agenda.description
                                                        : <span className="italic opacity-50">—</span>
                                                    }
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={AgendaController.edit.url({ agenda: agenda.id })}>
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => setAgendaToDelete(agenda)}
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={agendaToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setAgendaToDelete(null);
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
                                <DialogTitle className="text-destructive dark:text-red-400">Hapus Agenda</DialogTitle>
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
                                Apakah Anda yakin ingin menghapus agenda{' '}
                                <span className="font-semibold text-red-800 dark:text-red-200">
                                    {agendaToDelete?.title}
                                </span>
                                ? Data ini akan dihapus permanen.
                            </p>
                        </div>

                        <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-destructive/15 bg-red-100/60 px-5 py-4 dark:bg-red-900/30">
                            <DialogClose asChild>
                                <Button variant="outline">Batal</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Hapus
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminAgendasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Agenda', href: AgendaController.index.url() },
    ],
};
