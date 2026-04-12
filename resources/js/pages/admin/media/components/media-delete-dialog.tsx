import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { MediaFile } from '@/types';

interface Props {
    open: boolean;
    paths: string[];
    files: MediaFile[];
    onClose: () => void;
    onSuccess: (deleted: string[]) => void;
}

export const MediaDeleteDialog = ({ open, paths, files, onClose, onSuccess }: Props) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const selectedFiles = files.filter((f) => paths.includes(f.path));
    const spatieFiles = selectedFiles.filter((f) => f.is_spatie_managed);
    const deletableFiles = selectedFiles.filter((f) => !f.is_spatie_managed);

    const handleConfirm = () => {
        if (deletableFiles.length === 0) {
            onClose();
            return;
        }

        setIsDeleting(true);
        router.delete(
            '/admin/media',
            {
                data: { paths: deletableFiles.map((f) => f.path) },
                preserveScroll: true,
                onSuccess: (page) => {
                    const flashProps = page.props as { flash?: { deleted?: string[] } };
                    const deleted = flashProps.flash?.deleted ?? deletableFiles.map((f) => f.path);
                    toast.success(`${deleted.length} file berhasil dihapus`);
                    onSuccess(deleted);
                },
                onError: () => {
                    toast.error('Gagal menghapus file');
                    onClose();
                },
                onFinish: () => setIsDeleting(false),
            },
        );
    };

    return (
        <AlertDialog open={open} onOpenChange={(isOpen) => { if (!isOpen) { onClose(); } }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus File</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="flex flex-col gap-2">
                            {deletableFiles.length > 0 && (
                                <p>
                                    {deletableFiles.length === 1
                                        ? `File "${deletableFiles[0].name}" akan dihapus secara permanen.`
                                        : `${deletableFiles.length} file akan dihapus secara permanen.`}
                                </p>
                            )}
                            {spatieFiles.length > 0 && (
                                <p className="text-amber-600 text-sm">
                                    {spatieFiles.length} file dikelola oleh model dan tidak akan dihapus:{' '}
                                    {spatieFiles.map((f) => f.name).join(', ')}
                                </p>
                            )}
                            {deletableFiles.length === 0 && (
                                <p>Semua file yang dipilih dikelola oleh model dan tidak dapat dihapus.</p>
                            )}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Batal</AlertDialogCancel>
                    {deletableFiles.length > 0 && (
                        <AlertDialogAction
                            onClick={handleConfirm}
                            disabled={isDeleting}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                        >
                            {isDeleting ? 'Menghapus...' : 'Hapus'}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
