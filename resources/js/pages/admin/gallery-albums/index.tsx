import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableFilter } from '@/components/data-table';
import * as GalleryAlbumController from '@/actions/App/Http/Controllers/Admin/GalleryAlbumController';
import { createGalleryAlbumColumns } from './components/gallery-album-columns';
import { GalleryAlbumStatsCards } from './components/gallery-album-stats-cards';
import { type GalleryAlbumResource, type GalleryAlbumStats } from '@/types';

interface EnumOption {
    value: string;
    label: string;
}

interface Filters {
    search?: string;
    status?: string;
}

interface Props {
    albums: GalleryAlbumResource[];
    stats: GalleryAlbumStats;
    filters: Filters;
    statuses: EnumOption[];
}

const AdminGalleryAlbumsIndex = ({ albums, stats, filters, statuses }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Galeri', href: GalleryAlbumController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<GalleryAlbumResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(GalleryAlbumController.destroy.url({ gallery_album: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (album: GalleryAlbumResource) => {
        router.visit(GalleryAlbumController.edit.url({ gallery_album: album.id }));
    };

    const handleFilterChange = (key: string, value: string) => {
        router.get(
            GalleryAlbumController.index.url(),
            { ...filters, [key]: value || undefined },
            { preserveState: true, replace: true },
        );
    };

    const columns = createGalleryAlbumColumns(setToDelete, handleEdit);

    const tableFilters: DataTableFilter[] = [
        {
            type: 'select',
            key: 'status',
            label: 'Status',
            options: statuses,
        },
    ];

    return (
        <>
            <Head title="Manajemen Galeri" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Galeri</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola album dan foto galeri sekolah.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={GalleryAlbumController.create.url()}>
                            Tambah Album
                        </Link>
                    </Button>
                </div>

                <GalleryAlbumStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={albums}
                        searchPlaceholder="Cari album galeri..."
                        filters={tableFilters}
                        filterValues={filters as Record<string, string | undefined>}
                        onFilterChange={handleFilterChange}
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
                title="Hapus Album Galeri"
                itemName={toDelete?.title}
            />
        </>
    );
};

export default AdminGalleryAlbumsIndex;
