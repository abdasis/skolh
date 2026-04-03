import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as AlumniController from '@/actions/App/Http/Controllers/Admin/AlumniController';
import AlumniForm, { type AlumniFormData } from './components/alumni-form';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    socialPlatformOptions: EnumOption[];
}

const AdminAlumniCreate = ({ socialPlatformOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Alumni', href: AlumniController.index.url() },
            { title: 'Tambah Alumni', href: AlumniController.create.url() },
        ],
    });

    const form = useForm<AlumniFormData>({
        name: '',
        batch: '',
        destination: '',
        quote: '',
        avatar_url: null,
        sort_order: 0,
        socials: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(AlumniController.store.url());
    };

    return (
        <>
            <Head title="Tambah Alumni" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Alumni</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan data alumni baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <AlumniForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Tambah Alumni"
                                cancelUrl={AlumniController.index.url()}
                                socialPlatformOptions={socialPlatformOptions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAlumniCreate;
