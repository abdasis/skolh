import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TriangleAlert, XIcon } from 'lucide-react';

interface ConfirmationDeleteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    itemName?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    processing?: boolean;
}

const ConfirmationDelete = ({
    open,
    onOpenChange,
    onConfirm,
    title = 'Hapus Data',
    description,
    itemName,
    confirmLabel = 'Hapus',
    cancelLabel = 'Batal',
    processing = false,
}: ConfirmationDeleteProps) => {
    const resolvedDescription =
        description ??
        (itemName
            ? `Apakah Anda yakin ingin menghapus "${itemName}"? Tindakan ini tidak dapat dibatalkan.`
            : 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                <DialogTitle>{title}</DialogTitle>
                                <DialogDescription>Tindakan ini tidak dapat dibatalkan.</DialogDescription>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="size-7 shrink-0" disabled={processing}>
                                <XIcon className="size-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DialogClose>
                    </DialogHeader>

                    <div className="p-5">
                        <p className="text-sm text-muted-foreground">{resolvedDescription}</p>
                    </div>

                    <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                        <DialogClose asChild>
                            <Button variant="outline" disabled={processing}>
                                {cancelLabel}
                            </Button>
                        </DialogClose>
                        <Button variant="destructive" onClick={onConfirm} disabled={processing}>
                            {confirmLabel}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { ConfirmationDelete };
export type { ConfirmationDeleteProps };
