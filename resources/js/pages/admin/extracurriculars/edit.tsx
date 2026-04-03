import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as ExtracurricularController from '@/actions/App/Http/Controllers/Admin/ExtracurricularController';
import { ExtracurricularForm, type ExtracurricularFormData } from './components/extracurricular-form';
import { type ExtracurricularResource } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    extracurricular: ExtracurricularResource;
    categories: EnumOption[];
    days: EnumOption[];
    statuses: EnumOption[];
}

const AdminExtracurricularsEdit = ({ extracurricular, categories, days, statuses }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Ekstrakurikuler', href: ExtracurricularController.index.url() },
            { title: 'Edit Ekskul' },
        ],
    });

    const form = useForm<ExtracurricularFormData>({
        _method: 'PUT',
        title: extracurricular.title,
        category: extracurricular.category,
        day: extracurricular.day,
        time: extracurricular.time,
        supervisor: extracurricular.supervisor,
        description: extracurricular.description ?? '',
        content: extracurricular.content ?? '',
        featured_image: null,
        status: extracurricular.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(ExtracurricularController.update.url({ extracurricular: extracurricular.id }), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Ekstrakurikuler" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Ekstrakurikuler</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data kegiatan ekstrakurikuler.
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
                                submitLabel="Simpan Perubahan"
                                existingImageUrl={extracurricular.featured_image_url}
                                cancelHref={ExtracurricularController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminExtracurricularsEdit;
