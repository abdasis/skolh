import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as ExtracurricularController from '@/actions/App/Http/Controllers/Admin/ExtracurricularController';
import { ExtracurricularForm, type ExtracurricularFormData } from './components/extracurricular-form';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    categories: EnumOption[];
    days: EnumOption[];
    statuses: EnumOption[];
}

const AdminExtracurricularsCreate = ({ categories, days, statuses }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Ekstrakurikuler', href: ExtracurricularController.index.url() },
            { title: 'Tambah Ekskul', href: ExtracurricularController.create.url() },
        ],
    });

    const form = useForm<ExtracurricularFormData>({
        title: '',
        category: '',
        day: '',
        time: '',
        supervisor: '',
        description: '',
        content: '',
        featured_image: null,
        status: 'draft',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(ExtracurricularController.store.url(), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Ekstrakurikuler" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Ekstrakurikuler</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan data kegiatan ekstrakurikuler baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <ExtracurricularForm
                                form={form}
                                onSubmit={handleSubmit}
                                categories={categories}
                                days={days}
                                statuses={statuses}
                                submitLabel="Tambah Ekskul"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminExtracurricularsCreate;
