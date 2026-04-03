import { useState } from 'react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/ui/input-error';
import { cn } from '@/lib/utils';
import { ImageIcon, X } from 'lucide-react';
import { useMediaFiles } from '@/hooks/use-media-files';
import { ImagePickerModal } from '@/components/image-picker/image-picker-modal';
import { FormLabel } from './form-label';

export interface FormImagePickerProps {
    label: string;
    value: string | null;
    onChange: (url: string | null) => void;
    folder: string;
    error?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    previewClassName?: string;
}

const FormImagePicker = ({
    label,
    value,
    onChange,
    folder,
    error,
    id,
    required,
    disabled,
    previewClassName,
}: FormImagePickerProps) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const [open, setOpen] = useState(false);
    const { files, loading, uploading, upload } = useMediaFiles(folder, open);

    const handleSelect = (urls: string[]) => {
        onChange(urls[0] ?? null);
        setOpen(false);
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
                    !value && 'text-muted-foreground',
                    error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20',
                )}
            >
                {value ? (
                    <img src={value} alt="preview" className="h-5 w-5 rounded object-cover" />
                ) : (
                    <ImageIcon className="size-4 shrink-0" />
                )}
                {value ? 'Ganti Gambar' : 'Pilih Gambar...'}
            </Button>

            {value && (
                <div className="relative w-fit">
                    <img
                        src={value}
                        alt="Preview"
                        className={cn('rounded-md object-cover', previewClassName ?? 'h-32 w-auto')}
                    />
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground ring-1 ring-background"
                    >
                        <X className="size-3" />
                    </button>
                </div>
            )}

            <InputError message={error} />

            <ImagePickerModal
                open={open}
                onClose={() => setOpen(false)}
                onSelect={handleSelect}
                mode="single"
                folder={folder}
                files={files}
                loading={loading}
                uploading={uploading}
                onUpload={upload}
            />
        </div>
    );
};

export { FormImagePicker };
