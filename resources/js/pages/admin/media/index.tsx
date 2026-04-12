import { useState, useCallback } from 'react';
import { Head, router, setLayoutProps, useHttp } from '@inertiajs/react';
import { toast } from 'sonner';
import { index as mediaIndex } from '@/actions/App/Http/Controllers/Admin/MediaController';
import type { MediaFile, BulkOptimizeResult } from '@/types';
import { MediaToolbar } from './components/media-toolbar';
import { MediaGrid } from './components/media-grid';
import { MediaList } from './components/media-list';
import { MediaPreviewModal } from './components/media-preview-modal';
import { MediaDeleteDialog } from './components/media-delete-dialog';
import { showOptimizeSummaryToast } from './components/optimize-summary-toast';

interface Props {
    files: MediaFile[];
    filters: {
        search: string;
        type: string;
    };
}

const AdminMediaIndex = ({ files, filters }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            { title: 'Media Manager', href: mediaIndex.url() },
        ],
    });

    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());
    const [previewFile, setPreviewFile] = useState<MediaFile | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const optimizeHttp = useHttp({ paths: [] as string[] });
    const optimizeAllHttp = useHttp({});
    const isOptimizing = optimizeHttp.processing || optimizeAllHttp.processing;

    const handleToggleSelect = useCallback((path: string) => {
        setSelectedPaths((prev) => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    }, []);

    const handleSelectAll = useCallback(() => {
        const eligible = files.filter((f) => !f.is_spatie_managed).map((f) => f.path);
        setSelectedPaths(new Set(eligible));
    }, [files]);

    const handleClearSelection = useCallback(() => {
        setSelectedPaths(new Set());
    }, []);

    const handleDeleteSuccess = useCallback((deleted: string[]) => {
        setSelectedPaths((prev) => {
            const next = new Set(prev);
            deleted.forEach((p) => next.delete(p));
            return next;
        });
        setDeleteDialogOpen(false);
        router.reload({ only: ['files'] });
    }, []);

    const handleOptimizeFile = useCallback((path: string) => {
        optimizeHttp.setData('paths', [path]);
        optimizeHttp.post('/admin/media/optimize', {
            onSuccess: (result) => {
                showOptimizeSummaryToast(result as BulkOptimizeResult);
                router.reload({ only: ['files'] });
            },
            onError: () => {
                toast.error('Gagal mengoptimasi file');
            },
        });
    }, [optimizeHttp]);

    const handleOptimizeAll = useCallback(() => {
        optimizeAllHttp.post('/admin/media/optimize-all', {
            onSuccess: (result) => {
                showOptimizeSummaryToast(result as BulkOptimizeResult);
                router.reload({ only: ['files'] });
            },
            onError: () => {
                toast.error('Gagal mengoptimasi file');
            },
        });
    }, [optimizeAllHttp]);

    const hasOversizedImages = files.some((f) => f.is_image && f.exceeds_limit && !f.is_spatie_managed);
    const isEmptyAfterFilter = files.length === 0;
    const isFilterActive = filters.search !== '' || (filters.type !== 'all' && filters.type !== '');

    return (
        <>
            <Head title="Media Manager" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Media Manager</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola semua file yang diunggah ke server.
                        </p>
                    </div>
                </div>

                <MediaToolbar
                    filters={filters}
                    view={view}
                    onViewChange={setView}
                    selectedCount={selectedPaths.size}
                    totalCount={files.length}
                    hasOversizedImages={hasOversizedImages}
                    isOptimizing={isOptimizing}
                    onDeleteSelected={() => setDeleteDialogOpen(true)}
                    onOptimizeAll={handleOptimizeAll}
                    onSelectAll={handleSelectAll}
                    onClearSelection={handleClearSelection}
                />

                {isEmptyAfterFilter ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="text-5xl mb-4">📂</div>
                        <h2 className="text-lg font-semibold">
                            {isFilterActive ? 'Tidak ada hasil' : 'Belum ada media'}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {isFilterActive
                                ? 'Coba ubah filter atau kata kunci pencarian.'
                                : 'Upload file untuk memulai mengelola media.'}
                        </p>
                    </div>
                ) : view === 'grid' ? (
                    <MediaGrid
                        files={files}
                        selectedPaths={selectedPaths}
                        onToggleSelect={handleToggleSelect}
                        onPreview={setPreviewFile}
                        onOptimize={handleOptimizeFile}
                        onDelete={(path) => {
                            setSelectedPaths(new Set([path]));
                            setDeleteDialogOpen(true);
                        }}
                    />
                ) : (
                    <MediaList
                        files={files}
                        selectedPaths={selectedPaths}
                        onToggleSelect={handleToggleSelect}
                        onPreview={setPreviewFile}
                        onOptimize={handleOptimizeFile}
                        onDelete={(path) => {
                            setSelectedPaths(new Set([path]));
                            setDeleteDialogOpen(true);
                        }}
                    />
                )}
            </div>

            <MediaPreviewModal
                file={previewFile}
                onClose={() => setPreviewFile(null)}
            />

            <MediaDeleteDialog
                open={deleteDialogOpen}
                paths={Array.from(selectedPaths)}
                files={files}
                onClose={() => setDeleteDialogOpen(false)}
                onSuccess={handleDeleteSuccess}
            />
        </>
    );
};

export default AdminMediaIndex;
