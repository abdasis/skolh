import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableState } from '@/components/data-table';
import * as TestimonialController from '@/actions/App/Http/Controllers/Admin/TestimonialController';
import { createTestimonialColumns } from './components/testimonial-columns';
import { type Testimonial } from '@/types';

interface PaginatedTestimonials {
    data: Testimonial[];
    meta: { total: number; per_page: number; current_page: number };
}

interface Props {
    testimonials: PaginatedTestimonials;
}

const AdminTestimonialsIndex = ({ testimonials }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Testimoni', href: TestimonialController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<Testimonial | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(TestimonialController.destroy.url({ testimonial: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (testimonial: Testimonial) => {
        router.visit(TestimonialController.edit.url({ testimonial: testimonial.id }));
    };

    const handleStateChange = (state: DataTableState) => {
        const params: Record<string, unknown> = {
            search: state.globalFilter || undefined,
            per_page: state.pagination.pageSize,
            page: state.pagination.pageIndex + 1,
        };

        if (state.sorting.length > 0) {
            params.sort = state.sorting.map((s) => ({ id: s.id, desc: s.desc }));
        }

        router.get(TestimonialController.index.url(), params as Record<string, string | number | boolean | undefined>, {
            preserveState: true,
            replace: true,
        });
    };

    const columns = createTestimonialColumns(setToDelete, handleEdit);

    return (
        <>
            <Head title="Manajemen Testimoni" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Testimoni</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola testimoni wali murid yang ditampilkan di halaman publik.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={TestimonialController.create.url()}>
                            Tambah Testimoni
                        </Link>
                    </Button>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={testimonials.data}
                        mode="server"
                        totalRows={testimonials.meta.total}
                        searchPlaceholder="Cari nama, peran, atau highlight..."
                        onStateChange={handleStateChange}
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={toDelete !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setToDelete(null);
                    }
                }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Testimoni"
                itemName={toDelete?.name}
            />
        </>
    );
};

export default AdminTestimonialsIndex;
