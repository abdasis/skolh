import { Head, useForm } from '@inertiajs/react';
import * as AgendaController from '@/actions/App/Http/Controllers/Admin/AgendaController';
import { AgendaForm, type AgendaFormData } from './components/agenda-form';

interface AgendaResource {
    id: number;
    date: string;
    title: string;
    description: string | null;
}

interface Props {
    agenda: AgendaResource;
}

export default function AdminAgendasEdit({ agenda }: Props) {
    const form = useForm<AgendaFormData>({
        date: agenda.date,
        title: agenda.title,
        description: agenda.description ?? '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.put(AgendaController.update.url({ agenda: agenda.id }));
    }

    return (
        <>
            <Head title="Edit Agenda" />

            <div className="flex flex-col gap-4 p-2">
                <div className="p-4">
                    <h1 className="text-xl font-semibold">Edit Agenda</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data agenda.
                    </p>
                </div>

                <div className="p-4">
                    <div className="max-w-lg overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <AgendaForm
                                    form={form}
                                    onSubmit={handleSubmit}
                                    submitLabel="Simpan Perubahan"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminAgendasEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Agenda', href: AgendaController.index.url() },
        { title: 'Edit Agenda', href: '#' },
    ],
};
