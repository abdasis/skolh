import { useState } from 'react';
import { Copy, Trash2, Sparkles, FileText, Lock, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useClipboard } from '@/hooks/use-clipboard';
import type { MediaFile } from '@/types';

interface Props {
    file: MediaFile;
    selected: boolean;
    onToggleSelect: (path: string) => void;
    onPreview: (file: MediaFile) => void;
    onOptimize: (path: string) => void;
    onDelete: (path: string) => void;
}

const formatSize = (bytes: number): string => {
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    if (bytes < 1_048_576) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / 1_048_576).toFixed(1)} MB`;
};

export const MediaCard = ({ file, selected, onToggleSelect, onPreview, onOptimize, onDelete }: Props) => {
    const [, copy] = useClipboard();
    const [copied, setCopied] = useState(false);

    const handleCopyUrl = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const success = await copy(file.url);
        if (success) {
            setCopied(true);
            toast.success('URL disalin');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            className={`group relative rounded-lg border bg-card overflow-hidden cursor-pointer transition-all hover:shadow-md ${selected ? 'ring-2 ring-primary' : ''}`}
            onClick={() => file.is_image && onPreview(file)}
        >
            {/* Checkbox overlay */}
            <div
                className="absolute top-2 left-2 z-10"
                onClick={(e) => {
                    e.stopPropagation();
                    if (!file.is_spatie_managed) {
                        onToggleSelect(file.path);
                    }
                }}
            >
                {!file.is_spatie_managed && (
                    <Checkbox
                        checked={selected}
                        className="bg-background/80 backdrop-blur-sm"
                        aria-label={`Pilih ${file.name}`}
                    />
                )}
            </div>

            {/* Thumbnail or icon */}
            <div className="aspect-video flex items-center justify-center bg-muted overflow-hidden">
                {file.is_image ? (
                    <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <FileText className="size-10 text-muted-foreground" />
                )}
            </div>

            {/* Info */}
            <div className="p-2">
                <div className="flex items-start justify-between gap-1">
                    <p className="text-xs font-medium truncate flex-1" title={file.name}>
                        {file.name}
                    </p>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="size-6 shrink-0 opacity-0 group-hover:opacity-100">
                                <span className="sr-only">Aksi</span>
                                <span aria-hidden>⋯</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                            <DropdownMenuItem onClick={handleCopyUrl}>
                                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                                Salin URL
                            </DropdownMenuItem>
                            {file.is_image && !file.is_spatie_managed && (
                                <DropdownMenuItem onClick={() => onOptimize(file.path)}>
                                    <Sparkles className="size-4" />
                                    Optimalkan
                                </DropdownMenuItem>
                            )}
                            {!file.is_spatie_managed && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(file.path);
                                        }}
                                    >
                                        <Trash2 className="size-4" />
                                        Hapus
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <p className="text-xs text-muted-foreground mt-0.5">{formatSize(file.size)}</p>

                <div className="flex flex-wrap gap-1 mt-1">
                    {file.exceeds_limit && file.optimization_status === 'none' && (
                        <Badge variant="destructive" className="text-xs px-1 py-0">
                            Perlu Optimasi
                        </Badge>
                    )}
                    {file.optimization_status === 'optimized' && (
                        <Badge variant="secondary" className="text-xs px-1 py-0">
                            Teroptimasi
                        </Badge>
                    )}
                    {file.optimization_status === 'cannot_reduce' && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                            Tidak Bisa Dikecilkan
                        </Badge>
                    )}
                    {file.is_spatie_managed && (
                        <Badge variant="outline" className="text-xs px-1 py-0 gap-1">
                            <Lock className="size-2.5" />
                            Dikelola model
                        </Badge>
                    )}
                </div>

                {/* Copy URL on hover (non-touch) */}
                <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    Salin URL
                </button>
            </div>
        </div>
    );
};
