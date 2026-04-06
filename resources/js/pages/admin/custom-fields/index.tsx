import { useEffect, useState } from 'react';
import { Head, Link, router, setLayoutProps, useForm } from '@inertiajs/react';
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmationDelete } from '@/components/confirmation-delete';
import * as CustomFieldController from '@/actions/App/Http/Controllers/Admin/CustomFieldController';
import * as AdmissionPeriodController from '@/actions/App/Http/Controllers/Admin/AdmissionPeriodController';
import {
    type AdmissionPeriod,
    type CustomField,
    type CustomFieldType,
} from '@/types';

interface FieldTypeOption {
    value: string;
    label: string;
}

interface Props {
    activePeriod: AdmissionPeriod | null;
    fields: CustomField[];
    periods: AdmissionPeriod[];
    fieldTypes: FieldTypeOption[];
}

const SortableFieldRow = ({
    field,
    index,
    onEdit,
    onDelete,
}: {
    field: CustomField;
    index: number;
    onEdit: (field: CustomField) => void;
    onDelete: (field: CustomField) => void;
}) => {
    const { ref, isDragging } = useSortable({ id: field.id, index });

    return (
        <div
            ref={ref}
            className={`flex items-center justify-between rounded-md border bg-card p-3 transition-opacity ${isDragging ? 'opacity-50' : ''}`}
        >
            <div className="flex items-center gap-3">
                <span className="cursor-grab text-muted-foreground select-none">
                    &#8597;
                </span>
                <div>
                    <p className="text-sm font-medium">{field.label}</p>
                    <p className="text-xs text-muted-foreground">
                        {field.type}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {field.is_required && <Badge variant="secondary">Wajib</Badge>}
                <Button variant="ghost" size="sm" onClick={() => onEdit(field)}>
                    Edit
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(field)}
                >
                    Hapus
                </Button>
            </div>
        </div>
    );
};

type FieldFormData = {
    admission_period_id: number;
    label: string;
    type: CustomFieldType;
    placeholder: string;
    is_required: boolean;
    sort_order: number;
    options: string[];
};

