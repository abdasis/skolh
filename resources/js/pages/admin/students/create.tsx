import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as StudentController from '@/actions/App/Http/Controllers/Admin/StudentController';
import { StudentForm, type StudentFormData } from './components/student-form';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    statusOptions: EnumOption[];
}

const AdminStudentsCreate = ({ statusOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Siswa', href: StudentController.index.url() },
            { title: 'Tambah Siswa', href: StudentController.create.url() },
        ],
    });

    const form = useForm<StudentFormData>({
        full_name: '',
        nis: '',
        nisn: '',
        nik: '',
        gender: '',
        religion: '',
        citizenship: 'WNI',
        birth_place: '',
        birth_date: '',
        address: '',
        phone: '',
        email: '',
        special_needs: '',
        enrollment_year: new Date().getFullYear(),
        status: 'active',
        notes: '',
        father_name: '',
        father_occupation: '',
        father_phone: '',
        mother_name: '',
        mother_occupation: '',
        mother_phone: '',
        guardian_name: '',
        guardian_occupation: '',
        guardian_phone: '',
        photo_url: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(StudentController.store.url());
    };

    return (
        <>
            <Head title="Tambah Siswa" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Siswa</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan data siswa baru ke sistem.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <StudentForm
                                form={form}
                                onSubmit={handleSubmit}
                                statusOptions={statusOptions}
                                submitLabel="Tambah Siswa"
                                cancelUrl={StudentController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminStudentsCreate;
