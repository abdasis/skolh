import { Head, useForm } from '@inertiajs/react';
import * as FacilityController from '@/actions/App/Http/Controllers/Admin/FacilityController';
import { type FacilityResource } from '@/types';
import { FacilityForm, type FacilityFormData } from './components/facility-form';

interface Props {
    facility: FacilityResource;
}

const AdminFacilitiesEdit = ({ facility }: Props) => {
    const form = useForm<FacilityFormData & { _method: string }>({
        _method: 'PUT',
        icon: facility.icon,
        title: facility.title,
        description: facility.description,
        content: facility.content ?? '',
        featured_image: null,
        status: facility.status,
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        form.post(FacilityController.update.url({ facility: facility.id }), {
            forceFormData: true,
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Edit Fasilitas" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Fasilitas</h1>
                    <p className="text-sm text-muted-foreground">Ubah data fasilitas.</p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <FacilityForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Simpan Perubahan"
                                existingImageUrl={facility.featured_image}
                                cancelHref={FacilityController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminFacilitiesEdit;

AdminFacilitiesEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Fasilitas', href: FacilityController.index.url() },
        { title: 'Edit Fasilitas' },
    ],
};
