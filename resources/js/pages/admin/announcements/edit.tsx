import { Head, useForm } from '@inertiajs/react';
import * as AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { AnnouncementForm, type AnnouncementFormData } from './components/announcement-form';
import { type AnnouncementResource, type CategoryResource } from '@/types';

interface Props {
    announcement: AnnouncementResource;
    categories: CategoryResource[];
}

const AdminAnnouncementsEdit = ({ announcement, categories }: Props) => {
    const form = useForm<AnnouncementFormData & { _method: string }>({
        _method: 'PUT',
        title: announcement.title,
        excerpt: announcement.excerpt,
        content: announcement.content ?? '',
        status: announcement.status,
        published_at: announcement.published_at ?? '',
        expired_at: announcement.expired_at ?? '',
        category_ids: announcement.categories.map((c) => String(c.id)),
        attachments: [],
    });

    return (
        <>
            <Head title="Edit Pengumuman" />

            <div className="flex flex-col gap-4 p-6">
                <div>
                    <h1 className="text-xl font-semibold">Edit Pengumuman</h1>
                    <p className="text-sm text-muted-foreground">Ubah data pengumuman.</p>
                </div>

                <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                    <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <div className="p-5">
                            <AnnouncementForm
                                form={form}
                                url={AnnouncementController.update.url({ announcement: announcement.id })}
                                cancelUrl={AnnouncementController.index.url()}
                                categories={categories}
                                existingAttachments={announcement.attachments}
                                submitLabel="Simpan Perubahan"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAnnouncementsEdit;

AdminAnnouncementsEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pengumuman', href: AnnouncementController.index.url() },
        { title: 'Edit Pengumuman' },
    ],
};
