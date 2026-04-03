import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Check, ImageIcon, Upload } from 'lucide-react';
import type { ImagePickerMode, MediaFileResource } from '@/types';

interface ImagePickerModalProps {
    open: boolean;
    onClose: () => void;
    onSelect: (urls: string[]) => void;
    mode: ImagePickerMode;
    folder: string;
    files: MediaFileResource[];
    loading: boolean;
    uploading: boolean;
    onUpload: (file: File) => Promise<void>;
    title?: string;
}

const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/** Mengambil nama folder dari path, maks 2 level terakhir */
const folderLabel = (path: string): string => {
    const parts = path.split('/');
    if (parts.length <= 1) return '/';
    return parts.slice(0, -1).slice(-2).join('/');
};

const ImagePickerModal = ({
    open,
    onClose,
    onSelect,
    mode,
    files,
    loading,
    uploading,
    onUpload,
    title = 'Pilih Gambar',
}: ImagePickerModalProps) => {
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<string>('browse');
    const uploadInputRef = useRef<HTMLInputElement>(null);

    const filtered = search.trim()
        ? files.filter((f) =>
              f.name.toLowerCase().includes(search.toLowerCase()) ||
              f.path.toLowerCase().includes(search.toLowerCase()),
          )
        : files;

    const handleThumbnailClick = (url: string) => {
        if (mode === 'single') {
            onSelect([url]);
            onClose();
            return;
        }
        setSelected((prev) => {
            const next = new Set(prev);
            if (next.has(url)) {
                next.delete(url);
            } else {
                next.add(url);
            }
            return next;
        });
    };

    const handleConfirmMultiple = () => {
        onSelect(Array.from(selected));
        onClose();
        setSelected(new Set());
    };

    const handleUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }
        await onUpload(file);
        setActiveTab('browse');
        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
    };

    const handleClose = () => {
        setSearch('');
        setSelected(new Set());
        setActiveTab('browse');
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(o) => { if (!o) { handleClose(); } }}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <div className="flex items-center gap-3">
                        <TabsList>
                            <TabsTrigger value="browse">Pilih Foto</TabsTrigger>
                            <TabsTrigger value="upload">Upload Baru</TabsTrigger>
                        </TabsList>
                        {activeTab === 'browse' && (
                            <>
                                <Input
                                    placeholder="Cari nama atau folder..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="h-8 max-w-xs"
                                />
                                {!loading && (
                                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                                        {filtered.length} gambar
                                        {search && ` dari ${files.length}`}
                                    </span>
                                )}
                            </>
                        )}
                    </div>

                    <TabsContent value="browse" className="mt-3">
                        <ScrollArea className="h-[420px] pr-1">
                            {loading ? (
                                <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <Skeleton key={i} className="aspect-square rounded-md" />
                                    ))}
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex h-64 flex-col items-center justify-center gap-2 text-muted-foreground">
                                    <ImageIcon className="size-10 opacity-40" />
                                    <p className="text-sm">
                                        {files.length === 0
                                            ? 'Belum ada gambar tersimpan.'
                                            : 'Tidak ada gambar yang cocok.'}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                                    {filtered.map((file) => {
                                        const isSelected = selected.has(file.url);
                                        return (
                                            <button
                                                key={file.path}
                                                type="button"
                                                onClick={() => handleThumbnailClick(file.url)}
                                                className={cn(
                                                    'group relative aspect-square overflow-hidden rounded-md ring-2 transition-all',
                                                    isSelected
                                                        ? 'ring-primary'
                                                        : 'ring-transparent hover:ring-primary/50',
                                                )}
                                            >
                                                <img
                                                    src={file.url}
                                                    alt={file.name}
                                                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                />

                                                {/* Overlay info saat hover */}
                                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                                    <p className="truncate text-[10px] font-medium leading-tight text-white">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[9px] leading-tight text-white/70">
                                                        {formatBytes(file.size)}
                                                    </p>
                                                    <p className="truncate text-[9px] leading-tight text-white/60">
                                                        {folderLabel(file.path)}
                                                    </p>
                                                </div>

                                                {/* Checkmark saat dipilih (multiple mode) */}
                                                {isSelected && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-primary/40">
                                                        <Check className="size-5 text-white drop-shadow" />
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="upload" className="mt-3">
                        <label
                            htmlFor="media-upload-input"
                            className={cn(
                                'flex h-48 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-primary/50 hover:bg-muted/50',
                                uploading && 'pointer-events-none opacity-60',
                            )}
                        >
                            <Upload className="size-8 text-muted-foreground" />
                            <div className="text-center">
                                <p className="text-sm font-medium">
                                    {uploading ? 'Mengupload...' : 'Klik untuk memilih gambar'}
                                </p>
                                <p className="text-xs text-muted-foreground">JPG, PNG, WEBP — maks. 4MB</p>
                            </div>
                            <input
                                ref={uploadInputRef}
                                id="media-upload-input"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleUploadChange}
                                className="sr-only"
                                disabled={uploading}
                            />
                        </label>
                    </TabsContent>
                </Tabs>

                {mode === 'multiple' && selected.size > 0 && (
                    <DialogFooter>
                        <Button type="button" onClick={handleConfirmMultiple}>
                            Pilih ({selected.size})
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

export { ImagePickerModal };
