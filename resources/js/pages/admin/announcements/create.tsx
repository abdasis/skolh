import { Head, useForm } from '@inertiajs/react';
import * as AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { AnnouncementForm, type AnnouncementFormData } from './components/announcement-form';
import { type CategoryResource } from '@/types';

interface Props {
    categories: CategoryResource[];
}

const AdminAnnouncementsCreate = ({ categories }: Props) => {
    const form = useForm<AnnouncementFormData>({
        title: '',
        excerpt: '',
        content: '',
        status: 'draft',
        published_at: '',
        expired_at: '',
        category_ids: [],
        attachments: [],
    });

    return (
        <>
            <Head title="Tambah Pengumuman" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Tambah Pengumuman</h1>
                    <p className="text-sm text-muted-foreground">Buat pengumuman baru.</p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <AnnouncementForm
                                form={form}
                                url={AnnouncementController.store.url()}
                                cancelUrl={AnnouncementController.index.url()}
                                categories={categories}
                                submitLabel="Buat Pengumuman"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAnnouncementsCreate;

AdminAnnouncementsCreate.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengumuman', href: AnnouncementController.index.url() },
        { title: 'Tambah Pengumuman', href: AnnouncementController.create.url() },
    ],
};
