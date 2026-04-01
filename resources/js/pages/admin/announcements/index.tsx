import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import * as AnnouncementController from '@/actions/App/Http/Controllers/Admin/AnnouncementController';
import { createAnnouncementColumns } from './components/announcement-columns';
import { AnnouncementStatsCards } from './components/announcement-stats-cards';
import { type AnnouncementResource, type AnnouncementStats } from '@/types';

interface Props {
    announcements: AnnouncementResource[];
    stats: AnnouncementStats;
}

const AdminAnnouncementsIndex = ({ announcements, stats }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Pengumuman', href: AnnouncementController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<AnnouncementResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(AnnouncementController.destroy.url({ announcement: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (announcement: AnnouncementResource) => {
        router.visit(AnnouncementController.edit.url({ announcement: announcement.id }));
    };

    const columns = createAnnouncementColumns(setToDelete, handleEdit);

    return (
        <>
            <Head title="Manajemen Pengumuman" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Pengumuman</h1>
                        <p className="text-sm text-muted-foreground">Kelola pengumuman sekolah.</p>
                    </div>
                    <Button asChild>
                        <Link href={AnnouncementController.create.url()}>Tambah Pengumuman</Link>
                    </Button>
                </div>

                <AnnouncementStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={announcements}
                        searchPlaceholder="Cari pengumuman..."
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
                title="Hapus Pengumuman"
                itemName={toDelete?.title}
            />
        </>
    );
};

export default AdminAnnouncementsIndex;

