import { Head, useForm } from '@inertiajs/react';
import * as MajorController from '@/actions/App/Http/Controllers/Admin/MajorController';
import { MajorForm } from './components/major-form';
import { type MajorFormData } from '@/types';

const AdminMajorsCreate = () => {
    const form = useForm<MajorFormData>({
        title: '',
        description: '',
        content: '',
        featured_image: null,
        status: 'draft',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(MajorController.store.url());
    };

    return (
        <>
            <Head title="Tambah Jurusan" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Jurusan</h1>
                    <p className="text-sm text-muted-foreground">
                        Buat entri jurusan baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <MajorForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Buat Jurusan"
                                cancelHref={MajorController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AdminMajorsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Jurusan', href: MajorController.index.url() },
        { title: 'Tambah Jurusan', href: MajorController.create.url() },
    ],
};

export default AdminMajorsCreate;
