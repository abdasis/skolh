import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form';
import * as CurriculumController from '@/actions/App/Http/Controllers/Admin/CurriculumController';
import { CurriculumForm } from './components/curriculum-form';

const AdminCurriculaCreate = () => {
    const [processing, setProcessing] = useState(false);

    return (
        <>
            <Head title="Tambah Kurikulum" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">
                            Tambah Kurikulum
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Buat entri kurikulum baru.
                        </p>
                    </div>
                </div>

                <div className="px-2">
                    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                        <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                            <div className="p-5">
                                <CurriculumForm
                                    action={CurriculumController.store.url()}
                                    method="post"
                                    onProcessingChange={setProcessing}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3 px-4 py-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    router.visit(
                                        CurriculumController.index.url(),
                                    )
                                }
                            >
                                Batal
                            </Button>
                            <FormSubmit
                                form="curriculum-form"
                                processing={processing}
                            >
                                Buat Kurikulum
                            </FormSubmit>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCurriculaCreate;

AdminCurriculaCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Kurikulum', href: CurriculumController.index.url() },
        { title: 'Tambah Kurikulum', href: CurriculumController.create.url() },
    ],
};
