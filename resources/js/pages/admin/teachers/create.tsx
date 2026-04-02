import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as TeacherController from '@/actions/App/Http/Controllers/Admin/TeacherController';
import { TeacherForm, type TeacherFormData } from './components/teacher-form';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    statusOptions: EnumOption[];
    genderOptions: EnumOption[];
}

const AdminTeachersCreate = ({ statusOptions, genderOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Guru', href: TeacherController.index.url() },
            { title: 'Tambah Guru', href: TeacherController.create.url() },
        ],
    });

    const form = useForm<TeacherFormData>({
        name: '',
        nip: '',
        email: '',
        phone: '',
        address: '',
        subject: '',
        gender: '',
        date_of_birth: '',
        joined_at: '',
        status: 'active',
        avatar: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(TeacherController.store.url(), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Tambah Guru" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Guru</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan data guru baru ke sistem.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <TeacherForm
                                form={form}
                                onSubmit={handleSubmit}
                                statusOptions={statusOptions}
                                genderOptions={genderOptions}
                                submitLabel="Tambah Guru"
                                cancelUrl={TeacherController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminTeachersCreate;
