import { useState } from 'react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { TriangleAlert, XIcon } from 'lucide-react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
        router.delete('/admin/media', {
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
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) { onClose(); } }}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-md overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
            >
                <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                                <TriangleAlert className="size-5" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Hapus File</DialogTitle>
                                <DialogDescription>Tindakan ini tidak dapat dibatalkan.</DialogDescription>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="size-7 shrink-0" disabled={isDeleting}>
                                <XIcon className="size-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DialogClose>
                    </DialogHeader>

                    <div className="flex flex-col gap-2 p-5 text-sm text-muted-foreground">
                        {deletableFiles.length > 0 && (
                            <p>
                                {deletableFiles.length === 1
                                    ? `File "${deletableFiles[0].name}" akan dihapus secara permanen.`
                                    : `${deletableFiles.length} file akan dihapus secara permanen.`}
                            </p>
                        )}
                        {spatieFiles.length > 0 && (
                            <p className="text-amber-600">
                                {spatieFiles.length} file dikelola oleh model dan tidak akan dihapus:{' '}
                                {spatieFiles.map((f) => f.name).join(', ')}
                            </p>
                        )}
                        {deletableFiles.length === 0 && (
                            <p>Semua file yang dipilih dikelola oleh model dan tidak dapat dihapus.</p>
                        )}
                    </div>

                    <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                        <DialogClose asChild>
                            <Button variant="outline" disabled={isDeleting}>
                                Batal
                            </Button>
                        </DialogClose>
                        {deletableFiles.length > 0 && (
                            <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
                                {isDeleting ? 'Menghapus...' : 'Hapus'}
                            </Button>
                        )}
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};
