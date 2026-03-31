import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import * as FacilityController from '@/actions/App/Http/Controllers/Admin/FacilityController';
import { createFacilityColumns } from './components/facility-columns';
import { FacilityStatsCards } from './components/facility-stats-cards';
import { type FacilityResource, type FacilityStats } from '@/types';

interface Props {
    facilities: FacilityResource[];
    stats: FacilityStats;
}

export default function AdminFacilitiesIndex({ facilities, stats }: Props) {
    const [facilityToDelete, setFacilityToDelete] = useState<FacilityResource | null>(null);

    function handleDeleteConfirm() {
        if (!facilityToDelete) {
            return;
        }
        router.delete(FacilityController.destroy.url({ facility: facilityToDelete.id }), {
            preserveScroll: true,
            onFinish: () => setFacilityToDelete(null),
        });
    }

    function handleEdit(facility: FacilityResource) {
        router.visit(FacilityController.edit.url({ facility: facility.id }));
    }

    const columns = createFacilityColumns(setFacilityToDelete, handleEdit);

    return (
        <>
            <Head title="Manajemen Fasilitas" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Manajemen Fasilitas</h1>
                        <p className="text-sm text-muted-foreground">Kelola fasilitas sekolah.</p>
                    </div>
                    <Button asChild>
                        <Link href={FacilityController.create.url()}>Tambah Fasilitas</Link>
                    </Button>
                </div>

                <FacilityStatsCards stats={stats} />

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={facilities}
                        searchPlaceholder="Cari fasilitas..."
                    />
                </div>
            </div>

            <ConfirmationDelete
                open={facilityToDelete !== null}
                onOpenChange={(open) => { if (!open) setFacilityToDelete(null); }}
                onConfirm={handleDeleteConfirm}
                title="Hapus Fasilitas"
                itemName={facilityToDelete?.title}
            />
        </>
    );
}

AdminFacilitiesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Fasilitas', href: FacilityController.index.url() },
    ],
};
