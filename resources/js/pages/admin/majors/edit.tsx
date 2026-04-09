import { Head, useForm } from '@inertiajs/react';
import * as MajorController from '@/actions/App/Http/Controllers/Admin/MajorController';
import { type MajorFormData, type MajorResource } from '@/types';
import { MajorForm } from './components/major-form';

interface Props {
    major: MajorResource;
}

const AdminMajorsEdit = ({ major }: Props) => {
    const form = useForm<MajorFormData & { _method: string }>({
        _method: 'PUT',
        title: major.title,
        description: major.description,
        content: major.content ?? '',
        featured_image: major.featured_image ?? null,
        status: major.status,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(MajorController.update.url({ major: major.id }), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Edit Jurusan" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Jurusan</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data jurusan.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <MajorForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Simpan Perubahan"
                                cancelHref={MajorController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AdminMajorsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jurusan', href: MajorController.index.url() },
        { title: 'Edit Jurusan' },
    ],
};

export default AdminMajorsEdit;
