import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as StudentController from '@/actions/App/Http/Controllers/Admin/StudentController';
import { StudentForm, type StudentFormData } from './components/student-form';
import type { Student } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    student: Student;
    statusOptions: EnumOption[];
}

const AdminStudentsEdit = ({ student, statusOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Siswa', href: StudentController.index.url() },
            { title: student.full_name, href: StudentController.edit.url(student.id) },
        ],
    });

    const form = useForm<StudentFormData>({
        _method: 'PUT',
        full_name: student.full_name,
        nis: student.nis ?? '',
        nisn: student.nisn ?? '',
        nik: student.nik ?? '',
        gender: student.gender,
        religion: student.religion ?? '',
        citizenship: student.citizenship ?? 'WNI',
        birth_place: student.birth_place ?? '',
        birth_date: student.birth_date ?? '',
        address: student.address ?? '',
        phone: student.phone ?? '',
        email: student.email ?? '',
        special_needs: student.special_needs ?? '',
        enrollment_year: student.enrollment_year,
        status: student.status,
        notes: student.notes ?? '',
        father_name: student.father_name ?? '',
        father_occupation: student.father_occupation ?? '',
        father_phone: student.father_phone ?? '',
        mother_name: student.mother_name ?? '',
        mother_occupation: student.mother_occupation ?? '',
        mother_phone: student.mother_phone ?? '',
        guardian_name: student.guardian_name ?? '',
        guardian_occupation: student.guardian_occupation ?? '',
        guardian_phone: student.guardian_phone ?? '',
        photo_url: student.photo_url ?? null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(StudentController.update.url(student.id));
    };

    return (
        <>
            <Head title={`Edit Siswa — ${student.full_name}`} />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Data Siswa</h1>
                    <p className="text-sm text-muted-foreground">
                        Perbarui informasi siswa {student.full_name}.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <StudentForm
                                form={form}
                                onSubmit={handleSubmit}
                                statusOptions={statusOptions}
                                submitLabel="Simpan Perubahan"
                                cancelUrl={StudentController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminStudentsEdit;
