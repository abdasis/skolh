import { Head, useForm } from '@inertiajs/react';
import * as AgendaController from '@/actions/App/Http/Controllers/Admin/AgendaController';
import { AgendaForm, type AgendaFormData } from './components/agenda-form';

export default function AdminAgendasCreate() {
    const form = useForm<AgendaFormData>({
        date: '',
        title: '',
        description: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.post(AgendaController.store.url());
    }

    return (
        <>
            <Head title="Tambah Agenda" />

            <div className="flex flex-col gap-4 p-2">
                <div className="p-4">
                    <h1 className="text-xl font-semibold">Tambah Agenda</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat entri agenda baru.
                    </p>
                </div>

                <div className="p-4">
                    <div className="max-w-lg overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <AgendaForm
                                    form={form}
                                    onSubmit={handleSubmit}
                                    submitLabel="Buat Agenda"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminAgendasCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Agenda', href: AgendaController.index.url() },
        { title: 'Tambah Agenda', href: AgendaController.create.url() },
    ],
};
