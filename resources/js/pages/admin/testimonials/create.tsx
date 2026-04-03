import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as TestimonialController from '@/actions/App/Http/Controllers/Admin/TestimonialController';
import TestimonialForm, { type TestimonialFormData } from './components/testimonial-form';

const AdminTestimonialsCreate = () => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Testimoni', href: TestimonialController.index.url() },
            { title: 'Tambah Testimoni', href: TestimonialController.create.url() },
        ],
    });

    const form = useForm<TestimonialFormData>({
        name: '',
        role: '',
        quote: '',
        highlight: '',
        sort_order: 0,
        avatar_url: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(TestimonialController.store.url());
    };

    return (
        <>
            <Head title="Tambah Testimoni" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Testimoni</h1>
                    <p className="text-sm text-muted-foreground">
                        Tambahkan testimoni wali murid baru.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <TestimonialForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Tambah Testimoni"
                                cancelUrl={TestimonialController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminTestimonialsCreate;