const FieldFormBody = ({
    data,
    setData,
    errors,
    fieldTypes,
    isEdit,
}: {
    data: FieldFormData;
    setData: <K extends keyof FieldFormData>(
        key: K,
        value: FieldFormData[K],
    ) => void;
    errors: Partial<Record<keyof FieldFormData, string>>;
    fieldTypes: FieldTypeOption[];
    isEdit: boolean;
}) => {
    const handleAddOption = () => {
        setData('options', [...data.options, '']);
    };

    const handleOptionChange = (index: number, value: string) => {
        const updated = [...data.options];
        updated[index] = value;
        setData('options', updated);
    };

    const handleRemoveOption = (index: number) => {
        setData(
            'options',
            data.options.filter((_, i) => i !== index),
        );
    };

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor={`${isEdit ? 'edit' : 'create'}-label`}>
                    Label Field
                </Label>
                <Input
                    id={`${isEdit ? 'edit' : 'create'}-label`}
                    placeholder="contoh: Jalur Pendaftaran"
                    value={data.label}
                    onChange={(e) => setData('label', e.target.value)}
                />
                {errors.label && (
                    <p className="text-sm text-destructive">{errors.label}</p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor={`${isEdit ? 'edit' : 'create'}-type`}>
                    Tipe Field
                </Label>
                <Select
                    value={data.type}
                    onValueChange={(val) =>
                        setData('type', val as CustomFieldType)
                    }
                >
                    <SelectTrigger id={`${isEdit ? 'edit' : 'create'}-type`}>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {fieldTypes.map((ft) => (
                            <SelectItem key={ft.value} value={ft.value}>
                                {ft.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.type && (
                    <p className="text-sm text-destructive">{errors.type}</p>
                )}
            </div>

            <div className="space-y-1">
                <Label htmlFor={`${isEdit ? 'edit' : 'create'}-placeholder`}>
                    Placeholder (opsional)
                </Label>
                <Input
                    id={`${isEdit ? 'edit' : 'create'}-placeholder`}
                    placeholder="Teks bantuan di dalam input..."
                    value={data.placeholder}
                    onChange={(e) => setData('placeholder', e.target.value)}
                />
            </div>

            {data.type === 'select' && (
                <div className="space-y-2">
                    <Label>Opsi Pilihan</Label>
                    {data.options.map((opt, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                value={opt}
                                placeholder={`Opsi ${i + 1}`}
                                onChange={(e) =>
                                    handleOptionChange(i, e.target.value)
                                }
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveOption(i)}
                            >
                                Hapus
                            </Button>
                        </div>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleAddOption}
                    >
                        + Tambah Opsi
                    </Button>
                </div>
            )}

            <div className="flex items-center justify-between">
                <Label htmlFor={`${isEdit ? 'edit' : 'create'}-is_required`}>
                    Wajib Diisi
                </Label>
                <Switch
                    id={`${isEdit ? 'edit' : 'create'}-is_required`}
                    checked={data.is_required}
                    onCheckedChange={(val) => setData('is_required', val)}
                />
            </div>
        </div>
    );
};

const AdminCustomFieldIndex = ({ activePeriod, fields, fieldTypes }: Props) => {
    setLayoutProps({
        breadcrumbs: [
            { title: 'Dashboard', href: '/dashboard' },
            {
                title: 'Pengaturan SPMB',
                href: AdmissionPeriodController.index.url(),
            },
            { title: 'Custom Fields', href: CustomFieldController.index.url() },
        ],
    });

    const [fieldList, setFieldList] = useState<CustomField[]>(fields ?? []);
    const [toDelete, setToDelete] = useState<CustomField | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editTarget, setEditTarget] = useState<CustomField | null>(null);

    useEffect(() => {
        setFieldList(fields ?? []);
    }, [fields]);

    const createForm = useForm<FieldFormData>({
        admission_period_id: activePeriod?.id ?? 0,
        label: '',
        type: 'text',
        placeholder: '',
        is_required: false,
        sort_order: 0,
        options: [],
    });

    const editForm = useForm<FieldFormData>({
        admission_period_id: activePeriod?.id ?? 0,
        label: '',
        type: 'text',
        placeholder: '',
        is_required: false,
        sort_order: 0,
        options: [],
    });

    const handleDragEnd = (event: {
        operation: {
            source: { id: number | string } | null;
            target: { id: number | string } | null;
        };
    }) => {
        const { source, target } = event.operation;
        if (!source || !target || source.id === target.id) {
            return;
        }

        const sourceIndex = fieldList.findIndex((f) => f.id === source.id);
        const targetIndex = fieldList.findIndex((f) => f.id === target.id);
        if (sourceIndex === -1 || targetIndex === -1) {
            return;
        }

        const updated = [...fieldList];
        const [moved] = updated.splice(sourceIndex, 1);
        updated.splice(targetIndex, 0, moved);
        const reordered = updated.map((f, i) => ({ ...f, sort_order: i }));
        setFieldList(reordered);

        router.post(
            CustomFieldController.reorder.url(),
            {
                order: reordered.map((f) => ({
                    id: f.id,
                    sort_order: f.sort_order,
                })),
            },
            { preserveScroll: true },
        );
    };

    const handleDeleteConfirm = () => {
        if (!toDelete) {
            return;
        }
        router.delete(
            CustomFieldController.destroy.url({ custom_field: toDelete.id }),
            {
                preserveScroll: true,
                onFinish: () => setToDelete(null),
            },
        );
    };

    const handleOpenCreate = () => {
        createForm.reset();
        setShowCreateModal(true);
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post(CustomFieldController.store.url(), {
            preserveScroll: true,
            onSuccess: () => setShowCreateModal(false),
        });
    };

    const handleOpenEdit = (field: CustomField) => {
        editForm.setData({
            admission_period_id: field.admission_period_id,
            label: field.label,
            type: field.type,
            placeholder: field.placeholder ?? '',
            is_required: field.is_required,
            sort_order: field.sort_order,
            options: field.options ?? [],
        });
        setEditTarget(field);
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editTarget) {
            return;
        }
        editForm.put(
            CustomFieldController.update.url({ custom_field: editTarget.id }),
            {
                preserveScroll: true,
                onSuccess: () => setEditTarget(null),
            },
        );
    };

    return (
        <>
            <Head title="Custom Fields SPMB" />

            <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between px-2">
                    <div>
                        <h1 className="text-xl font-semibold">Custom Fields</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola field tambahan untuk formulir pendaftaran{' '}
                            {activePeriod ? activePeriod.academic_year : ''}.
                        </p>
                    </div>
                    {activePeriod && (
                        <Button onClick={handleOpenCreate}>Tambah Field</Button>
                    )}
                </div>

                <div className="px-2">
                    {!activePeriod ? (
                        <Card>
                            <CardContent className="py-8 text-center">
                                <p className="text-sm text-muted-foreground">
                                    Belum ada periode aktif.{' '}
                                    <Link
                                        href={AdmissionPeriodController.index.url()}
                                        className="underline underline-offset-4"
                                    >
                                        Buat periode terlebih dahulu.
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
                            <div className="px-5 py-4">
                                <p className="text-sm font-medium">
                                    Daftar Field
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Seret untuk mengubah urutan tampil di
                                    formulir.
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                                <div className="p-4">
                                    {fieldList.length === 0 ? (
                                        <p className="py-4 text-center text-sm text-muted-foreground">
                                            Belum ada field tambahan. Klik
                                            "Tambah Field" untuk mulai.
                                        </p>
                                    ) : (
                                        <DragDropProvider
                                            onDragEnd={handleDragEnd}
                                        >
                                            <div className="flex flex-col gap-2">
                                                {fieldList.map((field, idx) => (
                                                    <SortableFieldRow
                                                        key={field.id}
                                                        field={field}
                                                        index={idx}
                                                        onEdit={handleOpenEdit}
                                                        onDelete={setToDelete}
                                                    />
                                                ))}
                                            </div>
                                        </DragDropProvider>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Create */}
            <Dialog
                open={showCreateModal}
                onOpenChange={(open) => !open && setShowCreateModal(false)}
            >
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-lg overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
                >
                    <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Tambah Field Baru</DialogTitle>
                                <DialogDescription>
                                    Menambahkan field untuk periode{' '}
                                    {activePeriod?.academic_year}.
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7 shrink-0"
                                >
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        <form onSubmit={handleCreateSubmit}>
                            <div className="max-h-[70vh] overflow-y-auto">
                                <div className="p-5">
                                    <FieldFormBody
                                        data={createForm.data}
                                        setData={createForm.setData}
                                        errors={createForm.errors}
                                        fieldTypes={fieldTypes}
                                        isEdit={false}
                                    />
                                </div>
                            </div>

                            <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={createForm.processing}
                                >
                                    Tambah Field
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Modal Edit */}
            <Dialog
                open={!!editTarget}
                onOpenChange={(open) => !open && setEditTarget(null)}
            >
                <DialogContent
                    showCloseButton={false}
                    className="w-full max-w-lg overflow-hidden rounded-2xl border-0 bg-gradient-to-b from-muted/60 to-muted/30 p-2 shadow-xl ring-1 ring-foreground/8 backdrop-blur-sm"
                >
                    <div className="flex flex-col gap-0 overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                        <DialogHeader className="flex flex-row items-center justify-between gap-2 border-b border-foreground/6 bg-muted/30 px-5 py-4">
                            <div className="flex flex-col gap-0.5">
                                <DialogTitle>Edit Field</DialogTitle>
                                <DialogDescription>
                                    Mengedit field: {editTarget?.label}
                                </DialogDescription>
                            </div>
                            <DialogClose asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-7 shrink-0"
                                >
                                    <XIcon className="size-4" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </DialogClose>
                        </DialogHeader>

                        <form onSubmit={handleEditSubmit}>
                            <div className="max-h-[70vh] overflow-y-auto">
                                <div className="p-5">
                                    <FieldFormBody
                                        data={editForm.data}
                                        setData={editForm.setData}
                                        errors={editForm.errors}
                                        fieldTypes={fieldTypes}
                                        isEdit={true}
                                    />
                                </div>
                            </div>

                            <DialogFooter className="-mx-0 -mb-0 rounded-b-xl border-t border-foreground/6 bg-muted/30 px-5 py-4">
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </DialogClose>
                                <Button
                                    type="submit"
                                    disabled={editForm.processing}
                                >
                                    Simpan Perubahan
                                </Button>
                            </DialogFooter>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmationDelete
                open={!!toDelete}
                onOpenChange={(open) => !open && setToDelete(null)}
                onConfirm={handleDeleteConfirm}
                title="Hapus Field?"
                description={`Field "${toDelete?.label}" akan dihapus. Data yang sudah disubmit menggunakan field ini tetap tersimpan.`}
            />
        </>
    );
};

export default AdminCustomFieldIndex;
