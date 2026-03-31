import { Head, useForm } from '@inertiajs/react';
import * as FacilityController from '@/actions/App/Http/Controllers/Admin/FacilityController';
import { FacilityForm, type FacilityFormData } from './components/facility-form';

export default function AdminFacilitiesCreate() {
    const form = useForm<FacilityFormData>({
        icon: '',
        title: '',
        description: '',
        content: '',
        featured_image: null,
        status: 'draft',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.post(FacilityController.store.url(), {
            forceFormData: true,
        });
    }

    return (
        <>
            <Head title="Tambah Fasilitas" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Fasilitas</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat entri fasilitas baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <FacilityForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Buat Fasilitas"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AdminFacilitiesCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Fasilitas', href: FacilityController.index.url() },
        { title: 'Tambah Fasilitas', href: FacilityController.create.url() },
    ],
};
