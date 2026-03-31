import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { XIcon } from 'lucide-react';
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
import { DataTable } from '@/components/data-table';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import * as AgendaController from '@/actions/App/Http/Controllers/Admin/AgendaController';
import { createAgendaColumns, type AgendaResource } from './columns';
import { AgendaForm, type AgendaFormData } from './components/agenda-form';

interface Props {
    agendas: AgendaResource[];
}

export default function AdminAgendasIndex({ agendas }: Props) {
    const [agendaToDelete, setAgendaToDelete] = useState<AgendaResource | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [agendaToEdit, setAgendaToEdit] = useState<AgendaResource | null>(null);

    const createForm = useForm<AgendaFormData>({
        date: '',
        title: '',
        description: '',
    });

    const editForm = useForm<AgendaFormData>({
        date: '',
        title: '',
        description: '',
    });

    function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createForm.post(AgendaController.store.url(), {
            onSuccess: () => {
                setShowCreateModal(false);
                createForm.reset();
            },
        });
    }

    function handleEditOpen(agenda: AgendaResource) {
        editForm.setData({
            date: agenda.date,
            title: agenda.title,
            description: agenda.description ?? '',
        });
        setAgendaToEdit(agenda);
    }

    function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!agendaToEdit) {
            return;
        }
        editForm.put(AgendaController.update.url({ agenda: agendaToEdit.id }), {
            onSuccess: () => setAgendaToEdit(null),
        });
    }

    function handleDeleteConfirm() {
        if (!agendaToDelete) {
            return;
        }
        router.delete(AgendaController.destroy.url({ agenda: agendaToDelete.id }), {
            preserveScroll: true,
            onFinish: () => setAgendaToDelete(null),
        });
    }

    const columns = createAgendaColumns(setAgendaToDelete, handleEditOpen);

    return (
        <>
            <Head title="Manajemen Agenda" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Agenda</h1>
                        <p className="text-sm text-muted-foreground">Kelola jadwal agenda dan kegiatan sekolah.</p>
                    </div>
                    <Button onClick={() => setShowCreateModal(true)}>Tambah Agenda</Button>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={agendas}
                        searchPlaceholder="Cari agenda..."
                    />
                </div>
            </div>

            {/* Create Modal */}
            <Dialog
                open={showCreateModal}
                onOpenChange={(open) => {
                    if (!open) {
                        setShowCreateModal(false);
                        createForm.reset();
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-lg overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-1 shadow-xl ring-1 ring-foreground/8"
                >
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/8 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Tambah Agenda</DialogTitle>
                                <DialogDescription>Buat entri agenda baru.</DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="size-7 shrink-0">
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Tutup</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <div className="p-5">
                            <AgendaForm
                                form={createForm}
                                onSubmit={handleCreateSubmit}
                                submitLabel="Buat Agenda"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog
                open={agendaToEdit !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setAgendaToEdit(null);
                    }
                }}
            >
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-lg overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-1 shadow-xl ring-1 ring-foreground/8"
                >
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/8 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Edit Agenda</DialogTitle>
                                <DialogDescription>Ubah data agenda.</DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon" className="size-7 shrink-0">
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Tutup</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>
                        <div className="p-5">
                            <AgendaForm
                                form={editForm}
                                onSubmit={handleEditSubmit}
                                submitLabel="Simpan Perubahan"
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <ConfirmationDelete
                open={agendaToDelete !== null}
                onOpenChange={(open) => {
                    if (!open) setAgendaToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                itemName={agendaToDelete?.title}
            />
        </>
    );
}

AdminAgendasIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Agenda', href: AgendaController.index.url() },
    ],
};
