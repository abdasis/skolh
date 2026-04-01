import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';
import { FormInput, FormTextarea, FormSubmit } from '@/components/form';
import * as CategoryController from '@/actions/App/Http/Controllers/Admin/CategoryController';
import { type CategoryResource } from '@/types';

interface CategoryFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: CategoryResource | null;
}

const CategoryFormDialog = ({
    open,
    onOpenChange,
    category,
}: CategoryFormDialogProps) => {
    const isEdit = !!category;

    const form = useForm<{
        name: string;
        description: string;
        _method?: string;
    }>({
        name: '',
        description: '',
        _method: isEdit ? 'PUT' : undefined,
    });

    const {
        data,
        setData,
        errors,
        processing,
        recentlySuccessful,
        post,
        reset,
    } = form;

    useEffect(() => {
        if (open) {
            if (category) {
                setData({
                    name: category.name,
                    description: category.description ?? '',
                    _method: 'PUT',
                });
            } else {
                reset();
                setData({ name: '', description: '' });
            }
        }
    }, [open, category]);

    useEffect(() => {
        if (recentlySuccessful) {
            onOpenChange(false);
        }
    }, [recentlySuccessful]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = isEdit
            ? CategoryController.update.url({ category: category!.id })
            : CategoryController.store.url();
        post(url, { preserveScroll: true });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-md overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
            >
                <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                    <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                        <DialogTitle>
                            {isEdit ? 'Edit Kategori' : 'Tambah Kategori'}
                        </DialogTitle>
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7 shrink-0"
                                disabled={processing}
                            >
                                <XIcon className="size-4" />
                                <span className="sr-only">Close</span>
                            </Button>
                        </DialogClose>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 p-5"
                    >
                        <FormInput
                            label="Nama"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Nama kategori"
                            error={errors.name}
                            required
                        />
                        <FormTextarea
                            label="Deskripsi"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            placeholder="Deskripsi singkat (opsional)"
                            rows={3}
                            error={errors.description}
                        />

                        <DialogFooter className="-mx-5 mt-0 -mb-5 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    disabled={processing}
                                >
                                    Batal
                                </Button>
                            </DialogClose>
                            <FormSubmit
                                processing={processing}
                                successful={recentlySuccessful}
                            >
                                {isEdit ? 'Simpan Perubahan' : 'Buat Kategori'}
                            </FormSubmit>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { CategoryFormDialog };
