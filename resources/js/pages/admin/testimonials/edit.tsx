import { Head, setLayoutProps, useForm } from '@inertiajs/react';
import * as TestimonialController from '@/actions/App/Http/Controllers/Admin/TestimonialController';
import TestimonialForm, { type TestimonialFormData } from './components/testimonial-form';
import { type Testimonial } from '@/types';

interface Props {
    testimonial: Testimonial;
}

const AdminTestimonialsEdit = ({ testimonial }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Testimoni', href: TestimonialController.index.url() },
            { title: 'Edit Testimoni' },
        ],
    });

    const form = useForm<TestimonialFormData>({
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        highlight: testimonial.highlight,
        sort_order: testimonial.sort_order,
        avatar_url: testimonial.avatar_url,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.put(TestimonialController.update.url({ testimonial: testimonial.id }));
    };

    return (
        <>
            <Head title="Edit Testimoni" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Testimoni</h1>
                    <p className="text-sm text-muted-foreground">
                        Ubah data testimoni.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <TestimonialForm
                                form={form}
                                onSubmit={handleSubmit}
                                submitLabel="Simpan Perubahan"
                                cancelUrl={TestimonialController.index.url()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminTestimonialsEdit;
