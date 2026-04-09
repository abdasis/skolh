import { useCallback, useMemo, useState } from 'react';
import { Head, Link, router, setLayoutProps } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
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

const readInitialStateFromUrl = () => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page') ?? '1');
    const perPage = Number(params.get('per_page') ?? '20');
    return {
        globalFilter: params.get('search') ?? '',
        pagination: {
            pageIndex: Number.isFinite(page) && page > 0 ? page - 1 : 0,
            pageSize: Number.isFinite(perPage) && perPage > 0 ? perPage : 20,
        },
    };
};

const AdminOrganizationNodesIndex = ({ nodes }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Struktur Organisasi', href: OrganizationNodeController.index.url() },
        ],
    });

    const [toDelete, setToDelete] = useState<OrganizationNodeResource | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(OrganizationNodeController.destroy.url({ organization_node: toDelete.id }), {
            preserveScroll: true,
            onFinish: () => setToDelete(null),
        });
    };

    const handleEdit = useCallback((node: OrganizationNodeResource) => {
        router.visit(OrganizationNodeController.edit.url({ organization_node: node.id }));
    }, []);

    const handleStateChange = useCallback((state: DataTableState) => {
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
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    }, []);

    const columns = useMemo(
        () => createOrganizationNodeColumns(setToDelete, handleEdit),
        [handleEdit],
    );

    const initialDataTableState = useMemo(() => readInitialStateFromUrl(), []);

    return (
        <>
            <Head title="Struktur Organisasi" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    {isLoading ? (
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-7 w-48" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-xl font-semibold">Struktur Organisasi</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola struktur organisasi sekolah.
                            </p>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        {isLoading ? (
                            <>
                                <Skeleton className="h-9 w-32" />
                                <Skeleton className="h-9 w-28" />
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>

                <div className="px-2">
                    <DataTable
                        columns={columns}
                        data={nodes?.data ?? []}
                        mode="server"
                        totalRows={nodes?.meta?.total ?? 0}
                        initialState={initialDataTableState}
                        title="Daftar Node Organisasi"
                        description="Kelola seluruh jabatan dan hierarki struktur organisasi sekolah."
                        searchPlaceholder="Cari jabatan atau nama..."
                        isLoading={isLoading}
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
