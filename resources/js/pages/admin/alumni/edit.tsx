import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as AlumniController from '@/actions/App/Http/Controllers/Admin/AlumniController';
import AlumniForm, { type AlumniFormData } from './components/alumni-form';
import { type Alumni } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Props {
    alumni: Alumni;
    socialPlatformOptions: EnumOption[];
}

const AdminAlumniEdit = ({ alumni, socialPlatformOptions }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Alumni', href: AlumniController.index.url() },
            { title: 'Edit Alumni' },
        ],
    });

    console.log('[edit] alumni prop:', alumni);

    const form = useForm<AlumniFormData>({
        name: alumni.name ?? '',
        batch: alumni.batch ?? '',
        destination: alumni.destination ?? '',
        quote: alumni.quote ?? '',
        avatar_url: alumni.avatar_url,
        sort_order: alumni.sort_order ?? 0,
        socials: (alumni.socials ?? []).map((s) => ({ platform: s.platform, url: s.url })),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(AlumniController.update.url({ alumnus: alumni.id }));
    };

    return (
        <>
            <Head title="Edit Alumni" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Alumni</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data alumni.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <AlumniForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Simpan Perubahan"
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

export default AdminAlumniEdit;
