import { useState } from 'react';
import { Copy, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClipboard } from '@/hooks/use-clipboard';
import type { MediaFile } from '@/types';

interface Props {
    file: MediaFile | null;
    onClose: () => void;
}

const formatSize = (bytes: number): string => {
    if (bytes < 1_048_576) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
};

const formatDate = (iso: string): string => {
    return new Date(iso).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const MediaPreviewModal = ({ file, onClose }: Props) => {
    const [, copy] = useClipboard();
    const [copied, setCopied] = useState(false);

    const handleCopyUrl = async () => {
        if (!file) {
            return;
        }
        const success = await copy(file.url);
        if (success) {
            setCopied(true);
            toast.success('URL disalin');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Dialog open={file !== null} onOpenChange={(open) => { if (!open) { onClose(); } }}>
            <DialogContent className="max-w-4xl min-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle className="truncate pr-8">{file?.name}</DialogTitle>
                </DialogHeader>

                {file && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full max-w-full max-h-[60vh] object-contain"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <p className="text-muted-foreground">Ukuran</p>
                                <p className="font-medium">{formatSize(file.size)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Terakhir diubah</p>
                                <p className="font-medium">{formatDate(file.last_modified)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Tipe</p>
                                <p className="font-medium">{file.mime}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Input
                                readOnly
                                value={file.url}
                                className="text-xs"
                                onClick={(e) => (e.target as HTMLInputElement).select()}
                            />
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopyUrl}
                                title="Salin URL"
                            >
                                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
