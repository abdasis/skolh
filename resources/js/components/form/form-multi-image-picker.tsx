import { useState } from 'react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/input-error';
import { cn } from '@/lib/utils';
import { Images, X } from 'lucide-react';
import { useMediaFiles } from '@/hooks/use-media-files';
import { ImagePickerModal } from '@/components/image-picker/image-picker-modal';
import { FormLabel } from './form-label';

export interface FormMultiImagePickerProps {
    label: string;
    value: string[];
    onChange: (urls: string[]) => void;
    folder: string;
    error?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
}

const FormMultiImagePicker = ({
    label,
    value,
    onChange,
    folder,
    error,
    id,
    required,
    disabled,
}: FormMultiImagePickerProps) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const [open, setOpen] = useState(false);
    const { files, loading, uploading, upload } = useMediaFiles(folder, open);

    const handleSelect = (urls: string[]) => {
        // merge dan deduplikasi berdasarkan URL
        const merged = Array.from(new Set([...value, ...urls]));
        onChange(merged);
        setOpen(false);
    };

    const handleRemove = (url: string) => {
        onChange(value.filter((u) => u !== url));
    };

    return (
        <div className="grid gap-2">
            <FormLabel htmlFor={inputId} required={required}>{label}</FormLabel>
            <Button
                id={inputId}
                type="button"
                variant="outline"
                disabled={disabled}
                onClick={() => setOpen(true)}
                className={cn(
                    'w-full justify-start gap-2 font-normal',
                    value.length === 0 && 'text-muted-foreground',
                    error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20',
                )}
            >
                <Images className="size-4 shrink-0" />
                {value.length > 0 ? `${value.length} gambar dipilih — Tambah / Ubah` : 'Pilih Gambar...'}
            </Button>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((url) => (
                        <div key={url} className="group relative">
                            <img
                                src={url}
                                alt="preview"
                                className="h-20 w-20 rounded-md object-cover ring-1 ring-foreground/10"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(url)}
                                className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground ring-1 ring-background group-hover:flex"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <InputError message={error} />

            <ImagePickerModal
                open={open}
                onClose={() => setOpen(false)}
                onSelect={handleSelect}
                mode="multiple"
                folder={folder}
                files={files}
                loading={loading}
                uploading={uploading}
                onUpload={upload}
                title="Pilih Foto"
            />
        </div>
    );
};

export { FormMultiImagePicker };
