import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as TeacherController from '@/actions/App/Http/Controllers/Admin/TeacherController';
import { TeacherForm, type TeacherFormData } from './components/teacher-form';
import { type TeacherResource } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    teacher: TeacherResource;
    statusOptions: EnumOption[];
    genderOptions: EnumOption[];
    socialPlatformOptions: EnumOption[];
}

const AdminTeachersEdit = ({ teacher, statusOptions, genderOptions, socialPlatformOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Guru', href: TeacherController.index.url() },
            { title: 'Edit Guru' },
        ],
    });

    const form = useForm<TeacherFormData>({
        _method: 'PUT',
        name: teacher.name,
        nip: teacher.nip,
        email: teacher.email,
        phone: teacher.phone ?? '',
        address: teacher.address ?? '',
        subject: teacher.subject ?? '',
        gender: teacher.gender ?? '',
        date_of_birth: teacher.date_of_birth ?? '',
        joined_at: teacher.joined_at ?? '',
        status: teacher.status,
        avatar: null,
        socials: teacher.socials?.map((s) => ({ platform: s.platform, url: s.url })) ?? [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(TeacherController.update.url({ teacher: teacher.id }), {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Edit Guru" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Guru</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data guru.
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
                                socialPlatformOptions={socialPlatformOptions}
                                submitLabel="Simpan Perubahan"
                                cancelUrl={TeacherController.index.url()}
                                existingAvatarUrl={teacher.avatar_url}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminTeachersEdit;
