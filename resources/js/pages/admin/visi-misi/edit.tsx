import { Head, Link, setLayoutProps, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormTextarea, FormSubmit } from '@/components/form';
import { TiptapEditor } from '@/components/editor';
import * as VisiMisiController from '@/actions/App/Http/Controllers/Admin/VisiMisiController';

interface Props {
    vision: string;
    mission: string;
}

interface FormData {
    vision: string;
    mission: string;
}

const AdminVisiMisiEdit = ({ vision, mission }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Visi & Misi', href: VisiMisiController.show.url() },
            { title: 'Edit' },
        ],
    });

    const form = useForm<FormData>({
        vision,
        mission,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(VisiMisiController.update.url());
    };

    return (
        <>
            <Head title="Edit Visi & Misi" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Visi & Misi</h1>
                    <p className="text-sm text-muted-foreground">
                        Perbarui konten visi dan misi sekolah.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                <FormTextarea
                                    label="Visi"
                                    value={form.data.vision}
                                    onChange={(e) =>
                                        form.setData('vision', e.target.value)
                                    }
                                    rows={4}
                                    placeholder="Masukkan visi sekolah..."
                                    disabled={form.processing}
                                    error={form.errors.vision}
                                />

                                <TiptapEditor
                                    label="Misi"
                                    content={form.data.mission}
                                    onChange={(html) =>
                                        form.setData('mission', html)
                                    }
                                    placeholder="Masukkan misi sekolah..."
                                    error={form.errors.mission}
                                />

                                <div className="flex items-center gap-3">
                                    <FormSubmit processing={form.processing}>
                                        Simpan Perubahan
                                    </FormSubmit>
                                    <Button variant="outline" asChild>
                                        <Link
                                            href={VisiMisiController.show.url()}
                                        >
                                            Batal
                                        </Link>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminVisiMisiEdit;
