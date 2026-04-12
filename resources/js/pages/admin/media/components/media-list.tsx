import { useState } from 'react';
import { Copy, Trash2, Sparkles, FileText, Lock, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useClipboard } from '@/hooks/use-clipboard';
import type { MediaFile } from '@/types';

interface Props {
    files: MediaFile[];
    selectedPaths: Set<string>;
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

const formatDate = (iso: string): string => {
    return new Date(iso).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const CopyUrlButton = ({ url }: { url: string }) => {
    const [, copy] = useClipboard();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copy(url);
        if (success) {
            setCopied(true);
            toast.success('URL disalin');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Button variant="ghost" size="icon" className="size-7" onClick={handleCopy} title="Salin URL">
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </Button>
    );
};

export const MediaList = ({ files, selectedPaths, onToggleSelect, onPreview, onOptimize, onDelete }: Props) => {
    return (
        <div className="px-2 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-8" />
                        <TableHead className="w-12" />
                        <TableHead>Nama</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Ukuran</TableHead>
                        <TableHead>Diunggah</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {files.map((file) => (
                        <TableRow key={file.path} className="group">
                            <TableCell>
                                {!file.is_spatie_managed && (
                                    <Checkbox
                                        checked={selectedPaths.has(file.path)}
                                        onCheckedChange={() => onToggleSelect(file.path)}
                                        aria-label={`Pilih ${file.name}`}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="size-10 flex items-center justify-center bg-muted rounded overflow-hidden">
                                    {file.is_image ? (
                                        <img
                                            src={file.url}
                                            alt={file.name}
                                            className="size-full object-cover cursor-pointer"
                                            loading="lazy"
                                            onClick={() => onPreview(file)}
                                        />
                                    ) : (
                                        <FileText className="size-5 text-muted-foreground" />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <p className="text-sm font-medium max-w-[200px] truncate" title={file.name}>
                                    {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground max-w-[200px] truncate" title={file.path}>
                                    {file.path}
                                </p>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{file.mime}</TableCell>
                            <TableCell className="text-sm">{formatSize(file.size)}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{formatDate(file.last_modified)}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {file.exceeds_limit && file.optimization_status === 'none' && (
                                        <Badge variant="destructive" className="text-xs">Perlu Optimasi</Badge>
                                    )}
                                    {file.optimization_status === 'optimized' && (
                                        <Badge variant="secondary" className="text-xs">Teroptimasi</Badge>
                                    )}
                                    {file.is_spatie_managed && (
                                        <Badge variant="outline" className="text-xs gap-1">
                                            <Lock className="size-2.5" />
                                            Dikelola model
                                        </Badge>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                    <CopyUrlButton url={file.url} />
                                    {file.is_image && !file.is_spatie_managed && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-7"
                                            onClick={() => onOptimize(file.path)}
                                            title="Optimalkan"
                                        >
                                            <Sparkles className="size-3.5" />
                                        </Button>
                                    )}
                                    {!file.is_spatie_managed && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="size-7 text-destructive hover:text-destructive"
                                            onClick={() => onDelete(file.path)}
                                            title="Hapus"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
