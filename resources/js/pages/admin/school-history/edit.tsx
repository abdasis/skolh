import { Head, Link, setLayoutProps, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form';
import { TiptapEditor } from '@/components/editor';
import * as SchoolHistoryController from '@/actions/App/Http/Controllers/Admin/SchoolHistoryController';

interface Props {
    history: string;
}

interface FormData {
    history: string;
}

const AdminSchoolHistoryEdit = ({ history }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            {
                title: 'School History',
                href: SchoolHistoryController.show.url(),
            },
            { title: 'Edit' },
        ],
    });

    const form = useForm<FormData>({
        history,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(SchoolHistoryController.update.url());
    };

    return (
        <>
            <Head title="Edit Sejarah Sekolah" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">
                        Edit Sejarah Sekolah
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Perbarui konten sejarah sekolah.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-5"
                            >
                                <TiptapEditor
                                    label="Sejarah Sekolah"
                                    content={form.data.history}
                                    onChange={(html) =>
                                        form.setData('history', html)
                                    }
                                    placeholder="Masukkan sejarah sekolah..."
                                    error={form.errors.history}
                                />

                                <div className="flex items-center gap-3">
                                    <FormSubmit processing={form.processing}>
                                        Simpan Perubahan
                                    </FormSubmit>
                                    <Button variant="outline" asChild>
                                        <Link
                                            href={SchoolHistoryController.show.url()}
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

export default AdminSchoolHistoryEdit;
