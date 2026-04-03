import { useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import { DataTable } from '@/components/data-table';
import type { DataTableState } from '@/components/data-table';
import * as OrganizationNodeController from '@/actions/App/Http/Controllers/Admin/OrganizationNodeController';
import { createOrganizationNodeColumns } from './components/columns';
import { type OrganizationNodeResource } from '@/types';

interface PaginatedNodes {
    data: OrganizationNodeResource[];
    meta: { total: number; per_page: number; current_page: number };
}

interface Props {
    nodes: PaginatedNodes;
}

const AdminOrganizationNodesIndex = ({ nodes }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Struktur Organisasi', href: OrganizationNodeController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<OrganizationNodeResource | null>(null);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(OrganizationNodeController.destroy.url({ organization_node: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = (node: OrganizationNodeResource) => {
        router.visit(OrganizationNodeController.edit.url({ organization_node: node.id }));
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

        router.get(OrganizationNodeController.index.url(), params as Record<string, string | number | boolean | undefined>, {
            preserveState: true,
            replace: true,
        });
    };

    const columns = createOrganizationNodeColumns(setToDelete, handleEdit);

    return (
        <>
            <Head title="Struktur Organisasi" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Struktur Organisasi</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola struktur organisasi sekolah.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" asChild>
                            <Link href={OrganizationNodeController.design.url()}>
                                Desain Struktur
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={OrganizationNodeController.create.url()}>
                                Tambah Node
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={nodes.data}
                        mode="server"
                        totalRows={nodes.meta.total}
                        title="Daftar Node Organisasi"
                        description="Kelola seluruh jabatan dan hierarki struktur organisasi sekolah."
                        searchPlaceholder="Cari jabatan atau nama..."
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
                title="Hapus Node"
                itemName={toDelete?.position}
            />
        </>
    );
};

export default AdminOrganizationNodesIndex;
